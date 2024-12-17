<template>
    <div class="navbar">
      <ul class="menu">
        <li>
          <NuxtLink to="/scan" class="menu-link" active-class="active-link">Scan</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/show" class="menu-link" active-class="active-link">Show</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/genqrcode" class="menu-link" active-class="active-link">Generate QR Code</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/SubmitData" class="menu-link" active-class="active-link">Submit Data</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/stored-data" class="menu-link" active-class="active-link">View Stored Data</NuxtLink>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  /* สไตล์ของ Navbar */
  .navbar {
    background-color: #1e3a8a; /* สีน้ำเงินเข้ม */
    padding: 1rem 0;
    box-shadow: 0px 2px 10px rgba(0,0,0,0.1);
  }
  
  .menu {
    display: flex;
    justify-content: center; 
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  
  .menu li {
    margin: 0 15px; /* เว้นช่องว่างระหว่างปุ่ม */
  }
  
  .menu-link {
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    padding: 10px 20px;
    border-radius: 8px;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .menu-link:hover {
    background-color: #2563eb; /* สีฟ้าสดใสตอน hover */
  }
  
  .active-link {
    background-color: #2563eb; /* สีฟ้าสดใสสำหรับลิงก์ที่ใช้งานอยู่ */
    color: #fff;
    font-weight: bold;
  }
  
  </style>
  