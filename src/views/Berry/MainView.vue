<template>
  <div>
    <Container>
      <template #content>
        <BerryComponent />
      </template>
    </Container>
  </div>
</template>

<script lang="ts">
import Container from '@/components/ContainerIntance.vue'
import BerryComponent from '@/components/BerryComponent/TabelsData.vue'

export default {
  components: { BerryComponent, Container },
}
</script>
