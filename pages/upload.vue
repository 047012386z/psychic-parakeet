<template>
    <div>
        <h2>Upload New Image</h2>
        <input type="file" @change="onFileChange" />
        <button @click="uploadImage">Upload</button>
        <div v-if="uploadError" class="error">{{ uploadError }}</div>
        <div v-if="uploadSuccess" class="success">Image uploaded successfully!</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            selectedFile: null as File | null,
            uploadError: '',
            uploadSuccess: false
        };
    },
    methods: {
        onFileChange(event: Event) {
            const file = (event.target as HTMLInputElement).files?.[0] || null;
            this.selectedFile = file;
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