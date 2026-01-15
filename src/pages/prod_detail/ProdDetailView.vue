<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Product } from '@/schemas/product.schema';
import { getSingle } from '@/services/products.api';
import 'primeicons/primeicons.css'

const route = useRoute()
const router = useRouter()
const prod = ref<Product>()
const rate = ref(0)
onMounted(async () => {
    try {
        prod.value = await getSingle(Number(route.params.id))
        rate.value = prod.value.rating.rate
    } catch (err) {
        console.log(err)
    }
})

const handleReturn = () => {
    router.push('/')
}
</script>

<template>
    <NavBar />
    <div class="flex flex-col">
        <div class="pl-[2rem] pt-[1rem] text-[1.5rem]">
            <i class="pi pi-angle-left" @click="handleReturn"></i>
        </div>
        <div class="flex flex-col items-center gap-[1rem]">
            <div class="
                flex justify-center items-center p-[2rem]
            ">
                <!-- image container -->
                <div class="h-[20rem] w-[20rem]">
                    <img :src="prod?.image" 
                    class="max-h-[20rem] min-h-[20rem] max-w-[20rem] min-w-[20rem] object-contain"
                    />
                </div>

                <div class="flex flex-col gap-[1rem] pt-[2rem]">
                    <h1 class="text-xl font-medium">{{ prod?.title }}</h1>
                    <!-- Rating -->
                    <div class="flex">
                        <div v-for="n in 5" class="pr-[0.5rem]" >
                            <i v-if="n<rate" class="pi pi-star-fill" style="color: var(--color-highlight);"></i>
                            <i v-else class="pi pi-star" style="color: var(--color-highlight);"></i>
                        </div>
                        <p>
                            {{ prod?.rating.rate }}
                        </p>
                    </div>

                    <p class="text-justify">{{ prod?.description }}</p>
                    <!-- Price and Quantity -->
                    <div class="
                    flex justify-around pt-[1rem]
                    items-center
                    ">
                        <p>${{ prod?.price }}</p>
                        <div class="flex gap-[0.5rem] border rounded-md p-[0.4rem] border-[var(--color-dark-gray)]">
                            <div class="flex items-center text-[0.8rem]">
                                <i class="pi pi-minus"></i>
                            </div>
                            <p>3</p>
                            <div class="flex items-center text-[0.8rem]">
                                <i class="pi pi-plus"></i>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            <button class="
                bg-[var(--color-primary)] text-white py-[1rem] px-[2rem]
                rounded-md shadow-lg font-medium cursor-pointer
            ">
            Agregar a carrito
            </button>
        </div>
    </div>

</template>
