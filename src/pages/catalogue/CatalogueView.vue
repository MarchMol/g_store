<script setup lang="ts">

import ComboBox from '@/components/ComboBox.vue';
import NavBar from '@/components/NavBar.vue';
import Search from '@/components/Search.vue';
import { ref, onMounted, watch } from 'vue'
import { getCategories, getProducts, getSingle } from '@/services/products.api';
import { newCartItem, type CartItem, type Product } from '@/schemas/product.schema';
import ProductGrid from '@/components/ProductGrid.vue';
import Closable from '@/components/Closable.vue';
import { useRouter } from 'vue-router';

// Constants
const router = useRouter()
const loading = ref(true)
const errors = ref(null)
const search_term = ref<string>('')
const all_products = ref<Product[]>([])
const current_products = ref<Product[]>([])
const filter = ref<string>('')
const categories = ref<string[]>([])
const cart = ref<CartItem[]>([])

const onAdd = async (id: number) => {
    var exists = false
    cart.value.forEach((item: CartItem) =>{
        if (item.id === id){
            item.count += 1
            exists = true
        }
    })

    if (!exists) {
        try{
            const prod = await getSingle(id)
            const cart_item = newCartItem(prod, 1)
            cart.value.push(cart_item)
        } catch (err){
            console.log(err)
        }
    }

    localStorage.setItem(
        'gstore:cart',
        JSON.stringify(
            cart.value
        )  
    )
}

const loadCart = () => {
    const savedCart = localStorage.getItem("gstore:cart")
    if (savedCart) {
        try{
            cart.value = JSON.parse(savedCart)
        } catch(err) {
            cart.value = []
        }
        
    }
}
onMounted(async ()=>{
    loadCart()
    try {
        all_products.value = await getProducts()
        current_products.value = JSON.parse(
        JSON.stringify(all_products.value)
        )
        categories.value = await getCategories()
    } catch (err) {

    } finally {

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
    <div>
        <NavBar/>
        <div class="px-20 py-5 w-fit h-full flex gap-20 justify-between">
            <Search v-model="search_term"/>
            <ComboBox title="Filter" icon="pi pi-filter" :options="categories" @on-select="handleAddFilter"/>
            <span v-show="filter.length > 0">
                <Closable :title="filter" @close="handleRemoveFilter"/>
            </span>
        </div>
        <ProductGrid :products="current_products" @add="onAdd" @detail="handleClickProduct"/>
        <router-view/>
    </div>
</template>

<style scoped>
</style>