<template>
  <div>
    <Container>
      <template #content>
        <DataTable />
      </template>
    </Container>
  </div>
</template>

<script lang="ts">
import DataTable from '@/components/DataTable.vue'
import Container from '@/components/ContainerIntance.vue'

export default {
  components: { Container, DataTable },
}
</script>
