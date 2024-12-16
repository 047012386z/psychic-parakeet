<template>
   <div> 
    {{ data }}
    {{ day }}
    <button @click="submitData">submit</button>
    </div>
</template>
<script setup lang="ts">
    const data = ref('');
    const day = ref('');  
    onMounted(async () => {
        data.value = new URLSearchParams(window.location.search).get('text') || '';
        day.value = new URLSearchParams(window.location.search).get('date') || '';
    })
    async function submitData() {
        const result = await saveDataToKVStorage({ data: data.value, timestamp:day.value });
        if (result.success) {
          alert('Data submitted!');
        } else {
          alert('Error submitting data');
        }
    }
    async function saveDataToKVStorage(data:{data:string,timestamp:string}) {
  try {
    const response = await fetch('/api/storage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error saving data:', error);
    return { success: false };
  }
}
</script>