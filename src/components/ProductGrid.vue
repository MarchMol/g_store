<script setup lang="ts">
import type {Product} from '@/schemas/product.schema';
import 'primeicons/primeicons.css'
import { ref } from 'vue';

// Props
const props = defineProps<{
  products: Product[]
}>()
const current_counts = ref<{id: number, count: number}[]>([])
const existences = ref<Set<number>>(new Set<number>)


// emits
const emit = defineEmits(['add', 'sub', 'detail'])

// Functions
const handleAdd=(id: number) => {
    existences.value.add(id)
    var flag = false
    current_counts.value.forEach(element => {
        if (element.id === id){
            element.count+=1
            flag= true
        }
    });

    if (!flag){
        current_counts.value.push(
            {id: id, count: 1}
        )
    }
    emit('add', id)
}

const handleSub=(id: number) => {
    current_counts.value.forEach(element => {
        if (element.id === id){
            if (element.count > 0){
                element.count-=1
                if (element.count == 0){
                    existences.value.delete(id)
                }
                emit('sub', id)
            }

        }
    });
   
}

const handleDetail = (id:number) => {
    emit('detail', id)
}

const getCount = (id: number):number =>{
    var count = 0
    current_counts.value.forEach((item)=>{
        if (item.id == id){
            count = item.count
        }
    })
    return count
}

</script>

<template>
    <div class="flex gap-4 w-full h-80 overflow-x-auto px-[3rem]">
        <div v-for="p in products" :key="p.id" @click="handleDetail(p.id)"
            class="relative flex flex-col justify-center items-center bg-[var(--color-gray)] min-w-60 max-w-60 min-h-70 max-h-70 p-8 rounded-lg shadow-lg gap-[2rem]"
        >
            <!-- Add and count -->

            <div 
            @click.stop
            class="
            absolute bg-[var(--color-highlight)] h-6 p-2 rounded-4xl flex items-center 
            justify-center top-4 right-4
            text-white
            ">
                <div  v-show="existences.has(p.id)"
                    class="flex items-center justify-center gap-[0.5rem] pr-[0.5rem]"
                >
                    
                    <i class="pi pi-minus cursor-pointer " @click.stop="handleSub(p.id)"></i>
                    <p>
                    {{ getCount(p.id) }}
                    </p>
                </div>
                <i class="pi pi-plus cursor-pointer " @click.stop="handleAdd(p.id)"></i>
                
            </div>
            <div class="absolute bg-[var(--color-primary)] h-25 w-60 left-0 bottom-0 rounded-b-lg z-[1] cursor-pointer"></div>
            <div class="h-36 w-36 flex items-center justify-center">
                <img :src="p.image" class="max-h-36 max-w-fill object-contain"/>
            </div>
            
            <div class="flex flex-col bg-[var(--color-primary)] z-[1] cursor-pointer">
                <p class="w-10 min-w-[200px] min-h-[1.25rem] truncate text-white font-medium pb-[0.2rem]">{{ p.title }}</p>
                <p class="text-white font-bold">${{ p.price }}</p>
            </div>
        </div>
    </div>
</template>