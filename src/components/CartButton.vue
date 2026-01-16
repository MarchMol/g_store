<script setup lang="ts">
const props = defineProps<{
    cartAmount: number
}>()

</script>

<template>
    <div class="
        cursor-pointer bg-[var(--color-primary)] w-[2rem] h-[2rem]
        rounded-4xl flex items-center justify-center text-white
        relative
    ">
        <i class="pi pi-shopping-cart">
        </i>
        <div 
        v-if="cartAmount>0"
            class="
            absolute h-[1rem] w-[1rem] bg-[var(--color-blue)] 
            rounded-4xl flex items-center justify-center
            top-[-0.5rem] right-[-0.3rem]
            text-xs
        ">
            {{ cartAmount }}
        </div>
    </div>
</template>