import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Catalogue
    {
      path: '/',
      name: 'catalogue',
      component: () => import('@/pages/catalogue/CatalogueView.vue')
    },

    // Product Detail
        {
      path: '/product-detail/:id',
      name: 'product-detail',
      component: () => import('@/pages/prod_detail/ProdDetailView.vue'),
      props: true
    },

    // Shopping Cart
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/pages/catalogue/CatalogueView.vue')
    },
  ]
})

export default router