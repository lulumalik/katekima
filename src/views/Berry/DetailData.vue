<template>
  <Container>
    <template #content>
      <div class="flex items-center justify-center bg-gray-100 pt-6 pb-7" style="min-height: 50vh">
        <div class="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
          <!-- Judul -->
          <h1 class="text-2xl font-bold text-center text-gray-800 pb-4">
            {{ $t('detail_berry') }}
          </h1>

          <div v-if="isLoading" class="mt-4">
            <div class="animate-pulse bg-gray-200 h-6 rounded-md w-40 mx-auto"></div>
            <div class="h-4"></div>
            <div class="animate-pulse bg-gray-200 h-6 rounded-md w-60 mx-auto mt-4"></div>
          </div>

          <div v-else-if="berry" class="mt-4 text-center">
            <!-- Tabel -->
            <div class="overflow-x-auto">
              <table class="w-full border border-gray-300 rounded-lg shadow-sm">
                <tbody>
                  <tr class="bg-gray-100">
                    <td class="p-3 font-semibold text-gray-700 border border-gray-300">
                      {{ $t('name') }}
                    </td>
                    <td class="p-3 text-gray-700 border border-gray-300">{{ berry.name }}</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-3 font-semibold text-gray-700 border border-gray-300">
                      {{ $t('size') }}
                    </td>
                    <td class="p-3 text-gray-700 border border-gray-300">{{ berry.size }} mm</td>
                  </tr>
                  <tr class="bg-gray-100">
                    <td class="p-3 font-semibold text-gray-700 border border-gray-300">
                      {{ $t('firmness') }}
                    </td>
                    <td class="p-3 text-gray-700 border border-gray-300">
                      {{ berry.firmness.name }}
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-3 font-semibold text-gray-700 border border-gray-300">
                      {{ $t('growth_time') }}
                    </td>
                    <td class="p-3 text-gray-700 border border-gray-300">
                      {{ berry.growth_time }} {{ $t('hours') }}
                    </td>
                  </tr>
                  <tr class="bg-gray-100">
                    <td class="p-3 font-semibold text-gray-700 border border-gray-300">
                      {{ $t('max_harvest') }}
                    </td>
                    <td class="p-3 text-gray-700 border border-gray-300">
                      {{ berry.max_harvest }}
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-3 font-semibold text-gray-700 border border-gray-300">
                      {{ $t('natural_gift_power') }}
                    </td>
                    <td class="p-3 text-gray-700 border border-gray-300">
                      {{ berry.natural_gift_power }}
                    </td>
                  </tr>
                  <tr class="bg-gray-100">
                    <td class="p-3 font-semibold text-gray-700 border border-gray-300">
                      {{ $t('natural_gift_type') }}
                    </td>
                    <td class="p-3 text-gray-700 border border-gray-300">
                      {{ berry.natural_gift_type.name }}
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-3 font-semibold text-gray-700 border border-gray-300">
                      {{ $t('smoothness') }}
                    </td>
                    <td class="p-3 text-gray-700 border border-gray-300">{{ berry.smoothness }}</td>
                  </tr>
                  <tr class="bg-gray-100">
                    <td class="p-3 font-semibold text-gray-700 border border-gray-300">
                      {{ $t('soil_dryness') }}
                    </td>
                    <td class="p-3 text-gray-700 border border-gray-300">
                      {{ berry.soil_dryness }}
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-3 font-semibold text-gray-700 border border-gray-300">Flavors</td>
                    <td class="p-3 text-gray-700 border border-gray-300">
                      <ul>
                        <li v-for="flavor in berry.flavors" :key="flavor.flavor.name">
                          {{ flavor.flavor.name }} ({{ $t('potency') }}: {{ flavor.potency }})
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="pt-6 text-center">
            <router-link to="/berry" class="text-blue-500 font-semibold hover:underline">
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
import { useRoute } from 'vue-router'
import Container from '@/components/ContainerIntance.vue'
export default {
  components: { Container },
  setup() {
    const route = useRoute()
    const berry = ref(null)
    const isLoading = ref(true)

    const fetchBerry = async (name) => {
      isLoading.value = true
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/berry/${name}`)
        berry.value = await response.json()
      } catch (error) {
        console.error('Error fetching berry:', error)
      }
      isLoading.value = false
    }

    onMounted(() => fetchBerry(route.params.id))
    watch(() => route.params.id, fetchBerry)

    return { berry, isLoading }
  },
}
</script>
