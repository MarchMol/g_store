<script setup lang="ts">
    const props = defineProps<{
  title: string
  icon: string
  options: string[]
}>()
    import 'primeicons/primeicons.css'
import { ref } from 'vue';
    const is_clicked = ref(false);

const handleClick = () =>{
    is_clicked.value = !is_clicked.value
}
</script>

<template>
    <div class="cb-container" @click="handleClick">
        <div class="cb-title">{{ props.title }}</div>
        <i v-show=props.icon class="pi" :class="props.icon"></i>
    </div>
    <div v-if="is_clicked" class="option-container">
        <div class="option" v-for="value in options">{{ value }}</div>
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
}
.option{
    border-bottom:  solid 1px black;
}
</style>
