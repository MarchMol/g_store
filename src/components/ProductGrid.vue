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
    <div class="grid-container">
        <div v-for="p in products" :key="p.id" class="product" @click="handleDetail(p.id)">
            <img class="prod-image" :src="p.image"/>
            <p>{{ p.title }}</p>
            <p>${{ p.price }}</p>
            <div class="add" @click="handleAdd(p.id)">
                <i class="pi pi-plus"></i>
            </div>
        </div>
    </div>
</template>

<style scoped>
.grid-container {
    display: flex;
    gap: 1rem;
    width: 100vw;
    overflow-x: auto;
}

.product {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--color-gray);
    min-height: 15rem;
    min-width: 12rem;
    max-height: 15rem;
    max-width: 12rem;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0px 4px 10px -4px rgba(0,0,0,0.53);
}

.prod-image {
    max-height: 9rem;
    max-width: 9rem;
    object-fit: contain;
}

.add {
    position: absolute;
    background-color:  var(--color-dark-gray);
    width: 1.2rem;
    height: 1.2rem;
    padding: 0.5rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
