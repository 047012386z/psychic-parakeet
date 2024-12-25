<template>
    <div class="gallery-container">
        <h1>Photo Gallery</h1>
        <ul class="gallery">
            <li v-for="item in data" :key="item.fileName" class="gallery-item">
                <h3>{{ item.fileName }}</h3>
                <img :src="item.imageUrl" alt="Image" class="gallery-image" />
                <p>Date Taken: {{ item.DateTimeOriginal }}</p>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const { data } = useFetch('/api/images');
</script>

<style scoped>
.gallery-container {
    text-align: center;
    padding: 20px;
}

.gallery {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.gallery-item {
    margin: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
}

.gallery-item:hover {
    transform: scale(1.05);
}

.gallery-image {
    max-width: 300px;
    max-height: 300px;
    width: 100%;
    height: auto;
    display: block;
}

h3 {
    margin: 10px 0;
}

p {
    margin: 10px;
    color: #555;
}
</style>