<template>
  <div class="px-6 my-8 sm:px-10">
    <PersonCard :person="person" :userList="user.list" />

    <!-- Button(s) - only one button is shown depending on if this person is in user's friends list -->
    <div class="flex items-center justify-center my-6">
      <button
        v-if="!isAFriend"
        @click="addFriend"
        class="flex inline-flex items-center justify-center px-5 text-center text-white transition-colors duration-150 bg-green-600 rounded-lg h-14 focus:shadow-outline hover:bg-green-700"
      >
        <i class="text-2xl fill-current fa-solid fa-user-plus"></i>
        <span class="ml-3 font-bold">Add Friend</span>
      </button>
      <button
        v-if="isAFriend"
        @click="removeFriend"
        class="flex inline-flex items-center justify-center px-5 text-center text-white transition-colors duration-150 bg-red-400 rounded-lg h-14 focus:shadow-outline hover:bg-red-500"
      >
        <i class="text-2xl fill-current fa-solid fa-user-minus"></i>
        <span class="ml-3 font-bold">Remove Friend</span>
      </button>
    </div>

    <hr class="my-8" />

    <!-- Common Matches / Their List toggle-switch -->
    <div
      v-if="commonMatches.length > 0"
      class="flex items-center justify-center my-6"
    >
      <button
        @click="showCommonMatches"
        class="flex inline-flex items-center justify-center flex-1 h-12 px-5 text-center transition-colors duration-150 border border-gray-500 rounded-l-xl focus:shadow-outline"
        :class="[
          nowShowing == 'Common Matches'
            ? 'text-white bg-blue-500'
            : 'text-gray-400 hover:text-gray-600',
        ]"
      >
        <i class="text-2xl fill-current fa-solid fa-handshake-simple"></i>
        <span class="ml-3 font-bold">Common Matches</span>
      </button>
      <button
        @click="showTheirList"
        class="flex inline-flex items-center justify-center flex-1 h-12 px-5 text-center transition-colors duration-150 border border-gray-500 rounded-r-xl focus:shadow-outline"
        :class="[
          nowShowing == 'Their List'
            ? 'text-white bg-blue-500'
            : 'text-gray-400 hover:text-gray-600',
        ]"
      >
        <i class="text-2xl text-center fill-current fa-solid fa-scroll"></i>
        <span class="ml-3 font-bold">Their List</span>
      </button>
    </div>

    <!-- Searchbar -->
    <div
      v-if="
        (nowShowing == 'Their List' && person.list.length > 1) ||
        (nowShowing == 'Common Matches' && commonMatches.length > 1)
      "
      class="flex flex-col items-center justify-center my-6"
    >
      <input
        v-model="searchQuery"
        type="search"
        class="w-full max-w-lg px-3 py-3 pl-5 leading-tight text-gray-700 border border-2 border-gray-300 sm:pl-6 rounded-xl solid border-1 focus:outline-none focus:border-blue-300"
        placeholder="Search..."
      />
    </div>

    <!-- Common Matches -->
    <div v-if="nowShowing == 'Common Matches'">
      <div v-for="movie in filteredCommonMatches" :key="movie">
        <MovieCard :movie="movie" />
      </div>
    </div>

    <!-- Their List -->
    <div v-if="nowShowing == 'Their List'">
      <div v-for="movie in filteredTheirList" :key="movie">
        <MovieCard :movie="movie" />
      </div>
    </div>

    <!-- To be displayed if there are no movies in their list -->
    <div v-if="person.list.length == 0" class="my-6 text-center">
      <h1 class="mt-8 text-xl">Their list is empty!</h1>
      <p class="my-2 text-l">
        It seems like they haven't added any movies to their list... 😤
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  user: Object,
  users: Object,
  movies: Object,
});

const config = useRuntimeConfig();
let searchQuery = ref();
const route = useRoute();
const personID = route.params.id;
const person = props.users[personID - 1];
const theirList = getTheirList();
const commonMatches = getCommonMatches();
let filteredTheirList = ref(theirList);
let filteredCommonMatches = ref(commonMatches);
let isAFriend = ref();
setIsAFriend();
let nowShowing = ref();
setNowShowing();

function getCommonMatches() {
  const res = [];
  const commonMatchesIDs = props.user.list.filter((movie) =>
    person.list.includes(movie)
  );
  for (let i = 0; i < commonMatchesIDs.length; i++) {
    res.push(props.movies[commonMatchesIDs[i] - 1]);
  }
  return res;
}

function getTheirList() {
  const res = [];
  for (let i = 0; i < person.list.length; i++) {
    res.push(props.movies[person.list[i] - 1]);
  }
  return res;
}

function setIsAFriend() {
  if (props.user.friends.includes(person.email)) isAFriend.value = true;
  else isAFriend.value = false;
}

function setNowShowing() {
  if (commonMatches.length > 0) nowShowing.value = "Common Matches";
  else nowShowing.value = "Their List";
}

function addFriend() {
  props.user.friends.unshift(person.email);
  fetch(config.API_URL + "user", {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      friends: props.user.friends,
    }),
  })
    .then((r) => r.json())
    .then((isAFriend.value = true));
}

function removeFriend() {
  props.user.friends = props.user.friends.filter(
    (friendEmail) => friendEmail != person.email
  );
  fetch(config.API_URL + "user", {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      friends: props.user.friends,
    }),
  })
    .then((r) => r.json())
    .then((isAFriend.value = false));
}

function showCommonMatches() {
  nowShowing.value = "Common Matches";
}

function showTheirList() {
  nowShowing.value = "Their List";
}

watch(searchQuery, () => {
  filteredCommonMatches.value = commonMatches.filter((movie) => {
    return (
      movie.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      movie.year.includes(searchQuery.value) ||
      movie.plot.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  filteredTheirList.value = theirList.filter((movie) => {
    return (
      movie.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      movie.year.includes(searchQuery.value) ||
      movie.plot.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
});
</script>
