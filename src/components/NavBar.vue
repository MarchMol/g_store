<script setup lang="ts">
    import 'primeicons/primeicons.css'
import { useRouter } from 'vue-router';

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
        <img src="@/assets/icons/logo.svg" alt="Banner" class="h-20 py-2"/>
        <div class="nb-options">
            <div @click="handleOpenCatalogue" class="p-1 border-b-4 border-white hover:border-[var(--color-primary)]">
                Catalogue 
            </div>
            <div @click="handleOpenAbout" class="p-1 border-b-4 border-white hover:border-[var(--color-primary)]">
                About Us 
            </div>
        </div>
        <i class="pi pi-shopping-cart" style="color: black" @click="handleOpenCart">
        </i>
    </div>
</template>

<style scoped>
#logo {
    height: 90px;
}

.navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 5rem;
    padding-left: 2rem;
    box-shadow: 0px 5px 15px -4px rgba(0,0,0,0.53);
}

.nb-options {
    display: flex;
    justify-content: space-around;
    width: 50vw;
}
</style>
