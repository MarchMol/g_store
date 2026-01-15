<script setup lang="ts">
import 'primeicons/primeicons.css'


const props = defineProps<{
    modelValue: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
    <div class="
        p-[5px] border border-[var(--color-dark-gray)]
        rounded-xl w-fit bg-[var(--color-gray)] shadow-lg
        flex items-center
    ">
        <input class="pl-[0.8rem]" :value="props.modelValue" type="text"
            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" placeholder="Something nice..."/>
        <i class="pi pi-search"></i>
    </div>
    <!-- <p>You typed: {{ text }}</p> -->
</template>
