<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="max-w-2xl px-2 mx-auto sm:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button, opens/closes the disclosure panel at the very end of this template -->
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block w-6 h-6" aria-hidden="true" />
            <XIcon v-else class="block w-6 h-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div
          class="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start"
        >
          <div class="flex items-center flex-shrink-0">
            <NuxtLink to="/">
              <img
                class="block w-auto h-8 ml-8 sm:hidden"
                src="https://i.ibb.co/F3Q4X4p/ff-full-white.png"
                alt="FriendFlix"
              />
            </NuxtLink>
            <NuxtLink to="/">
              <img
                class="hidden w-auto h-8 sm:block"
                src="https://i.ibb.co/F3Q4X4p/ff-full-white.png"
                alt="Friendflix"
              />
            </NuxtLink>
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <NuxtLink
                to="/explore"
                class="px-3 py-2 text-base font-medium rounded-md"
                :class="
                  route.name == 'explore'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                "
                :aria-current="route.name == 'explore' ? 'page' : ''"
              >
                <i
                  class="mr-1 text-xl fa-solid fa-compass"
                  :class="route.name == 'explore' ? 'text-blue-400' : ''"
                ></i>
                Explore
              </NuxtLink>
              <NuxtLink
                to="/mylist"
                class="px-3 py-2 text-base font-medium rounded-md"
                :class="
                  route.name == 'mylist'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                "
                :aria-current="route.name == 'mylist' ? 'page' : ''"
              >
                <i
                  class="mr-1 text-xl fa-solid fa-heart"
                  :class="route.name == 'mylist' ? 'text-blue-400' : ''"
                ></i>
                My List</NuxtLink
              >
              <NuxtLink
                to="/friends"
                class="px-3 py-2 text-base font-medium rounded-md"
                :class="
                  route.name == 'friends'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                "
                :aria-current="route.name == 'friends' ? 'page' : ''"
              >
                <i
                  class="mr-1 text-xl fa-solid fa-user-group"
                  :class="route.name == 'friends' ? 'text-blue-400' : ''"
                ></i>
                Friends</NuxtLink
              >
            </div>
          </div>
        </div>

        <NuxtLink to="/profile">
          <img
            class="object-cover w-8 h-8 mr-1 rounded-full hover:ring-4 hover:cursor-pointer"
            :class="
              route.name == 'profile'
                ? 'ring-4 ring-blue-500'
                : 'hover:ring-gray-500'
            "
            :aria-current="route.name == 'profile' ? 'page' : ''"
            :src="userPhoto"
            alt="Profile Image"
          />
        </NuxtLink>
      </div>
    </div>

    <!-- Opened/closed by the DisclosureButton in the beginning of the template -->
    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <NuxtLink
          to="/explore"
          class="block px-3 py-2 text-base font-medium rounded-md"
          :class="
            route.name == 'explore'
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          "
          :aria-current="route.name == 'explore' ? 'page' : ''"
        >
          <i
            class="mr-3 text-xl fa-solid fa-compass"
            :class="route.name == 'explore' ? 'text-blue-400' : ''"
          ></i>
          Explore
        </NuxtLink>
        <NuxtLink
          to="/mylist"
          class="block px-3 py-2 text-base font-medium rounded-md"
          :class="
            route.name == 'mylist'
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          "
          :aria-current="route.name == 'mylist' ? 'page' : ''"
        >
          <i
            class="mr-3 text-xl fa-solid fa-heart"
            :class="route.name == 'mylist' ? 'text-blue-400' : ''"
          ></i>
          My List</NuxtLink
        >
        <NuxtLink
          to="/friends"
          class="block px-3 py-2 text-base font-medium rounded-md"
          :class="
            route.name == 'friends'
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          "
          :aria-current="route.name == 'friends' ? 'page' : ''"
        >
          <i
            class="mr-2 text-xl fa-solid fa-user-group"
            :class="route.name == 'friends' ? 'text-blue-400' : ''"
          ></i>
          Friends</NuxtLink
        >
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  MenuButton,
} from "@headlessui/vue";
import { MenuIcon, XIcon } from "@heroicons/vue/outline";

const props = defineProps({
  userPhoto: String,
});
</script>

<script>
export default {
  data() {
    return {
      route: useRoute(),
    };
  },
  watch: {
    $route(to) {
      this.route = to;
      window.scrollTo(0, 0);
    },
  },
};
</script>
