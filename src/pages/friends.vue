<template>
  <div class="px-6 my-8 sm:px-10">
    <!-- 'Add a Friend' button -->
    <div
      v-if="!showAddFriendForm"
      class="flex items-center justify-center my-6"
    >
      <button
        @click="toggleShowAddFriendForm"
        class="inline-flex items-center justify-center px-5 text-center text-white transition-colors duration-150 bg-green-600 rounded-lg flexgrow h-14 focus:shadow-outline hover:bg-green-700"
      >
        <i class="text-2xl text-center fill-current fa-solid fa-user-plus"></i>
        <span class="ml-3 font-bold">Add a Friend</span>
      </button>
    </div>

    <!-- Form for adding a friend -->
    <div
      v-if="showAddFriendForm"
      class="flex flex-col items-center justify-center my-6"
    >
      <!-- Form control (label and input) -->
      <label class="mb-1 text-sm font-medium">Email</label>
      <input
        type="email"
        v-model="addFriendEmail"
        class="w-full max-w-sm px-3 py-2 mb-6 leading-tight text-center text-gray-700 border rounded shadow focus:outline-blue-300"
        placeholder="Your friend's email"
      />

      <!-- 'Cancel' / 'Add Friend' buttons -->
      <div class="flex items-center justify-center w-full max-w-sm">
        <button
          @click="toggleShowAddFriendForm"
          class="flex inline-flex items-center justify-center flex-1 h-12 px-5 text-center text-gray-500 transition-colors duration-150 border border-gray-500 rounded-lg focus:shadow-outline hover:text-gray-400"
        >
          <i class="text-3xl fill-current fa-solid fa-multiply"></i>
          <span class="ml-3 font-bold">Cancel</span>
        </button>
        <button
          @click="addFriend"
          class="flex inline-flex items-center justify-center flex-1 h-12 px-5 ml-3 text-center text-white transition-colors duration-150 bg-green-600 rounded-lg focus:shadow-outline hover:bg-green-700"
        >
          <i
            class="text-2xl text-center fill-current fa-solid fa-user-plus"
          ></i>
          <span class="ml-3 font-bold">Add Friend</span>
        </button>
      </div>
    </div>

    <hr v-if="user.friends.length > 0" class="my-8" />

    <!-- Searchbar -->
    <div
      v-if="user.friends.length > 1"
      class="flex flex-col items-center justify-center my-6"
    >
      <input
        v-model="searchQuery"
        type="search"
        class="w-full max-w-lg px-3 py-3 pl-5 leading-tight text-gray-700 border border-2 border-gray-300 sm:pl-6 rounded-xl solid border-1 focus:outline-none focus:border-blue-300"
        placeholder="Search..."
      />
    </div>

    <!-- People in user's friends list -->
    <div v-for="friend in filteredFriends" :key="friend.id">
      <PersonCard :person="friend" :userList="user.list" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  user: Object,
  users: Object,
});

const config = useRuntimeConfig();
let searchQuery = ref();
let showAddFriendForm = ref(false);
let addFriendEmail = ref();
let friends;
setFriends();
let filteredFriends = ref(friends);

function setFriends() {
  friends = props.users.filter((person) =>
    props.user.friends.includes(person.email)
  );
}

function toggleShowAddFriendForm() {
  showAddFriendForm.value = !showAddFriendForm.value;
}

function addFriend() {
  props.user.friends.unshift(addFriendEmail.value);
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
    .then(toggleShowAddFriendForm())
    .then(setFriends())
    .then((filteredFriends.value = friends));
  addFriendEmail.value = "";
}

watch(searchQuery, () => {
  filteredFriends.value = friends.filter((friend) => {
    return (
      friend.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      friend.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
});
</script>
