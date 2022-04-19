<template>
  <div class="px-6 my-8 sm:px-10">
    <MovieCard :movie="movie" />

    <!-- Buttons -->
    <div class="flex items-center justify-center mt-6">
      <a
        class="flex inline-flex items-center justify-center flex-1 h-16 px-5 text-center text-gray-700 transition-colors duration-150 border border-gray-500 rounded-lg focus:shadow-outline hover:text-gray-500"
        :href="movie.trailer"
        target="_blank"
      >
        <i
          class="text-2xl fill-current fa-solid fa-arrow-up-right-from-square"
        ></i>
        <span class="ml-3 font-bold">Watch Trailer</span>
      </a>
      <button
        v-if="!isInList"
        @click="addToList()"
        class="flex inline-flex items-center justify-center flex-1 h-16 px-5 ml-3 text-center text-white transition-colors duration-150 bg-green-600 rounded-lg focus:shadow-outline hover:bg-green-700"
      >
        <i class="text-2xl text-center fill-current fa-solid fa-heart"></i>
        <span class="ml-3 font-bold">Add to List</span>
      </button>
      <button
        v-if="isInList"
        @click="removeFromList()"
        class="flex inline-flex items-center justify-center flex-1 h-16 px-5 ml-3 text-center text-white transition-colors duration-150 bg-red-400 rounded-lg focus:shadow-outline hover:bg-red-500"
      >
        <i class="text-2xl text-center fill-current fa-solid fa-trash-can"></i>
        <span class="ml-3 font-bold">Remove from List</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  user: Object,
  movies: Object,
});

const config = useRuntimeConfig();
const route = useRoute();
const movieID = route.params.id;
const movie = props.movies[movieID - 1];
let isInList = ref();
setIsInList();

function setIsInList() {
  if (props.user.list.includes(movieID)) isInList.value = true;
  else isInList.value = false;
}

function addToList() {
  props.user.list.unshift(movieID);
  setIsInList();
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

function removeFromList() {
  props.user.list = props.user.list.filter((item) => item != movieID);
  setIsInList();
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
