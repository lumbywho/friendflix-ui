<template>
  <div class="px-6 my-8 sm:px-10">
    <!-- Searchbar -->
    <div
      v-if="user.list.length > 1"
      class="flex flex-col items-center justify-center my-6"
    >
      <input
        v-model="searchQuery"
        type="search"
        class="w-full max-w-lg px-3 py-3 pl-5 leading-tight text-gray-700 border border-2 border-gray-300 sm:pl-6 rounded-xl solid border-1 focus:outline-none focus:border-blue-300"
        placeholder="Search..."
      />
    </div>

    <!-- To be shown if there are no movies in user's list -->
    <div v-if="user.list.length == 0" class="text-center">
      <h1 class="text-3xl font-medium">Uh oh...</h1>
      <h2 class="mt-4 text-xl">Your list seems to be empty.</h2>
      <p class="my-2 text-l">
        Why don't you go visit the Explore page and add some movies to your
        list? 🙂
      </p>
      <NuxtLink to="/explore">
        <button
          class="flex inline-flex items-center justify-center w-48 px-5 my-4 mr-2 text-center text-white transition-colors duration-150 bg-blue-400 rounded-lg h-14 focus:shadow-outline hover:bg-blue-500"
        >
          <i class="text-2xl text-center fill-current fa-solid fa-compass"></i>
          <span class="ml-3 font-bold">Explore Movies</span>
        </button>
      </NuxtLink>
    </div>

    <!-- Movies in user's list -->
    <div v-for="movie in filteredUserMovies" :key="movie">
      <MovieCard :movie="movie" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  user: Object,
  movies: Object,
});

let searchQuery = ref();
let userMovies = getUserMovies();
let filteredUserMovies = ref(userMovies);

function getUserMovies() {
  const res = [];
  for (let i = 0; i < props.user.list.length; i++) {
    res.push(props.movies[props.user.list[i] - 1]);
  }
  return res;
}

watch(searchQuery, () => {
  filteredUserMovies.value = userMovies.filter((movie) => {
    return (
      movie.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      movie.year.includes(searchQuery.value) ||
      movie.plot.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
});
</script>
