<template>
    <div class="p-5">
      <h1>Submit Data</h1>
      <input 
        type="text" 
        v-model="data" 
        placeholder="Enter your data" 
        class="border p-2"
      />
      <button @click="submitData" class="bg-blue-500 text-white px-4 py-2 mt-2">
        Submit Data
      </button>
  
      <div v-if="message" class="mt-4">
        <p :class="{'text-green-500': isSuccess, 'text-red-500': !isSuccess}">
          {{ message }}
        </p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const data = ref<string>('')
  const message = ref<string | null>(null)
  const isSuccess = ref<boolean>(false)
  
  async function submitData() {
    if (!data.value) {
      message.value = 'Please enter some data before submitting'
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
        message.value = 'Data submitted successfully!'
        isSuccess.value = true
        data.value = '' // ล้างข้อมูลหลัง submit สำเร็จ
      } else {
        message.value = 'Error submitting data: ' + result.message
        isSuccess.value = false
      }
    } catch (error) {
      console.error('Error submitting data:', error)
      message.value = 'Error submitting data'
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
  </style>
  