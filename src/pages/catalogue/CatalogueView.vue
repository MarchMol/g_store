<script setup lang="ts">
    import ComboBox from '@/components/ComboBox.vue';
import NavBar from '@/components/NavBar.vue';
import Search from '@/components/Search.vue';

const filter_options = [
    "clothes",
    "appliances",
    "pets",
    "technology",
    "whatever else"
]
</script>

<template>
    <div>
        <NavBar/>
        <div>
            <Search/>
            <ComboBox title="Filter" icon="pi-filter" :options="filter_options"/>
        </div>
       
        <router-view/>
    </div>
</template>

<style scoped>
</style>
