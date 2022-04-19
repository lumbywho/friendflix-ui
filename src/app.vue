<template>
  <div>
    <Head>
      <Title>FriendFlix</Title>
    </Head>
    <header>
      <TheNavbar :userPhoto="user.photo" />
    </header>
    <div class="max-w-2xl mx-auto">
      <NuxtPage :user="user" :users="users" :movies="movies" />
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const user = await fetch(config.API_URL + `user`).then((r) => r.json());
const users = await fetch(config.API_URL + `users`).then((r) => r.json());
const movies = await fetch(config.API_URL + `movies`).then((r) => r.json());
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css");
</style>
