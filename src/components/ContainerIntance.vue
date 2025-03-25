<template>
  <div class="flex bg-gray-100 w-screen h-screen">
    <Sidebar />
    <div class="flex-1">
      <Navbar />
      <slot name="content"></slot>
      <FooterIntance />
    </div>
  </div>
</template>

<script lang="ts">
import FooterIntance from '@/components/FooterIntance.vue'
import Navbar from '@/components/NavigationBar.vue'
import Sidebar from '@/components/SideBar.vue'

export default {
  components: { Sidebar, Navbar, FooterIntance },
}
</script>
