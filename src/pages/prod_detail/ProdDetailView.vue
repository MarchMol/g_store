<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Product } from '@/schemas/product.schema';
import { getSingle } from '@/services/products.api';
import 'primeicons/primeicons.css'
import { decreaseCartItem, getCartSize, getItemCount, increaseCartItem, rewriteCartItem } from '@/services/cart.storage';
import AmountCustom from '@/components/AmountCustom.vue';

const route = useRoute()
const router = useRouter()
const prod = ref<Product>()
const prod_amount = ref(0)
const rate = ref(0)
const cart_amount = ref(0)
const add_to_cart = ref(false)

const handleAddToCart = () =>{
    if(prod_amount.value > 0){
            if (!add_to_cart.value) {
            add_to_cart.value= true
    const id = prod.value ? prod.value.id : 0
    rewriteCartItem(id, prod_amount.value)
    } else {
        router.push('/')
    }
    }
}

onMounted(async () => {
    cart_amount.value = getCartSize()
    try {
        prod.value = await getSingle(Number(route.params.id))
        prod_amount.value = getItemCount(prod.value.id)
        if(prod_amount.value == 0){
            prod_amount.value = 1
        }
        rate.value = prod.value.rating.rate
    } catch (err) {
        console.log(err)
    }
})

const handleAdd = () => {
    prod_amount.value += 1
    // const pos_id = prod.value ? prod.value.id : 0
    // increaseCartItem(pos_id)
    // cart_amount.value = getCartSize()
}

const handleSub = () => {
    if (prod_amount.value > 0) {
        prod_amount.value -= 1
        // const pos_id = prod.value ? prod.value.id : 0
        // decreaseCartItem(pos_id)
        // cart_amount.value = getCartSize()
    }
}

const handleReturn = () => {
    router.push('/')
}

</script>

<template>
    <NavBar :cart-amount="cart_amount" />
    <div class="flex flex-col pb-[2rem]">
          <div class="pl-[2rem] pt-[2rem] text-[1.5rem] text-[var(--color-dark-gray)] cursor-pointer">
            <i class="pi pi-angle-left" @click="handleReturn"></i>
        </div>
        <div class="
        flex 
        flex-col 
        items-center gap-[1rem]
        
        ">
            <div class="
                flex justify-center items-center p-[2rem]
                flex-col
                sm:flex-row
                
            ">
                <!-- image container -->
                <div class="h-[20rem] 
                w-[20rem]
                lg:w-[40rem]
                ">
                    <img :src="prod?.image"
                        class="max-h-[20rem] min-h-[20rem] max-w-[20rem] min-w-[20rem] object-contain" />
                </div>

                <!-- Body and info -->
                <div class="flex flex-col gap-[1rem] pt-[2rem] 
                items-center
                sm:items-start
                ">
                    <h1 class="text-xl font-medium">{{ prod?.title }}</h1>
                    <!-- Rating -->
                    <div class="flex">
                        <div v-for="n in 5" class="pr-[0.5rem]">
                            <i v-if="n < rate" class="pi pi-star-fill" style="color: var(--color-highlight);"></i>
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
                    items-center gap-[4rem]
                    ">
                        <p class="text-xl">${{ prod?.price }}</p>
                        <AmountCustom :count="prod_amount" @add="handleAdd" @sub="handleSub" />
                    </div>

                </div>
            </div>

            <!-- Add to Cart -->
            <div class="
                 text-white py-[1rem] px-[2rem]
                h-[3.5rem] w-[12rem]
                rounded-md shadow-lg font-medium cursor-pointer
                relative 
                "
                :class="(prod_amount >0) ? ['bg-[var(--color-primary)]']: ['bg-[var(--color-darker-gray)]']"
                @click="handleAddToCart"
            >
                <Transition name="slide"
                   enter-active-class="transition duration-200 ease-out"
                    enter-from-class="translate-y-full opacity-0"
                    enter-to-class="translate-y-0 opacity-100"
                    leave-active-class="transition duration-200 ease-in"
                    leave-from-class="translate-y-0 opacity-100"
                    leave-to-class="-translate-y-full opacity-0"
                >
                    <div v-if="!add_to_cart" class="
                flex justify-center items-center gap-[1rem]
                absolute
                "   key="a">
                    
                    <i class="pi pi-cart-arrow-down"></i>
                    <p> Add to Cart</p>
                </div>
                <div v-else class="
                flex justify-center items-center
                absolute gap-[1rem] left-[1.1rem]
               
                " key="b">
                <div></div>
                    <i class="pi pi-check-circle text-xl"></i>
                    <p>Back to Store</p>
                </div>
                </Transition>
            </div>
        </div>
    </div>

</template>
