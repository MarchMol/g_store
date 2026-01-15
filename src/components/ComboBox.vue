<script setup lang="ts">
import 'primeicons/primeicons.css'
import { ref } from 'vue';

// Props
const props = defineProps<{
    title: string
    icon: string
    options: string[]
}>()

// emits
const emit = defineEmits(['onSelect'])

// Constants
const is_clicked = ref(false);

// Handles
const handleClick = () => {
    is_clicked.value = !is_clicked.value
}

const handleClose = () => {
    is_clicked.value = false
}
const handleSelect = (value: string) => {
    is_clicked.value = false
    emit('onSelect', value)
}
</script>

<template>
    <div class="relative">
        <div @click="handleClick" class="
            relative flex items-center p-2 border border-[var(--color-dark-gray)] rounded-xl 
            bg-[var(--color-gray)] shadow-lg 
            hover:bg-[var(--color-primary)] transition-all duration-200
            hover:text-white hover:border-white
        ">
            <div>{{ props.title }}</div>
            <i v-show=props.icon class="pi" :class="props.icon"></i>
        </div>

        <!-- Options Container -->
        <div v-show="is_clicked" 
        
        class="
            absolute bg-[var(--color-gray)] p-[1rem] z-[100] shadow-xl
            right-0 top flex flex-col gap-[0.5rem]
        ">
        <div v-click-outside="handleClose">
            <!-- Options -->
            <div v-for="value in options" :key="value" @click="handleSelect(value)"
                class="border-b border-[var(--color-dark-gray)] cursor-pointer whitespace-nowrap">
                {{ value }}
            </div>
        </div>
            

        </div>

    </div>
</template>

<style scoped></style>
