<template>
  <!--  On 'Friends' Page -->
  <NuxtLink v-if="route.name == 'friends'" :to="'/user/' + person.id">
    <div
      class="flex p-2 mb-6 border-4 border-solid rounded-lg hover:border-blue-300"
    >
      <img
        class="inline-block object-cover w-24 h-24 gap-0 border rounded-full"
        :src="person.photo"
      />
      <div class="w-full h-24 ml-4 overflow-clip">
        <h1 class="pt-1 text-xl font-medium">{{ person.name }}</h1>
        <h2 class="text-sm text-gray-500">
          {{ numOfMatches }} {{ numOfMatches == 1 ? "match" : "matches" }}
        </h2>
        <p class="w-full h-full my-2 mr-2 text-sm text-gray-700">
          {{ person.email }}
        </p>
      </div>
    </div>
  </NuxtLink>

  <!--  On 'User' Page -->
  <div v-if="route.name == 'user-id'">
    <div class="flex p-2 mb-6 border-4 border-dashed rounded-lg">
      <img
        class="inline-block object-cover w-24 h-24 gap-0 border rounded-full"
        :src="person.photo"
      />
      <div class="w-full h-24 ml-4 overflow-clip">
        <h1 class="pt-1 text-xl font-medium">{{ person.name }}</h1>
        <h2 class="text-sm text-gray-500">
          {{ numOfMatches }} {{ numOfMatches == 1 ? "match" : "matches" }}
        </h2>
        <p class="w-full h-full my-2 mr-2 text-sm text-gray-700">
          {{ person.email }}
        </p>
        np
      </div>
    </div>
  </div>

  <!--  On 'Profile' Page -->
  <div v-if="route.name == 'profile'">
    <div class="flex p-2 mb-6 border-4 border-dashed rounded-lg">
      <img
        class="inline-block object-cover w-24 h-24 gap-0 border rounded-full"
        :src="person.photo"
      />
      <div class="w-full h-24 ml-4 overflow-clip">
        <h1 class="pt-1 text-xl font-medium">{{ person.name }}</h1>
        <h2 class="text-sm text-gray-500">That's you!</h2>
        <p class="w-full h-full my-2 mr-2 text-sm text-gray-700">
          {{ person.email }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  route: Object,
  person: Object,
  userList: Array,
});

const route = useRoute();
let numOfMatches = ref();
if (route.name != "profile") setNumOfMatches();

function setNumOfMatches() {
  const res = props.userList.filter((movie) =>
    props.person.list.includes(movie)
  );
  numOfMatches.value = res.length;
}
</script>
