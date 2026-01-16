<script setup lang="ts">
import type { Product } from '@/schemas/product.schema';
import { removeFromCart } from '@/services/cart.storage';
import 'primeicons/primeicons.css'
import { ref } from 'vue';

// Props
const props = defineProps<{
    products: Product[]
}>()
const current_counts = ref<{ id: number, count: number }[]>([])
const existences = ref<Set<number>>(new Set<number>)


// emits
const emit = defineEmits(['add', 'sub', 'detail'])

// Functions
const handleAdd = (id: number) => {
    existences.value.add(id)
    var flag = false
    current_counts.value.forEach(element => {
        if (element.id === id) {
            element.count += 1
            flag = true
        }
    });

    if (!flag) {
        current_counts.value.push(
            { id: id, count: 1 }
        )
    }
    emit('add', id)
}

const handleSub = (id: number) => {
    current_counts.value.forEach(element => {
        if (element.id === id) {
            if (element.count > 0) {
                element.count -= 1
                if (element.count == 0) {
                    console.log("should delete")
                    existences.value.delete(id)
                }
                emit('sub', id)
            }

        }
    });

}

const handleDetail = (id: number) => {
    emit('detail', id)
}

const getCount = (id: number): number => {
    var count = 0
    current_counts.value.forEach((item) => {
        if (item.id == id) {
            count = item.count
        }
    })
    return count
}

</script>

<template>
    <div class="flex justify-center items-center">
        <div class="
        grid gap-[2rem] w-full w-full overflow-x-auto 
        grid-cols-1
        w-full

        sm:grid-cols-2
        lg:grid-cols-3

        pb-[2rem]

    ">
            <div v-for="p in products" :key="p.id" @click="handleDetail(p.id)" class="relative flex flex-col justify-center i
            tems-center bg-[var(--color-gray)] 
            min-w-[18rem] max-w-[18rem] 
            sm:min-w-[16rem] sm:max-w-[16rem]
            min-h-[18rem] max-h-[18rem] 
            p-[2rem] rounded-lg shadow-lg gap-[2rem]
            border
            border-[var(--color-dark-gray)]
            ">
                <!-- Add and count -->

                <div @click.stop class="
                absolute bg-[var(--color-highlight)] 
                h-[2rem] p-[0.5rem] 
                rounded-4xl flex items-center 
                justify-center top-[1rem] right-[1rem]
                text-white
            ">
                    <div v-show="existences.has(p.id)"
                        class="flex items-center justify-center gap-[0.5rem] pr-[0.5rem]">

                        <i class="pi pi-minus cursor-pointer " @click.stop="handleSub(p.id)"></i>
                        <p>
                            {{ getCount(p.id) }}
                        </p>
                    </div>
                    <i class="pi pi-plus cursor-pointer " @click.stop="handleAdd(p.id)"></i>

                </div>

                <!-- Mid color (absolute)-->
                <div
                    class="a
                    absolute bg-[var(--color-primary)] 
                    h-[6rem] w-[18rem] left-0 
                    sm:w-[16rem]
                    bottom-0 rounded-b-lg z-[1] cursor-pointer">
                </div>

                <!-- Image -->
                <div class="
                h-[12rem] w-full
                flex items-center justify-center">
                    <img :src="p.image" class="max-h-36 max-w-fill object-contain" />
                </div>

                <!-- Short Description + Price -->
                <div class="flex flex-col bg-[var(--color-primary)] z-[1] cursor-pointer">
                    <p class="w-10 min-w-[200px] min-h-[1.25rem] truncate text-white font-medium pb-[0.2rem]">{{ p.title
                        }}</p>
                    <p class="text-white font-bold">${{ p.price }}</p>
                </div>
            </div>
        </div>
    </div>
</template>