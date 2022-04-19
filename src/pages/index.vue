<template>
  <div class="px-6 my-8 text-center sm:px-10">
    <!-- Intro -->
    <!-- -->
    <h1 class="text-3xl font-medium">
      Welcome to <span class="text-blue-500">FriendFlix</span>
    </h1>
    <h2 class="mt-4 text-xl">Hello, {{ user.name }}! 👋</h2>
    <p class="my-2 text-l">What would you like to do?</p>

    <!-- Links to top-level pages -->
    <!-- -->
    <NuxtLink to="/explore">
      <button
        class="flex inline-flex items-center justify-center w-48 px-5 my-2 mr-2 text-center text-white transition-colors duration-150 bg-blue-400 rounded-lg h-14 focus:shadow-outline hover:bg-blue-500"
      >
        <i class="text-2xl text-center fill-current fa-solid fa-compass"></i>
        <span class="ml-3 font-bold">Explore Movies</span>
      </button>
    </NuxtLink>

    <NuxtLink to="/mylist">
      <button
        class="flex inline-flex items-center justify-center w-48 px-5 my-2 mr-2 text-center text-white transition-colors duration-150 bg-blue-400 rounded-lg h-14 focus:shadow-outline hover:bg-blue-500"
      >
        <i class="text-2xl text-center fill-current fa-solid fa-heart"></i>
        <span class="ml-3 font-bold">View My List</span>
      </button>
    </NuxtLink>

    <NuxtLink to="/friends">
      <button
        class="flex inline-flex items-center justify-center w-48 px-5 my-2 mr-2 text-center text-white transition-colors duration-150 bg-blue-400 rounded-lg h-14 focus:shadow-outline hover:bg-blue-500"
      >
        <i class="text-2xl text-center fill-current fa-solid fa-user-group"></i>
        <span class="ml-3 font-bold">View Friends</span>
      </button>
    </NuxtLink>

    <NuxtLink to="/profile">
      <button
        class="flex inline-flex items-center justify-center w-48 px-5 my-2 mr-2 text-center text-white transition-colors duration-150 bg-blue-400 rounded-lg h-14 focus:shadow-outline hover:bg-blue-500"
      >
        <i class="text-2xl text-center fill-current fa-solid fa-user"></i>
        <span class="ml-3 font-bold">View Profile</span>
      </button>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  user: Object,
});
</script>
