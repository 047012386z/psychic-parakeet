<template>
  <div class="p-5">
    <h1>Stored Data</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-if="data.length === 0">No data found.</div>
      <ul v-else>
        <li v-for="item in data" :key="item.key">
          <strong>Key:</strong> {{ item.key }} <br />
          <strong>Data:</strong> {{ item.value.data }} <br />
          <strong>Timestamp:</strong> {{ new Date(item.value.timestamp).toLocaleString() }} 
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const data = ref<{ key: string, value: { data: string, timestamp: number } }[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch('/api/storage')
    const result = await response.json()
    if (result.data) {
      data.value = result.data
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

strong {
  color: #333;
}
</style>
