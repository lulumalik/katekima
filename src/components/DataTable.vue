<template>
  <div class="flex items-center justify-center pt-6 pb-6 bg-gray-100">
    <div class="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl">
      <h1 class="text-2xl font-bold text-center text-gray-800 pb-6">{{ $t('product_list') }}</h1>

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
      <div class="overflow-x-auto" style="height: 55vh">
        <table v-if="!isLoading" class="w-full border border-gray-300 rounded-lg shadow-sm">
          <thead>
            <tr class="bg-blue-500 text-white">
              <th class="p-3 font-semibold border border-gray-300">{{ $t('id') }}</th>
              <th class="p-3 font-semibold border border-gray-300">{{ $t('product_name') }}</th>
              <th class="p-3 font-semibold border border-gray-300">{{ $t('category') }}</th>
              <th class="p-3 font-semibold border border-gray-300">{{ $t('price') }}</th>
              <th class="p-3 font-semibold border border-gray-300">{{ $t('action') }}</th>
            </tr>
          </thead>
          <tbody class="text-black">
            <tr
              v-for="item in filteredProducts"
              :key="item.id"
              class="hover:bg-gray-100 transition"
            >
              <td class="p-3 text-center border border-gray-300">{{ item.id }}</td>
              <td class="p-3 border border-gray-300">{{ item.title }}</td>
              <td class="p-3 border border-gray-300">{{ item.category }}</td>
              <td class="p-3 border border-gray-300">{{ item.price.toFixed(2) }}</td>
              <td class="p-3 text-center border border-gray-300 flex justify-center gap-3">
                <router-link :to="`/detail/${item.id}`" class="text-blue-500 hover:text-blue-600">
                  🔍 {{ $t('detail') }}
                </router-link>
                <router-link
                  :to="`/add?id=${item.id}`"
                  class="text-yellow-500 hover:text-yellow-600"
                >
                  ✏️ {{ $t('edit') }}
                </router-link>
                <button @click="deleteItem(item.id)" class="text-red-500 hover:text-red-600">
                  ❌ {{ $t('delete') }}
                </button>
              </td>
            </tr>
            <tr v-if="filteredProducts.length == 0">
              <td class="p-3 border border-gray-300 text-center" colspan="5">
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
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
// const router = useRouter()

const products = ref([])
const isLoading = ref(true)
const search = ref(route.query.search || '')
const limit = ref(parseInt(route.query.limit as string) || 10)
const offset = ref(parseInt(route.query.offset as string) || 0)

const fetchData = async (newOffset = offset.value) => {
  isLoading.value = true
  products.value = []
  try {
    const response = await fetch(`https://fakestoreapi.com/products`)
    const data = await response.json()
    products.value = data.slice(newOffset, newOffset + limit.value)
    offset.value = newOffset
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  isLoading.value = false
}

onMounted(() => fetchData())

const currentPage = computed(() => Math.floor(offset.value / limit.value) + 1)
const hasNextPage = computed(() => offset.value + limit.value < products.value.length)

const nextPage = () => fetchData(offset.value + limit.value)
const prevPage = () => fetchData(offset.value - limit.value)

const filteredProducts = computed(() => {
  return products.value.filter((item) =>
    (item.title as string).toLowerCase().includes((search.value as string).toLowerCase()),
  )
})

const deleteItem = (id) => {
  if (confirm(`Apakah Anda yakin ingin menghapus produk ID ${id}?`)) {
    products.value = products.value.filter((item) => item.id !== id)
  }
}
</script>
