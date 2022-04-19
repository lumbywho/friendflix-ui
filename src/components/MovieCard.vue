<template>
  <!-- On any page except 'Movie' page -->
  <NuxtLink v-if="route.name != 'movie-id'" :to="'/movie/' + movie.id">
    <div
      class="flex p-4 mb-6 border-4 border-solid rounded-lg cursor-pointer hover:border-blue-300"
    >
      <img
        class="inline-block object-cover w-32 h-48 gap-0 rounded"
        :src="movie.photo"
      />

      <div class="ml-4 max-h-48 overflow-clip">
        <h1 class="mt-1 text-xl font-medium">{{ movie.name }}</h1>
        <h2 class="text-sm text-gray-500">{{ movie.year }}</h2>
        <p class="my-2 text-sm">{{ movie.plot }}</p>
      </div>
    </div>
  </NuxtLink>

  <!-- On 'Movie' page -->
  <div v-if="route.name == 'movie-id'">
    <div
      class="flex p-4 mb-6 border-4 border-dashed rounded-lg cursor-auto hover:border-gray-200"
    >
      <img
        class="inline-block object-cover w-32 h-48 gap-0 rounded"
        :src="movie.photo"
      />

      <div class="ml-4 max-h-48 overflow-clip">
        <h1 class="mt-1 text-xl font-medium">{{ movie.name }}</h1>
        <h2 class="text-sm text-gray-500">{{ movie.year }}</h2>
        <p class="my-2 text-sm">{{ movie.plot }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  route: Object,
  movie: Object,
});

const route = useRoute();
</script>
