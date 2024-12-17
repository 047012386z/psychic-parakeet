<template>
    <div class="photo-data">
        <table>
            <thead>
                <tr>
                    <th>รูปภาพ</th>
                    <th>เวลาที่สร้าง</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="photo in sortedPhotos" :key="photo.id">
                    <td><img :src="photo.url" :alt="photo.description" /></td>
                    <td>{{ new Date(photo.createdAt).toLocaleString() }}</td>
                </tr>
                <!-- Add a new row for the specific image -->
                <tr>
                    <td><img src="/images/ดาวน์โหลด.jpg" alt="ดาวน์โหลด" /></td>
                    <td>{{ new Date().toLocaleString() }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            photos: [],
            loading: true,
            error: null
        };
    },
    computed: {
        sortedPhotos() {
            return this.photos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
    },
    created() {
        this.loadPhotos();
    },
    methods: {
        async loadPhotos() {
            try {
                const response = await fetch('/api/photos');
                const result = await response.json();
                if (result.photos) {
                    this.photos = result.photos;
                }
            } catch (error) {
                this.error = 'Failed to load photos';
                console.error('Error fetching photos:', error);
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>

<style scoped>
.photo-data {
    width: 100%;
    margin: 0 auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

th {
    background-color: #f2f2f2;
}

img {
    max-width: 100px;
    height: auto;
}
</style>