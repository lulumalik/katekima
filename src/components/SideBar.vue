<template>
  <div class="overflow-hidden">
    <div
      :class="[
        'bg-gray-900 text-white h-full transition-all duration-300',
        isOpen ? 'w-64' : 'w-16',
      ]"
    >
      <label class="flex cursor-pointer">
        <div class="p-4 w-full" v-if="isOpen">
          <img src="../assets/katekima_logo.jpg" class="rounded-md w-12" />
        </div>
        <button
          @click="toggleSidebar"
          :class="!isOpen ? 'pt-8 pl-6' : 'p-4'"
          class="cursor-pointer focus:outline-none"
        >
          ☰
        </button>
      </label>
      <div class="relative px-4 pt-4" v-if="isOpen">
        <!-- Tombol Menu -->
        <button
          @click="toggleDropdown"
          class="px-4 py-2 w-full bg-gray-800 text-white rounded-md flex items-center gap-2 hover:bg-gray-700"
        >
          <div class="w-full text-left">Menu</div>
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 10l5 5 5-5H7z" />
          </svg>
        </button>

        <!-- Dropdown dengan Push Animation -->
        <div
          class="overflow-hidden transition-all duration-300 pt-2"
          :class="isOpenDropdown ? 'h-auto max-h-40 mt-2' : 'h-0 max-h-0'"
        >
          <ul class="bg-white border border-gray-300 rounded-md shadow-md">
            <li
              v-for="item in menuItems"
              :key="item.path"
              class="p-3 hover:bg-gray-200"
              :class="{ 'bg-gray-900 rounded-md text-white': isActive(item.path) }"
            >
              <router-link :to="item.path" @click="closeDropdown">{{ item.label }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

import { useRoute } from 'vue-router'

export default {
  setup() {
    const isOpen = ref(true)
    const toggleSidebar = () => {
      isOpen.value = !isOpen.value
    }
    const route = useRoute()

    const menuItems = [
      { label: 'Product', path: '/' },
      { label: 'Berry', path: '/berry' },
    ]

    const isActive = (path) => {
      return route.path === path
    }

    const isOpenDropdown = ref(false)

    const toggleDropdown = () => {
      isOpenDropdown.value = !isOpenDropdown.value
    }

    const closeDropdown = () => {
      isOpenDropdown.value = false
    }

    return {
      isOpen,
      toggleSidebar,
      isOpenDropdown,
      toggleDropdown,
      isActive,
      closeDropdown,
      menuItems,
    }
  },
}
</script>
