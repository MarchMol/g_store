<script setup lang="ts">
import type {Product} from '@/schemas/product.schema';
import 'primeicons/primeicons.css'

const emit = defineEmits(['add', 'detail'])
// Props
const props = defineProps<{
  products: Product[]
}>()

const handleAdd=(id: number) => {
    emit('add', id)
}

const handleDetail = (id:number) => {
    emit('detail', id)
}
</script>

<template>
    <div class="flex gap-4 w-full h-80 overflow-x-auto px-[3rem]">
        <div v-for="p in products" :key="p.id" @click="handleDetail(p.id)"
            class="relative flex flex-col justify-center bg-[var(--color-gray)] min-w-60 max-w-60 min-h-70 max-h-70 p-8 rounded-lg shadow-lg gap-[2rem]"
        >
            <div @click="handleAdd(p.id)" class="absolute bg-[var(--color-dark-gray)] w-6 h-6 p-2 rounded-4xl flex items-center justify-center top-4 right-4 hover:h-10 hover:w-10 transition-all duration-150 cursor-pointer">
                <i class="pi pi-plus"></i>
            </div>
            <div class="absolute bg-[var(--color-primary)] h-25 w-60 left-0 bottom-0 rounded-b-lg z-[1] "></div>
            <img :src="p.image" class="max-h-36 max-w-fill object-contain"/>
            <div class="flex flex-col bg-[var(--color-primary)] z-[1]">
                <p class="w-10 min-w-[200px] min-h-[1.25rem] truncate text-white font-medium pb-[0.2rem]">{{ p.title }}</p>
                <p class="text-white font-bold">${{ p.price }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
