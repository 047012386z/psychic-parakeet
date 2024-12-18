<template>
    <div>
        <h1>Image Gallery</h1>
        
        <div v-if="loading">Loading images...</div>
        <div v-else>
            <table>
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

export default defineComponent({
    data() {
        return {
            images: [] as Array<{ id: number, url: string, name: string, dateTime: string }>,
            loading: true,
            error: ''
        };
    },
    async mounted() {
        try {
            const response = await fetch('/api/photos');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            // Sort images by dateTime
            this.images = data.sort((a: { dateTime: string }, b: { dateTime: string }) => 
                new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
            );
        } catch (error) {
            console.error('Error fetching images:', error);
            this.error = 'Failed to load images. Please try again later.';
        } finally {
            this.loading = false;
        }
    },
    methods: {
        formatDateTime(dateTime: string) {
            const date = new Date(dateTime);
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        }
    }
});
</script>

<style scoped>
.image-item img {
    width: 100px;
    height: auto;
    border-radius: 8px;
}
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}
</style>