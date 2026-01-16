import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  getCartSize,
  getCartItems,
  increaseCartItem,
  decreaseCartItem,
  removeFromCart,
  rewriteCartItem,
  getItemCount
} from '@/services/cart.storage'
import * as productsApi from '@/services/products.api'

// Mock products API
vi.mock('@/services/products.api', () => ({
  getSingle: vi.fn()
}))

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  description: 'A test product',
  category: 'test',
  image: 'https://example.com/image.jpg',
  rating: { rate: 4.5, count: 100 }
}

describe('cart.storage', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  describe('getCartSize', () => {
    it('returns 0 for empty cart', () => {
      expect(getCartSize()).toBe(0)
    })

    it('returns correct total quantity for single item', () => {
      const cart = [
        { id: 1, title: 'Item 1', price: 10, image: 'http://example.com/img.jpg', count: 3 }
      ]
      localStorage.setItem('gstore:cart', JSON.stringify(cart))
      expect(getCartSize()).toBe(3)
    })

    it('returns correct total quantity for multiple items', () => {
      const cart = [
        { id: 1, title: 'Item 1', price: 10, image: 'http://example.com/img.jpg', count: 2 },
        { id: 2, title: 'Item 2', price: 20, image: 'http://example.com/img.jpg', count: 3 },
        { id: 3, title: 'Item 3', price: 30, image: 'http://example.com/img.jpg', count: 5 }
      ]
      localStorage.setItem('gstore:cart', JSON.stringify(cart))
      expect(getCartSize()).toBe(10)
    })

    it('handles corrupted JSON gracefully', () => {
      localStorage.setItem('gstore:cart', 'invalid json {')
      expect(getCartSize()).toBe(0)
    })

    it('handles empty string in localStorage', () => {
      localStorage.setItem('gstore:cart', '')
      expect(getCartSize()).toBe(0)
    })
  })

  describe('getCartItems', () => {
    it('returns empty array for empty cart', () => {
      expect(getCartItems()).toEqual([])
    })

    it('returns valid cart items', () => {
      const cart = [
        { id: 1, title: 'Item 1', price: 10, image: 'http://example.com/img.jpg', count: 2 },
        { id: 2, title: 'Item 2', price: 20, image: 'http://example.com/img.jpg', count: 1 }
      ]
      localStorage.setItem('gstore:cart', JSON.stringify(cart))
      expect(getCartItems()).toEqual(cart)
    })

    it('returns empty array for corrupted JSON', () => {
      localStorage.setItem('gstore:cart', 'corrupted data')
      expect(getCartItems()).toEqual([])
    })

    it('returns empty array when localStorage key does not exist', () => {
      localStorage.removeItem('gstore:cart')
      expect(getCartItems()).toEqual([])
    })
  })

  describe('increaseCartItem', () => {
    it('increments count for existing item', async () => {
      const cart = [
        { id: 1, title: 'Item 1', price: 10, image: 'http://example.com/img.jpg', count: 2 }
      ]
      localStorage.setItem('gstore:cart', JSON.stringify(cart))

      await increaseCartItem(1)

      const updated = getCartItems()
      expect(updated[0]?.count).toBe(3)
    })

    it('creates new item if not exists', async () => {
      const cart = [
        { id: 1, title: 'Item 1', price: 10, image: 'http://example.com/img.jpg', count: 1 }
      ]
      localStorage.setItem('gstore:cart', JSON.stringify(cart))

      vi.mocked(productsApi.getSingle).mockResolvedValue(mockProduct)

      await increaseCartItem(2)

      const updated = getCartItems()
      expect(updated).toHaveLength(2)
      expect(updated[1]?.id).toBe(1)
      expect(updated[1]?.count).toBe(1)
    })

    it('handles API errors gracefully', async () => {
      const cart = [
        { id: 1, title: 'Item 1', price: 10, image: 'http://example.com/img.jpg', count: 1 }
      ]
      localStorage.setItem('gstore:cart', JSON.stringify(cart))

      vi.mocked(productsApi.getSingle).mockRejectedValue(new Error('API Error'))

      await increaseCartItem(2)

      const updated = getCartItems()
      expect(updated).toHaveLength(1) // No new item added
    })

    it('adds to empty cart', async () => {
      vi.mocked(productsApi.getSingle).mockResolvedValue(mockProduct)

      await increaseCartItem(1)

      const updated = getCartItems()
      expect(updated).toHaveLength(1)
      expect(updated[0]?.id).toBe(1)
      expect(updated[0]?.count).toBe(1)
    })
  })

  describe('decreaseCartItem', () => {
    it('decrements count for existing item', () => {
      const cart = [
        { id: 1, title: 'Item 1', price: 10, image: 'http://example.com/img.jpg', count: 3 }
      ]
      localStorage.setItem('gstore:cart', JSON.stringify(cart))

      decreaseCartItem(1)

      const updated = getCartItems()
      expect(updated[0]?.count).toBe(2)
    })


    it('does not decrement below 0', () => {
      const cart = [
        { id: 1, title: 'Item 1', price: 10, image: 'http://example.com/img.jpg', count: 0 }
      ]
      localStorage.setItem('gstore:cart', JSON.stringify(cart))

      decreaseCartItem(1)

      const updated = getCartItems()
      expect(updated[0]?.count).toBe(0)
    })

    it('ignores non-existent items', () => {
      const cart = [
        { id: 1, title: 'Item 1', price: 10, image: 'http://example.com/img.jpg', count: 1 }
      ]
      localStorage.setItem('gstore:cart', JSON.stringify(cart))

      decreaseCartItem(999)

      const updated = getCartItems()
      expect(updated).toHaveLength(1)
    })
  })

  describe('removeFromCart', () => {
    it('removes item from cart', () => {
      const cart = [
        { id: 1, title: 'Item 1', price: 10, image: 'http://example.com/img.jpg', count: 1 },
        { id: 2, title: 'Item 2', price: 20, image: 'http://example.com/img.jpg', count: 1 }
      ]
      localStorage.setItem('gstore:cart', JSON.stringify(cart))

      removeFromCart(1)

      const updated = getCartItems()
      expect(updated).toHaveLength(1)
      expect(updated[0]?.id).toBe(2)
    })

    it('removes correct item with multiple items', () => {
      const cart = [
        { id: 1, title: 'Item 1', price: 10, image: 'http://example.com/img.jpg', count: 1 },
        { id: 2, title: 'Item 2', price: 20, image: 'http://example.com/img.jpg', count: 1 },
        { id: 3, title: 'Item 3', price: 30, image: 'http://example.com/img.jpg', count: 1 }
      ]
      localStorage.setItem('gstore:cart', JSON.stringify(cart))

      removeFromCart(2)

      const updated = getCartItems()
      expect(updated).toHaveLength(2)
      expect(updated.map(i => i.id)).toEqual([1, 3])
    })

    it('handles removing non-existent item', () => {
      const cart = [
        { id: 1, title: 'Item 1', price: 10, image: 'http://example.com/img.jpg', count: 1 }
      ]
      localStorage.setItem('gstore:cart', JSON.stringify(cart))

      removeFromCart(999)

      const updated = getCartItems()
      expect(updated).toHaveLength(1)
    })

    it('clears cart when removing only item', () => {
      const cart = [
        { id: 1, title: 'Item 1', price: 10, image: 'http://example.com/img.jpg', count: 1 }
      ]
      localStorage.setItem('gstore:cart', JSON.stringify(cart))

      removeFromCart(1)

      const updated = getCartItems()
      expect(updated).toHaveLength(0)
    })
  })

  describe('rewriteCartItem', () => {
    it('updates existing item count', async () => {
      const cart = [
        { id: 1, title: 'Item 1', price: 10, image: 'http://example.com/img.jpg', count: 1 }
      ]
      localStorage.setItem('gstore:cart', JSON.stringify(cart))

      await rewriteCartItem(1, 5)

      const updated = getCartItems()
      expect(updated[0]?.count).toBe(5)
    })

    it('creates new item if not exists', async () => {
      const cart = [
        { id: 1, title: 'Item 1', price: 10, image: 'http://example.com/img.jpg', count: 1 }
      ]
      localStorage.setItem('gstore:cart', JSON.stringify(cart))

      vi.mocked(productsApi.getSingle).mockResolvedValue(mockProduct)

      await rewriteCartItem(2, 3)

      const updated = getCartItems()
      expect(updated).toHaveLength(2)
      expect(updated[1]?.id).toBe(1)
      expect(updated[1]?.count).toBe(3)
    })

    it('handles setting count to 0', async () => {
      const cart = [
        { id: 1, title: 'Item 1', price: 10, image: 'http://example.com/img.jpg', count: 5 }
      ]
      localStorage.setItem('gstore:cart', JSON.stringify(cart))

      await rewriteCartItem(1, 0)

      const updated = getCartItems()
      expect(updated[0]?.count).toBe(0)
    })

    it('handles API errors gracefully', async () => {
      const cart = [
        { id: 1, title: 'Item 1', price: 10, image: 'http://example.com/img.jpg', count: 1 }
      ]
      localStorage.setItem('gstore:cart', JSON.stringify(cart))

      vi.mocked(productsApi.getSingle).mockRejectedValue(new Error('API Error'))

      await rewriteCartItem(2, 5)

      const updated = getCartItems()
      expect(updated).toHaveLength(1)
    })
  })

  describe('getItemCount', () => {
    it('returns correct count for existing item', () => {
      const cart = [
        { id: 1, title: 'Item 1', price: 10, image: 'http://example.com/img.jpg', count: 5 }
      ]
      localStorage.setItem('gstore:cart', JSON.stringify(cart))

      expect(getItemCount(1)).toBe(5)
    })

    it('returns 0 for non-existent item', () => {
      const cart = [
        { id: 1, title: 'Item 1', price: 10, image: 'http://example.com/img.jpg', count: 5 }
      ]
      localStorage.setItem('gstore:cart', JSON.stringify(cart))

      expect(getItemCount(999)).toBe(0)
    })

    it('returns 0 for empty cart', () => {
      expect(getItemCount(1)).toBe(0)
    })

    it('returns correct count with multiple items', () => {
      const cart = [
        { id: 1, title: 'Item 1', price: 10, image: 'http://example.com/img.jpg', count: 2 },
        { id: 2, title: 'Item 2', price: 20, image: 'http://example.com/img.jpg', count: 7 },
        { id: 3, title: 'Item 3', price: 30, image: 'http://example.com/img.jpg', count: 4 }
      ]
      localStorage.setItem('gstore:cart', JSON.stringify(cart))

      expect(getItemCount(2)).toBe(7)
    })
  })
})