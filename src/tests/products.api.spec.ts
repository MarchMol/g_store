import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getProducts, getCategories, getSingle } from '@/services/products.api'
import { ZodError } from 'zod'

// Mock fetch
globalThis.fetch = vi.fn()

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  description: 'A test product',
  category: 'electronics',
  image: 'https://example.com/image.jpg',
  rating: { rate: 4.5, count: 100 }
}

const mockProducts = [
  mockProduct,
  {
    id: 2,
    title: 'Another Product',
    price: 49.99,
    description: 'Another product',
    category: 'clothing',
    image: 'https://example.com/image2.jpg',
    rating: { rate: 3.8, count: 50 }
  }
]

describe('products.api', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getProducts', () => {
    it('returns array of products on valid response', async () => {
      vi.mocked(fetch).mockResolvedValue({
        json: vi.fn().mockResolvedValue(mockProducts)
      } as any)

      const result = await getProducts()

      expect(result).toEqual(mockProducts)
      expect(result).toHaveLength(2)
    })

    it('throws ZodError on invalid product data', async () => {
      const invalidProduct = { id: 'invalid' } // Missing required fields

      vi.mocked(fetch).mockResolvedValue({
        json: vi.fn().mockResolvedValue([invalidProduct])
      } as any)

      await expect(getProducts()).rejects.toThrow(ZodError)
    })

    it('throws error on network failure', async () => {
      vi.mocked(fetch).mockRejectedValue(new Error('Network error'))

      await expect(getProducts()).rejects.toThrow('Network error')
    })

    it('throws error on invalid JSON response', async () => {
      vi.mocked(fetch).mockResolvedValue({
        json: vi.fn().mockRejectedValue(new SyntaxError('Invalid JSON'))
      } as any)

      await expect(getProducts()).rejects.toThrow()
    })

    it('calls correct API endpoint', async () => {
      vi.mocked(fetch).mockResolvedValue({
        json: vi.fn().mockResolvedValue(mockProducts)
      } as any)

      await getProducts()

      expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products')
    })

    it('handles empty product array', async () => {
      vi.mocked(fetch).mockResolvedValue({
        json: vi.fn().mockResolvedValue([])
      } as any)

      const result = await getProducts()

      expect(result).toEqual([])
      expect(result).toHaveLength(0)
    })
  })

  describe('getCategories', () => {
    it('returns unique categories', async () => {
      vi.mocked(fetch).mockResolvedValue({
        json: vi.fn().mockResolvedValue(mockProducts)
      } as any)

      const result = await getCategories()

      expect(result).toContain('electronics')
      expect(result).toContain('clothing')
      expect(result).toHaveLength(2)
    })

    it('deduplicates categories correctly', async () => {
      const productsWithDuplicateCategories = [
        { ...mockProduct, id: 1, category: 'electronics' },
        { ...mockProduct, id: 2, category: 'electronics' },
        { ...mockProduct, id: 3, category: 'clothing' },
        { ...mockProduct, id: 4, category: 'clothing' }
      ]

      vi.mocked(fetch).mockResolvedValue({
        json: vi.fn().mockResolvedValue(productsWithDuplicateCategories)
      } as any)

      const result = await getCategories()

      expect(result).toHaveLength(2)
      expect(result).toEqual(['electronics', 'clothing'])
    })

    it('handles empty products array', async () => {
      vi.mocked(fetch).mockResolvedValue({
        json: vi.fn().mockResolvedValue([])
      } as any)

      const result = await getCategories()

      expect(result).toEqual([])
    })

    it('throws error on network failure', async () => {
      vi.mocked(fetch).mockRejectedValue(new Error('Network error'))

      await expect(getCategories()).rejects.toThrow()
    })

    it('throws ZodError on invalid data', async () => {
      vi.mocked(fetch).mockResolvedValue({
        json: vi.fn().mockResolvedValue([{ id: 'invalid' }])
      } as any)

      await expect(getCategories()).rejects.toThrow(ZodError)
    })
  })

  describe('getSingle', () => {
    it('returns single product by id', async () => {
      vi.mocked(fetch).mockResolvedValue({
        json: vi.fn().mockResolvedValue(mockProduct)
      } as any)

      const result = await getSingle(1)

      expect(result).toEqual(mockProduct)
      expect(result.id).toBe(1)
    })

    it('calls correct API endpoint with id', async () => {
      vi.mocked(fetch).mockResolvedValue({
        json: vi.fn().mockResolvedValue(mockProduct)
      } as any)

      await getSingle(42)

      expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products/42')
    })

    it('throws ZodError on invalid product data', async () => {
      vi.mocked(fetch).mockResolvedValue({
        json: vi.fn().mockResolvedValue({ id: 'invalid' })
      } as any)

      await expect(getSingle(1)).rejects.toThrow(ZodError)
    })

    it('throws error on 404 response', async () => {
      vi.mocked(fetch).mockResolvedValue({
        status: 404,
        json: vi.fn().mockResolvedValue({})
      } as any)

      vi.mocked(fetch).mockRejectedValue(new Error('Not found'))

      await expect(getSingle(999)).rejects.toThrow()
    })

    it('throws error on network failure', async () => {
      vi.mocked(fetch).mockRejectedValue(new Error('Network error'))

      await expect(getSingle(1)).rejects.toThrow()
    })

    it('handles different product ids', async () => {
      const product2 = { ...mockProduct, id: 2 }

      vi.mocked(fetch).mockResolvedValue({
        json: vi.fn().mockResolvedValue(product2)
      } as any)

      const result = await getSingle(2)

      expect(result.id).toBe(2)
      expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products/2')
    })
  })
})