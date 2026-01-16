<script setup lang="ts">
    import 'primeicons/primeicons.css'
import { useRouter } from 'vue-router';
import CartButton from './CartButton.vue';
const props = defineProps<{
    cartAmount: number
}>()

    const router = useRouter()
    const handleOpenCart = () => {
        router.push('/cart')
    }
    const handleOpenCatalogue = () => {
        router.push('/')
    }

    const handleOpenAbout = () => {
        router.push('/about')
    }
</script>

<template>
    <div class="flex items-center justify-between px-10 py-2 shadow-lg">
        <img src="@/assets/icons/logo.svg" alt="Banner" class="h-20 py-2" @click="handleOpenAbout"/>
        <div class="flex justify-around w-[50vw]">
            
            <div @click="handleOpenCatalogue" class="p-1 border-b-4 border-white hover:border-[var(--color-primary)]">
                Catalogue 
            </div>
<div @click="handleOpenAbout" class="hidden md:block p-1 border-b-4 border-white hover:border-[var(--color-primary)]">
    About Us 
</div>
        </div>
        <CartButton :cart-amount="cartAmount"  @click="handleOpenCart"/>


    </div>
</template>