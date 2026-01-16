<script setup lang="ts">

import ComboBox from '@/components/ComboBox.vue';
import NavBar from '@/components/NavBar.vue';
import Search from '@/components/Search.vue';
import { ref, onMounted, watch } from 'vue'
import { getCategories, getProducts } from '@/services/products.api';
import {type CartItem, type Product } from '@/schemas/product.schema';
import ProductGrid from '@/components/ProductGrid.vue';
import Closable from '@/components/Closable.vue';
import { useRouter } from 'vue-router';
import { decreaseCartItem, getCartItems, getCartSize, getItemCount, increaseCartItem, removeFromCart } from '@/services/cart.storage';
import Loading from '@/components/Loading.vue';
import ErrorMsg from '@/components/ErrorMsg.vue';

// Constants
const router = useRouter()
const loading = ref(true)
const errors = ref()
const search_term = ref<string>('')
const all_products = ref<Product[]>([])
const current_products = ref<Product[]>([])
const filter = ref<string>('')
const categories = ref<string[]>([])
const cart = ref<CartItem[]>([])
const cart_amount = ref(0)


const handleAddItem = async (id: number) => {
    await increaseCartItem(id)
    cart.value = getCartItems()
    cart_amount.value = getCartSize()
}

const handleRemoveItem = (id: number) => {
    decreaseCartItem(id)
    cart.value = getCartItems()
    cart_amount.value = getCartSize()
    const count = getItemCount(id)
    if (count == 0) {
        removeFromCart(id)
    }
}


onMounted(async ()=>{
    loading.value=true
    cart.value = getCartItems()
    cart_amount.value = getCartSize()
    try {
        all_products.value = await getProducts()
        current_products.value = JSON.parse(
        JSON.stringify(all_products.value)
        )
        categories.value = await getCategories()
    } catch (err) {
        errors.value = err
        loading.value = false
    } finally {
        loading.value = false
    }
})
watch(filter, () => {
    if (filter.value.length > 0) {
        const tem = all_products.value.filter(o => o.category == filter.value)
        current_products.value = tem
    } else {
        current_products.value = JSON.parse(
        JSON.stringify(all_products.value)
        )
    }
})

watch(search_term, () => {
    if (search_term.value.length > 0) {
        const tem = all_products.value.filter(o => o.title.toLowerCase().includes(search_term.value.toLowerCase()))
        current_products.value = tem
    } else{
        if (filter.value.length > 0) {
            const tem = all_products.value.filter(o => o.category == filter.value)
            current_products.value = tem
        } else {
            current_products.value = JSON.parse(
            JSON.stringify(all_products.value)
            )
        }
    }
})

const handleAddFilter = (value: string) => {
    filter.value = value
}

const handleRemoveFilter = () =>{
    filter.value = ''
}

const handleClickProduct = (id: number) => {
    router.push({
        name: 'product-detail',
        params: {id: id}
    })
}
</script>

<template>
    <NavBar :cart-amount="cart_amount"/>
    <div v-if="loading" class="flex justify-center text-4xl text-[var(--color-darker-gray)] pt-[2rem]">
        <Loading />
    </div>
    <div v-else-if="errors" class="flex justify-center text-xl text-[var(--color-darker-gray)] pt-[2rem]">
        <ErrorMsg/>
    </div>
    <div v-else>
        <div  
        class="
        flex

        pt-[2rem]
        pb-[1.5rem]
        justify-center
        items-center
        gap-[1rem]
        ">
            <Search v-model="search_term"/>
            <ComboBox title="Filter" icon="pi pi-filter" :options="categories" @on-select="handleAddFilter"/>
        </div>
        <div v-if="filter.length > 0"
            class="
            flex justify-center pb-[2rem]
            ">
            <Closable :title="filter" @close="handleRemoveFilter"/>
        </div>
        <div class="flex justify-center">
<ProductGrid :products="current_products" @add="handleAddItem" @sub="handleRemoveItem" @detail="handleClickProduct"/>
        </div>
        
        <router-view/>
    </div>
</template>