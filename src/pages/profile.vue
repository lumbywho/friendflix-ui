<template>
  <div class="px-6 my-8 sm:px-10">
    <PersonCard :person="user" />
  </div>
</template>

<script setup>
const props = defineProps({
  user: Object,
});
</script>
