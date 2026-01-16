<script setup lang="ts">

</script>

<template>
    <i class="pi pi-spinner-dotted animate-spin"></i>
</template>

<style scoped>
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
}
</style>