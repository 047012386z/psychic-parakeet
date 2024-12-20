<template>
    <div>
        <h2>Upload New Image</h2>
        <input type="file" @change="onFileChange" />
        <div v-if="selectedFile">
            <p><strong>File Name:</strong> {{ selectedFile.name }}</p>
            <p><strong>Created At:</strong> {{ creationDate }}</p>
            <p><strong>File Type:</strong> {{ selectedFile.type }}</p>
        </div>
        <button @click="uploadImage">Upload</button>
        <div v-if="uploadError" class="error">{{ uploadError }}</div>
        <div v-if="uploadSuccess" class="success">Image uploaded successfully!</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import exifReader from 'exif-reader';

export default defineComponent({
    data() {
        return {
            selectedFile: null as File | null,
            uploadError: '',
            uploadSuccess: false,
            creationDate: ''
        };
    },
    methods: {
        async onFileChange(event: Event) {
            const file = (event.target as HTMLInputElement).files?.[0] || null;
            this.selectedFile = file;

            if (file) {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                try {
                    const exifData = exifReader(buffer);
                    console.log('EXIF Data:', exifData); // เพิ่มการดีบักเพื่อดูข้อมูล EXIF
                    if (exifData.exif && exifData.exif.DateTimeOriginal) {
                        const originalDate = new Date(exifData.exif.DateTimeOriginal.replace(/:/g, '-').replace(' ', 'T'));
                        this.creationDate = originalDate.toISOString();
                    } else {
                        this.creationDate = 'No EXIF data found';
                    }
                } catch (error) {
                    console.error('Error reading EXIF data:', error);
                    this.creationDate = 'Error reading EXIF data';
                }
            }
        },
        async uploadImage() {
            if (!this.selectedFile) {
                this.uploadError = 'No file selected.';
                return;
            }

            const formData = new FormData();
            formData.append('file', this.selectedFile);

            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Failed to upload image.');
                }

                const result = await response.json();
                console.log('Upload result:', result);
                this.uploadSuccess = true;
                this.uploadError = '';
            } catch (error) {
                this.uploadError = 'Failed to upload image. Please try again later.';
                this.uploadSuccess = false;
            }
        }
    }
});
</script>

<style scoped>
.error {
    color: red;
}
.success {
    color: green;
}
</style>