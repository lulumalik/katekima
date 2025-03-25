<template>
  <nav class="bg-gray-900 text-white p-7 flex justify-between">
    <router-link to="/" class="text-lg font-bold"
      ><svg
        class="w-6 h-6 text-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    </router-link>
    <div>
      <select
        v-model="$i18n.locale"
        @change="saveLanguage"
        class="text-white py-1 bg-blue-500 border px-2 rounded-md"
      >
        <option value="en">English</option>
        <option value="id">Bahasa Indonesia</option>
      </select>
      <router-link to="/add" class="px-4">{{ $t('add_product') }}</router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const saveLanguage = () => {
  localStorage.setItem('lang', locale.value) // Simpan pilihan bahasa
  location.reload() // Reload agar efeknya langsung terasa
}
</script>
