<script setup lang="ts">
import QRCode from 'qrcode';

const textInput = ref('');
const qrCodeImage = ref('');

const generateQRCode = async () => {
  if (textInput.value) {
    qrCodeImage.value = await QRCode.toDataURL(textInput.value);
  } else {
    alert('กรุณากรอกข้อความ');
  }
};
</script>

<template>
  <div class="container">
    <h1>สร้าง QR Code</h1>
    <input
      type="text"
      v-model="textInput"
      placeholder="ใส่ข้อความ"
      class="border p-2"
    />
    <button @click="generateQRCode" class="bg-blue-500 text-white px-4 py-2">
      สร้าง QR Code
    </button>
    <div v-if="qrCodeImage" class="mt-5">
      <h2>QR Code</h2>
      <img :src="qrCodeImage" alt="QR Code" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  text-align: center;
  padding-top: 20vh; /* Adjust this value as needed */
}
</style>