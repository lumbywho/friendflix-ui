<template>
  <div class="px-6 my-8 sm:px-10">
    <!-- To be shown if user added all movies into their list, or if there was just one movie left and they skipped that -->
    <div v-if="outOfMovies" class="text-center">
      <h1 class="text-3xl font-medium">Uh oh...</h1>
      <h2 class="mt-4 text-xl">We ran out of movie recommendations for you.</h2>
      <p class="my-2 text-l">
        Please come back later for new recommendations 🙂
      </p>
    </div>

    <!-- 🔥🐲 some really weird 'hydration mismatch' stuff happens if I don't use <client-only> here -->
    <!-- without this, the movie card's title/year/synopsis will change after render, photo will remain the same??? -->
    <!-- i could use <client-only> *just* for the <MovieCard>, but then the buttons appear *before* MovieCard does -->
    <client-only>
      <MovieCard v-if="!outOfMovies" :movie="currentMovie" />

      <!-- 'Skip' / 'Add to List' buttons -->
      <div v-if="!outOfMovies" class="flex items-center justify-center my-6">
        <button
          @click="changeCurrentMovie"
          class="flex inline-flex items-center justify-center flex-1 h-16 px-5 text-center text-gray-700 transition-colors duration-150 border border-gray-500 rounded-lg focus:shadow-outline hover:text-gray-500"
        >
          <i class="text-2xl fill-current fa-solid fa-forward"></i>
          <span class="ml-3 font-bold">Skip</span>
        </button>
        <button
          @click="addToList"
          class="flex inline-flex items-center justify-center flex-1 h-16 px-5 ml-3 text-center text-white transition-colors duration-150 bg-green-600 rounded-lg focus:shadow-outline hover:bg-green-700"
        >
          <i class="text-2xl text-center fill-current fa-solid fa-heart"></i>
          <span class="ml-3 font-bold">Add to List</span>
        </button>
      </div>
    </client-only>
  </div>
</template>

<script setup>
const props = defineProps({
  user: Object,
  movies: Object,
});

const config = useRuntimeConfig();
let outOfMovies = ref(false);
let filteredMovies = filterMovies();
let currentMovie = ref(getRandomMovie(filteredMovies));

// remove userMovies from allMovies
function filterMovies() {
  const userMovies = props.user.list;
  const allMovies = props.movies;
  const res = allMovies.filter((movie) => !userMovies.includes(movie.id));
  if (res.length == 0) {
    outOfMovies.value = true;
  }
  return res;
}

function getRandomMovie(movies) {
  return movies[Math.floor(Math.random() * movies.length)];
}

function changeCurrentMovie() {
  // temporarily filter out currentMovie from filteredMovies
  const newFilteredMovies = filteredMovies.filter(
    (movie) => movie.id != currentMovie.value.id
  );

  currentMovie.value = getRandomMovie(newFilteredMovies);
  if (!currentMovie.value) outOfMovies.value = true;
}

function addToList() {
  props.user.list.unshift(currentMovie.value.id);
  filteredMovies = filterMovies();
  changeCurrentMovie();
  fetch(config.API_URL + "user", {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      list: props.user.list,
    }),
  }).then((r) => r.json());
}
</script>
