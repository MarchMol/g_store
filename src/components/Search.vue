<script setup lang="ts">
        import 'primeicons/primeicons.css'
import { ref } from "vue"

const props = defineProps<{
    modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
    <div class="search">
      <input class="t-input" :value="props.modelValue" type="text" 
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"/>
      <i class="pi pi-search"></i>
    </div>
    <!-- <p>You typed: {{ text }}</p> -->
</template>

<style scoped>
.t-input{
    border: none;
    background-color: var(--color-gray);
    color: var(--color-dark-gray);
}

.search {
    padding: 5px;
    border: solid 1px var(--color-dark-gray);
    border-radius: 1rem;
    width: fit-content;
    background-color: var(--color-gray);
    box-shadow: 0px 4px 10px -4px rgba(0,0,0,0.53);
}

</style>
