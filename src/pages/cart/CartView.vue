<script setup lang="ts">
  import 'primeicons/primeicons.css'
import NavBar from '@/components/NavBar.vue';
import type { CartItem } from '@/schemas/product.schema';
import { onMounted, ref } from 'vue';
const cart = ref<CartItem[]>([])
const price = ref(0)

onMounted(() =>{
    const savedCart = localStorage.getItem("gstore:cart")
    if (savedCart) {
        try{
            cart.value = JSON.parse(savedCart)
        } catch(err) {
            cart.value = []
        }
    }
    price.value = cart.value.reduce((acc,item) => 
      acc + item.price, 0
    ) 
})
</script>

<template>
  <NavBar/>
    <div class="table-titles">
      <p>Producto</p>
      <p>Precio</p>
      <p>Cantidad</p>
    </div>
    <div class="entry" v-for="value in cart">
      <img class="entry-image" :src="value.image">
      <p>{{ value.title }}</p>
      <p>${{ value.price }}</p>
      <i class="pi pi-plus"></i>
      <p>{{ value.count }}</p>
      <i class="pi pi-minus"></i>
      <i class="pi pi-trash"></i>
    </div>
    <h2>Total: ${{price }}</h2>
    <button>Proceder a la Compra</button>
</template>

<style scoped>

.table-titles {
  display: flex;
  justify-content: space-around;
  border-bottom: solid 1px var(--color-dark-gray);
}

.entry {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
}

.entry-image {
  max-height: 4rem;
}
</style>
