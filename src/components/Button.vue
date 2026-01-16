<script setup lang="ts">
const props = defineProps<{
    title: string
}>()
</script>

<template>
    <button class="
                bg-[var(--color-primary)] text-white py-[1rem] px-[2rem]
                rounded-md shadow-lg font-medium cursor-pointer
            ">
        {{ title }}
    </button>
</template>
