<script setup lang="ts">
import 'primeicons/primeicons.css'
import NavBar from '@/components/NavBar.vue';
import type { CartItem } from '@/schemas/product.schema';
import { computed, onMounted, ref, watch } from 'vue';
import AmountCustom from '@/components/AmountCustom.vue';
import { useRouter } from 'vue-router';
import { decreaseCartItem, getCartItems, getCartSize, increaseCartItem, removeFromCart } from '@/services/cart.storage';


const cart = ref<CartItem[]>([])
const price = computed(() =>
  cart.value.reduce((acc, item) => acc + item.price*item.count, 0)
)
const router = useRouter()
const cart_amount = ref(0)

onMounted(() => {
  cart.value = getCartItems()
  cart_amount.value = getCartSize()
})

const handleExit = () => {
  alert("Thank you for buying with us!")
  router.push('/')

}

const getCount = (id: number) => {
  const match = cart.value.filter(o => o.id === id)
  const item = match[0]
  return item ? item.count : 0
}

const handleAdd = (id: number) => {
  increaseCartItem(id)
  cart.value = getCartItems()
  cart_amount.value = getCartSize()
}

const handleSub = (id: number) => {
  decreaseCartItem(id)
  cart.value = getCartItems()
  cart_amount.value = getCartSize()
}

const handleDelete = (id: number) => {
  removeFromCart(id)
  cart.value = getCartItems()
  cart_amount.value = getCartSize()
}

const handleSelectItem =(id:number) => {
  router.push({
    name: 'product-detail',
    params: {id: id}
  })
}

const handleReturn = () => {
  router.push('/')
}

</script>

<template>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <NavBar :cart-amount="cart_amount" />
  <div class="p-[2rem]
  lg:flex
  lg:flex-col
  lg:pl-[calc((100vw-950px)/2)]
  
  ">
          <div class="pl-[2rem] pt-[1rem] text-[1.5rem] text-[var(--color-dark-gray)] cursor-pointer">
            <i class="pi pi-angle-left" @click="handleReturn"></i>
        </div>
    <div class="
    justify-around border-b-[2px] border-[var(--color-grayer)] py-[1rem]
    grid grid-cols-[2fr_1fr_1fr] max-w-[950px]
    ">
      <p class="text-center">Product</p>
      <p class="text-center">Price</p>
      <p class="text-center">Quantity</p>
    </div>
    <div class="justify-around p-[1rem] items-center
    grid grid-cols-[3fr_1fr_1fr] max-w-[900px] min-h-[10rem]
    " v-for="value in cart">
      <!-- Product -->
      
      <div class="flex gap-[1rem]">
         <!-- image -->
        <div class="
        max-w-[4rem]
        max-h-[4rem]
        ">
        <img class="
            object-fit
        " :src="value.image"
        @click="handleSelectItem(value.id)"
        >
        </div>
        <!-- Title -->
        <p class=" max-h-[8rem] max-w-[5.2rem] 
        line-clamp-4
        text-sm
        sm:max-w-full
        ">{{ value.title }}</p>
      </div>
      <!-- Price -->
      <p class="pr-[1rem]">${{ value.price }}</p>

      <!-- quantity -->
      <div class="
      flex flex-col sm:flex-row gap-[1rem]
      items-center justify-center">
        <AmountCustom :count="getCount(value.id)" @add="handleAdd(value.id)" @sub="handleSub(value.id)" />
        <i class="pi pi-trash" @click="handleDelete(value.id)"></i>
      </div>
    </div>
  </div>
  <div v-if="cart.length==0"
  class="flex justify-center p-[2rem] text-[var(--color-dark-gray)]">
    Look for something great to buy :)
  </div>

  <div v-if="cart.length>0" class="flex flex-col justify-center items-center w-full pb-[2rem]">
    <p class=" pb-[2rem]">Total: ${{ price }}</p>
    <div @click="handleExit" class="
      bg-[var(--color-primary)] text-white py-[1rem] px-[2rem]
      h-[3.5rem] w-[12rem]
      rounded-md shadow-lg font-medium cursor-pointer
      flex items-center justify-around gap-[0.5rem]
      ">
      <i class="pi pi-shopping-bag"></i>
      <p>Finish Sopping</p>
    </div>

  </div>


</template>
