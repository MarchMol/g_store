import { describe, it, expect, beforeEach, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import CatalogueView from '@/pages/catalogue/CatalogueView.vue'
import * as productsApi from '@/services/products.api'
import * as cartStorage from '@/services/cart.storage'

vi.mock('@/services/products.api')
vi.mock('@/services/cart.storage')

const mockProducts = [
  {
    id: 1,
    title: 'Laptop',
    price: 999.99,
    description: 'High performance laptop',
    category: 'electronics',
    image: 'https://example.com/laptop.jpg',
    rating: { rate: 4.5, count: 100 }
  },
  {
    id: 2,
    title: 'T-Shirt',
    price: 29.99,
    description: 'Cotton t-shirt',
    category: 'clothing',
    image: 'https://example.com/tshirt.jpg',
    rating: { rate: 3.8, count: 50 }
  }
]

describe('CatalogueView.vue', () => {
  let router: any

  beforeEach(() => {
    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', name: 'catalogue', component: { template: '<div></div>' } },
        {
          path: '/product-detail/:id',
          name: 'product-detail',
          component: { template: '<div></div>' }
        },
        { path: '/cart', name: 'cart', component: { template: '<div></div>' } }
      ]
    })

    vi.clearAllMocks()
    localStorage.clear()
  })

  it('renders loading state initially', () => {
    vi.mocked(productsApi.getProducts).mockImplementation(() => new Promise(() => {}))
    vi.mocked(cartStorage.getCartSize).mockReturnValue(0)
    vi.mocked(cartStorage.getCartItems).mockReturnValue([])

    const wrapper = mount(CatalogueView, {
      global: {
        plugins: [router],
        stubs: {
          NavBar: true,
          Search: true,
          ComboBox: true,
          ProductGrid: true,
          Closable: true,
          Loading: true,
          ErrorMsg: true
        }
      }
    })

    expect(wrapper.findComponent({ name: 'loading' }).exists()).toBe(true)
  })


  it('renders loading state initially', () => {
    vi.mocked(productsApi.getProducts).mockImplementation(() => new Promise(() => {}))
    vi.mocked(cartStorage.getCartSize).mockReturnValue(0)
    vi.mocked(cartStorage.getCartItems).mockReturnValue([])

    const wrapper = mount(CatalogueView, {
      global: {
        plugins: [router],
        stubs: {
          NavBar: true,
          Search: true,
          ComboBox: true,
          ProductGrid: true,
          Closable: true,
          Loading: true,
          ErrorMsg: true
        }
      }
    })

    expect(wrapper.findComponent({ name: 'loading' }).exists()).toBe(true)
  })

it('loads products on mount', async () => {
  vi.mocked(productsApi.getProducts).mockResolvedValue(mockProducts)
  vi.mocked(productsApi.getCategories).mockResolvedValue(['electronics', 'clothing'])
  vi.mocked(cartStorage.getCartSize).mockReturnValue(0)
  vi.mocked(cartStorage.getCartItems).mockReturnValue([])

  const wrapper = mount(CatalogueView, {
    global: {
      plugins: [router],
      stubs: {
        NavBar: true,
        Search: true,
        ComboBox: true,
        ProductGrid: true,
        Closable: true,
        Loading: true,
        ErrorMsg: true
      }
    }
  })

  // Wait for all pending promises to resolve
  await flushPromises()

  // Now test the actual rendered output, not component names
  expect(wrapper.findComponent({ name: 'ProductGrid' }).exists()).toBe(true)
  // Or better yet, check if ProductGrid received the right props:
  expect(wrapper.findComponent({ name: 'ProductGrid' }).props('products')).toHaveLength(2)
})
})
