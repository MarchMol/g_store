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
    <div class="navbar">
        <img src="@/assets/icons/logo.svg" alt="Banner" id="logo"/>
        <div class="nb-options">
            <div @click="handleOpenCatalogue">
                Catalogue 
            </div>
            <div @click="handleOpenAbout">
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
