<script setup lang="ts">
  import 'primeicons/primeicons.css'
import NavBar from '@/components/NavBar.vue';
import type { CartItem } from '@/schemas/product.schema';
import { onMounted, ref } from 'vue';
import AmountCustom from '@/components/AmountCustom.vue';
import Button from '@/components/Button.vue';
import { useRouter } from 'vue-router';
import { getCartItems, getCartSize } from '@/services/cart.storage';
const cart = ref<CartItem[]>([])
const og_cart = ref<CartItem[]>([])
const price = ref(0)
const router = useRouter()
const cart_amount = ref(0)

onMounted(() =>{
    cart.value = getCartItems()
    cart_amount.value = cart.value.length
    price.value = cart.value.reduce((acc,item) => 
      acc + item.price, 0
    ) 
})

const handleExit = () => {
  const str_cart_mod = JSON.stringify(cart.value)
  const str_cart_og = JSON.stringify(og_cart.value)
  if (str_cart_mod !== str_cart_og) {
    const confirmed = confirm("Do you want to save changes?")
    if (confirmed) {
      localStorage.setItem(
        "gstore:cart",
        str_cart_mod
      )
    } else {
      router.push('/')
    }
  } else {
    router.push('/')
  }
  
}
</script>

<template>
  <NavBar :cart-amount="cart_amount"/>
    <div class="flex justify-around border-b border-[var(--color-gray)] py-[1rem]">
      <p>Product</p>
      <p>Price</p>
      <p>Quantity</p>
    </div>
    <div class="flex justify-around p-[1rem] items-center" v-for="value in cart">
      <!-- Product -->
      <div class="flex max-w-[200px] gap-[1rem]">
        <img class="max-w-[4rem]" :src="value.image">
        <p>{{ value.title }}</p>
      </div>
      <!-- Price -->
      <p>${{ value.price }}</p>
      <!-- <i class="pi pi-plus"></i>
      <p>{{ value.count }}</p>
      <i class="pi pi-minus"></i>
      <i class="pi pi-trash"></i> -->
      <AmountCustom v-model="value.count"/>
    </div>
    <div class="flex flex-col justify-center items-center w-full">
        <p class="w">Total: ${{price }}</p>
        <Button title="Finish Shopping" @click="handleExit"/>
    </div>

</template>
