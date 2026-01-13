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
const handleClick = () =>{
    is_clicked.value = !is_clicked.value
}
const handleSelect = (value: string) => {
    is_clicked.value = false
    emit('onSelect', value)
}
</script>

<template>
    <div class="cb-container" @click="handleClick">
        <div class="cb-title">{{ props.title }}</div>
        <i v-show=props.icon class="pi" :class="props.icon"></i>
    </div>
    <div v-if="is_clicked" class="option-container">
        <div class="option" v-for="value in options" :key="value" @click="handleSelect(value)">{{ value }}</div>
    </div>

</template>

<style scoped>
.cb-title {
    padding-right: 0.5rem;
}
.cb-container {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border: solid 1px var(--color-dark-gray);
    background-color: var(--color-gray);
    width: fit-content;
    border-radius: 1rem;
    box-shadow: 0px 4px 10px -4px;
}

.option-container {
    position: absolute;
    background-color: var(--color-gray);
    padding: 0.5rem;
    z-index: 100;
    box-shadow: 0px 4px 10px -4px rgba(0,0,0,0.53);
}
.option{
    padding: 0.2rem;
}
.option:hover{
    background-color: var(--color-dark-gray);
}
</style>
