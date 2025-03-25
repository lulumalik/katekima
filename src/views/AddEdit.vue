<template>
  <div class="flex items-center justify-center w-screen min-h-screen bg-gray-100">
    <div class="bg-white shadow-lg rounded-xl p-6 w-full max-w-xl">
      <h1 class="text-2xl font-bold text-center text-gray-800 pb-6">
        {{ isEdit ? `✏️ ${$t('edit')}` : `➕ ${$t('add_product')}` }}
      </h1>

      <!-- Alert Sukses -->
      <div v-if="message" class="pt-4">
        <div
          class="mt-4 p-3 bg-green-100 text-green-700 border border-green-400 rounded-lg text-center"
        >
          🎉 {{ message }}
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Nama Produk -->
        <div>
          <label class="block font-semibold text-gray-700 mb-1">{{ $t('product_name') }}</label>
          <input
            v-model="product.title"
            class="w-full text-black p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            placeholder="..."
            required
          />
        </div>

        <!-- Harga -->
        <div class="pt-4">
          <label class="block font-semibold text-gray-700 mb-1">{{ $t('price') }}</label>
          <input
            type="number"
            v-model="product.price"
            class="w-full text-black p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            placeholder="..."
            required
          />
        </div>

        <!-- Kategori -->
        <div class="pt-4">
          <label class="block font-semibold text-gray-700 mb-1">{{ $t('category') }}</label>
          <input
            v-model="product.category"
            class="w-full text-black p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            placeholder="..."
            required
          />
        </div>

        <!-- Deskripsi -->
        <div class="pt-4">
          <label class="block font-semibold text-gray-700 mb-1">{{ $t('desc') }}</label>
          <textarea
            v-model="product.description"
            class="w-full text-black p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            placeholder="..."
            required
          ></textarea>
        </div>

        <!-- Gambar Produk -->
        <div class="pt-4">
          <label class="block font-semibold text-gray-700 mb-1">{{ $t('url') }}</label>
          <input
            v-model="product.image"
            type="url"
            class="w-full text-black p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            placeholder="..."
          />
        </div>

        <!-- Tombol Submit -->
        <div class="pt-6">
          <button
            type="submit"
            class="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            {{ isEdit ? `💾 ${$t('save')}` : `✅ ${$t('add_product')}` }}
          </button>
          <div class="pt-6 text-center">
            <router-link to="/" class="text-blue-500 font-semibold hover:underline">
              ← {{ $t('back') }}
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isEdit = ref(!!route.params.id)
const product = ref({
  title: '',
  price: '',
  category: '',
  description: '',
  image: '',
})
const message = ref('')

const fetchProduct = async (id) => {
  isEdit.value = true
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
    const data = await response.json()
    product.value = { ...data }
  } catch (error) {
    console.error('Error fetching product:', error)
  }
}

const handleSubmit = async () => {
  const url = isEdit.value
    ? `https://fakestoreapi.com/products/${route.query.id}`
    : 'https://fakestoreapi.com/products'

  const method = isEdit.value ? 'PUT' : 'POST'

  try {
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product.value),
    })

    if (response.ok) {
      message.value = isEdit.value ? 'Produk berhasil diperbarui!' : 'Produk berhasil ditambahkan!'
      setTimeout(() => router.push('/'), 2000)
    } else {
      console.error('Gagal menyimpan produk')
    }
  } catch (error) {
    console.error('Error saving product:', error)
  }
}

onMounted(() => {
  if (route.query.id) {
    fetchProduct(route.query.id)
  }
})
</script>
