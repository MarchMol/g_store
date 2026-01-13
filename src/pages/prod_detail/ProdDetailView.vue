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

onMounted(async ()=> {
    try {
        prod.value = await getSingle(Number(route.params.id))
    } catch (err){
        console.log(err)
    }
})

const handleReturn = () => {
    router.push('/')
}
</script>

<template>
    <NavBar/>
    <i class="pi pi-angle-left" @click="handleReturn"></i>
    <div class="prod-container">
        <div class="prod">
        <img :src="prod?.image"/>
            <div class="info">
                <h1>{{ prod?.title }}</h1>
                <p>
                    {{ prod?.rating.rate }}
                </p>
                <p>{{ prod?.description }}</p>
                <p>{{ prod?.category }}</p>
                <h2>${{ prod?.price }}</h2>
            </div>
        </div>
        
        <div class="actions">
            <button>Agregar a carrito</button>

            <button>Cantidad</button>
        </div>

    </div>
</template>

<style scoped>
.prod-container {
    display: flex;   
    flex-direction: column;
}

.prod {
    display: flex;
}

.pi {
    height: 3rem;
    width: 3rem;
}

</style>
