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
    <div class="flex items-center p-[0.5rem] border rounded-4xl 
        bg-[var(--color-highlight)] text-[var(--color-white)] border-[var(--color-primary)]
        text-xs max-h-[2.5rem]
        ">
        <p class="p-[4px] whitespace-nowrap">{{ title }}</p>
        <div class="h-[1rem] w-[1rem] relative" @click="emit('close')">
            <div class="absolute hover:h-[100rem]">
                <i class="pi pi-times"></i>
            </div>

        </div>

    </div>
</template>