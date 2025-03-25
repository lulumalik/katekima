<template>
  <Container>
    <template #content>
      <div class="flex items-center justify-center bg-gray-100 pt-6 pb-6" style="height: 83.7vh">
        <div class="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
          <!-- Judul -->
          <h1 class="text-2xl font-bold text-center text-gray-800">{{ $t('detail') }}</h1>

          <div v-if="isLoading" class="mt-4">
            <div class="animate-pulse bg-gray-200 h-6 rounded-md w-40 mx-auto"></div>
            <div class="h-4"></div>
            <div class="animate-pulse bg-gray-200 h-6 rounded-md w-60 mx-auto mt-4"></div>
          </div>

          <div v-else-if="product" class="mt-4 grid grid-cols-2 text-center">
            <!-- Gambar Produk -->
            <div class="pt-4 pl-12">
              <img
                :src="product.image"
                alt="Product Image"
                class="w-42 h-42 mx-auto p-2 rounded-lg shadow-md"
              />
            </div>

            <!-- Tabel Detail -->
            <div class="overflow-x-auto pt-4 pl-4">
              <table class="w-full border border-gray-300 rounded-lg shadow-sm">
                <tbody>
                  <tr class="bg-gray-100">
                    <td class="p-3 font-semibold text-gray-700 border border-gray-300">
                      {{ $t('name') }}
                    </td>
                    <td class="p-3 text-gray-700 border border-gray-300">{{ product.title }}</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-3 font-semibold text-gray-700 border border-gray-300">
                      {{ $t('category') }}
                    </td>
                    <td class="p-3 text-gray-700 border border-gray-300">{{ product.category }}</td>
                  </tr>
                  <tr class="bg-gray-100">
                    <td class="p-3 font-semibold text-gray-700 border border-gray-300">
                      {{ $t('price') }}
                    </td>
                    <td class="p-3 text-gray-700 border border-gray-300">${{ product.price }}</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-3 font-semibold text-gray-700 border border-gray-300">
                      {{ $t('desc') }}
                    </td>
                    <td class="p-3 text-gray-700 border border-gray-300">
                      <div style="max-height: 220px" class="overflow-auto">
                        {{ product.description }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Dropdown untuk memilih produk lain -->
          <div class="pt-6">
            <label for="productSelect" class="block text-gray-700 font-semibold">{{
              $t('product_name')
            }}</label>
            <select
              v-model="selectedProduct"
              id="productSelect"
              @change="changeDetail"
              class="w-full p-2 border rounded-lg text-black focus:ring focus:ring-blue-300"
            >
              <option v-for="item in products" :key="item.id" :value="item.id">
                {{ item.title }}
              </option>
            </select>
          </div>
          <!-- Tombol Kembali -->
          <div class="pt-4 text-center">
            <router-link to="/" class="text-blue-500 font-semibold hover:underline">
              ← {{ $t('back') }}
            </router-link>
          </div>
        </div>
      </div>
    </template>
  </Container>
</template>

<script lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Container from '@/components/ContainerIntance.vue'

export default {
  components: { Container },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const product = ref(null)
    const products = ref([])
    const selectedProduct = ref('')
    const isLoading = ref(true)

    // Fetch detail produk berdasarkan ID
    const fetchProduct = async (id) => {
      isLoading.value = true
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        product.value = await response.json()
        selectedProduct.value = id
      } catch (error) {
        console.error('Error fetching product:', error)
      }
      isLoading.value = false
    }

    // Fetch daftar produk untuk dropdown
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products')
        products.value = await response.json()
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    onMounted(async () => {
      await fetchProducts()
      await fetchProduct(route.params.id)
    })

    // Update detail saat ID di route berubah
    watch(() => route.params.id, fetchProduct)

    // Pindah ke detail produk lain
    const changeDetail = () => {
      router.push(`/detail/${selectedProduct.value}`)
    }

    return { product, products, selectedProduct, changeDetail, isLoading }
  },
}
</script>
