<template>
  <div class="flex items-center justify-center pt-6 pb-6 bg-gray-100">
    <div class="bg-white shadow-lg rounded-xl p-4 w-full max-w-4xl">
      <h1 class="text-2xl font-bold text-center text-gray-800 pb-6">{{ $t('berry_list') }}</h1>

      <!-- Pencarian & Jumlah Per Halaman -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-4 pb-4">
        <input
          v-model="search"
          type="text"
          placeholder="🔍 ..."
          class="w-full md:w-1/2 p-2 text-black border rounded-lg focus:ring focus:ring-blue-300"
        />
        <select
          v-model="limit"
          class="p-2 border text-black rounded-lg bg-gray-50 focus:ring focus:ring-blue-300"
        >
          <option value="10">10</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
      </div>

      <!-- Tabel -->
      <div class="overflow-x-auto" style="height: 56.6vh">
        <div v-if="isLoading" class="mt-4">
          <div class="animate-pulse bg-gray-200 h-6 rounded-md w-40 mx-auto"></div>
          <div class="h-4"></div>
          <div class="animate-pulse bg-gray-200 h-6 rounded-md w-60 mx-auto mt-4"></div>
        </div>
        <table v-if="!isLoading" class="w-full border border-gray-300 rounded-lg shadow-sm">
          <thead>
            <tr class="bg-blue-500 text-white">
              <th class="p-3 font-semibold border border-gray-300">{{ $t('no') }}</th>
              <th
                class="p-3 font-semibold border border-gray-300 cursor-pointer"
                @click="toggleSortOrder"
              >
                {{ $t('name') }}
                <span>{{ sortOrder === 'asc' ? '⬆️' : '⬇️' }}</span>
              </th>
              <th class="p-3 font-semibold border border-gray-300">{{ $t('action') }}</th>
            </tr>
          </thead>
          <tbody class="text-black">
            <tr
              v-for="(item, index) in filteredData"
              :key="item.name"
              class="hover:bg-gray-100 transition"
            >
              <td class="p-3 text-center border border-gray-300">{{ index + 1 + offset }}</td>
              <td class="p-3 border border-gray-300">{{ item.name }}</td>
              <td class="p-3 text-center border border-gray-300 flex justify-center gap-3">
                <router-link :to="`/berry/${item.name}`" class="text-blue-500 hover:text-blue-600">
                  {{ $t('detail') }}
                </router-link>
              </td>
            </tr>
            <tr v-if="filteredData.length === 0">
              <td class="p-3 border border-gray-300 text-center" colspan="3">
                {{ $t('no_data') }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="pt-6 flex justify-between items-center">
        <button
          @click="prevPage"
          :disabled="offset === 0"
          class="px-4 py-2 bg-gray-300 cursor-pointer text-gray-700 rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
        >
          ⬅️ {{ $t('prev') }}
        </button>
        <span class="text-gray-700 font-semibold">{{ $t('page') }} {{ currentPage }}</span>
        <button
          @click="nextPage"
          :disabled="!hasNextPage"
          class="px-4 py-2 bg-gray-300 cursor-pointer text-gray-700 rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
        >
          {{ $t('next') }} ➡️
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const berries = ref([]) // Perbaikan nama variabel dari "abilities" ke "berries"
const isLoading = ref(true)
const search = ref(route.query.search || '')
const limit = ref(parseInt(route.query.limit as string) || 30)
const offset = ref(parseInt(route.query.offset as string) || 0)
const totalCount = ref(0)

// State untuk sorting
const sortOrder = ref<'asc' | 'desc'>('asc')

const fetchData = async (newOffset = offset.value) => {
  isLoading.value = true
  berries.value = []
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/berry/?limit=${limit.value}&offset=${parseInt(newOffset as never)}`,
    )
    const data = await response.json()
    berries.value = data.results
    totalCount.value = data.count
    offset.value = parseInt(newOffset as never)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  isLoading.value = false
}

onMounted(() => fetchData())

// Pagination
const currentPage = computed(() => Math.floor(offset.value / limit.value) + 1)
const hasNextPage = computed(() => offset.value + limit.value < totalCount.value)

const nextPage = () => fetchData(offset.value + limit.value)
const prevPage = () => fetchData(offset.value - limit.value)

// Sorting
const sortedData = computed(() => {
  return [...berries.value].sort((a, b) =>
    sortOrder.value === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
  )
})

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

// Filter pencarian
const filteredData = computed(() => {
  return sortedData.value.filter((item) =>
    (item.name as string).toLowerCase().includes((search.value as string).toLowerCase()),
  )
})

// Update query params saat search, limit, atau offset berubah
watch([search, limit, offset], ([newSearch, newLimit, newOffset]) => {
  router.replace({
    query: { search: newSearch, limit: newLimit.toString(), offset: newOffset.toString() },
  })
})
</script>
