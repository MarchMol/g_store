<script setup lang="ts">
    import 'primeicons/primeicons.css'
// Props
const props = defineProps<{
  title: string
}>()

// emits
const emit = defineEmits(['close'])


</script>

<template>
    <div>
        <p>{{ title }}</p>
        <i class="pi pi-times" @click="emit('close')"></i>
    </div>
</template>

<style scoped>
</style>