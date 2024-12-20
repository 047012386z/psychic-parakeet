<template>
    <div>
        <h1>Image Gallery</h1>
        
        <div v-if="loading">Loading images...</div>
        <div v-else>
            <table class="image-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="image in images" :key="image.id">
                        <td class="image-item">
                            <img :src="image.url" :alt="image.name" />
                        </td>
                        <td>{{ formatDateTime(image.dateTime) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Image {
    id: number;
    url: string;
    name: string;
    dateTime: string;
}

export default defineComponent({
    data() {
        return {
            images: [] as Image[],
            loading: true,
            selectedFile: null as File | null,
            uploadError: ''
        };
    },
    methods: {
        formatDateTime(dateTime: string) {
            const date = new Date(dateTime);
            return date.toLocaleString();
        },
        async fetchImages() {
            try {
                const response = await fetch('/api/photos');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let images = await response.json();
                images = images.sort((a: Image, b: Image) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
                this.images = images;
            } catch (error) {
                console.error('Error fetching images:', error);
            } finally {
                this.loading = false;
            }
        }
    },
    async mounted() {
        await this.fetchImages();
    }
});
</script>

<style scoped>
.image-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.image-table th, .image-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.image-table th {
    background-color: #f2f2f2;
}

.image-item img {
    max-width: 100px;
    max-height: 100px;
}

.error {
    color: red;
    margin-top: 10px;
}
</style>
