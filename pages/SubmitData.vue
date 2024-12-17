<template>
  <div class="p-5">
    <h1>Submit Data</h1>
    <div 
      class="border p-2 bg-gray-100 text-lg"
    >
      {{ data }}
    </div>
    <br>
    <button @click="submitData" class="bg-blue-500 text-white px-4 py-2 mt-2">
      ส่งข้อมูล
    </button>

    <div v-if="message" class="mt-4">
      <p :class="{'text-green-500': isSuccess, 'text-red-500': !isSuccess}">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const data = ref<string>('')
const message = ref<string | null>(null)
const isSuccess = ref<boolean>(false)

onMounted(() => {
  if (route.query.text) {
    data.value = route.query.text as string
  }
})

async function submitData() {
  if (!data.value) {
    message.value = 'กรุณากรอกข้อมูลก่อนส่ง'
    isSuccess.value = false
    return
  }

  const payload = {
    data: data.value,
    timestamp: Date.now() // ใช้ timestamp เป็น number ตามที่ api คาดหวัง
  }

  try {
    const response = await fetch('/api/storage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const result = await response.json()

    if (result.success) {
      message.value = 'ส่งข้อมูลสำเร็จ!'
      isSuccess.value = true
      data.value = '' // ล้างข้อมูลหลัง submit สำเร็จ
    } else {
      message.value = 'เกิดข้อผิดพลาดในการส่งข้อมูล: ' + result.message
      isSuccess.value = false
    }
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', error)
    message.value = 'เกิดข้อผิดพลาดในการส่งข้อมูล'
    isSuccess.value = false
  }
}
</script>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

p {
  font-size: 16px;
  margin-top: 10px;
}

.text-green-500 {
  color: green;
}

.text-red-500 {
  color: red;
}

.text-lg {
  font-size: 1.25rem; /* เพิ่มขนาดตัวหนังสือ */
}
</style>