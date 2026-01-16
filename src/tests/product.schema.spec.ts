import { describe, it, expect } from 'vitest'
import {
  ProductSchema,
  CartItemSchema,
  ProductRating,
  ProductsSchema,
  newCartItem,
  type Product
} from '@/schemas/product.schema'
import { ZodError } from 'zod'

describe('product.schema', () => {
  const validProduct = {
    id: 1,
    title: 'Test Product',
    price: 29.99,
    description: 'A test product',
    category: 'electronics',
    image: 'https://example.com/image.jpg',
    rating: { rate: 4.5, count: 100 }
  }

  const validCartItem = {
    id: 1,
    title: 'Test Product',
    price: 29.99,
    image: 'https://example.com/image.jpg',
    count: 5
  }

  describe('ProductRating', () => {
    it('validates correct rating object', () => {
      const rating = { rate: 4.5, count: 100 }
      const result = ProductRating.parse(rating)
      expect(result).toEqual(rating)
    })

    it('rejects missing rate field', () => {
      const rating = { count: 100 }
      expect(() => ProductRating.parse(rating)).toThrow(ZodError)
    })

    it('rejects missing count field', () => {
      const rating = { rate: 4.5 }
      expect(() => ProductRating.parse(rating)).toThrow(ZodError)
    })

    it('rejects non-numeric rate', () => {
      const rating = { rate: 'high', count: 100 }
      expect(() => ProductRating.parse(rating)).toThrow(ZodError)
    })

    it('accepts zero values', () => {
      const rating = { rate: 0, count: 0 }
      const result = ProductRating.parse(rating)
      expect(result).toEqual(rating)
    })
  })

  describe('ProductSchema', () => {
    it('validates correct product', () => {
      const result = ProductSchema.parse(validProduct)
      expect(result).toEqual(validProduct)
    })

    it('rejects missing id', () => {
      const { id, ...product } = validProduct
      expect(() => ProductSchema.parse(product)).toThrow(ZodError)
    })

    it('rejects missing title', () => {
      const { title, ...product } = validProduct
      expect(() => ProductSchema.parse(product)).toThrow(ZodError)
    })

    it('rejects missing price', () => {
      const { price, ...product } = validProduct
      expect(() => ProductSchema.parse(product)).toThrow(ZodError)
    })

    it('rejects missing description', () => {
      const { description, ...product } = validProduct
      expect(() => ProductSchema.parse(product)).toThrow(ZodError)
    })

    it('rejects missing category', () => {
      const { category, ...product } = validProduct
      expect(() => ProductSchema.parse(product)).toThrow(ZodError)
    })

    it('rejects invalid image URL', () => {
      const product = { ...validProduct, image: 'not-a-url' }
      expect(() => ProductSchema.parse(product)).toThrow(ZodError)
    })

    it('rejects missing rating', () => {
      const { rating, ...product } = validProduct
      expect(() => ProductSchema.parse(product)).toThrow(ZodError)
    })

    it('accepts valid URLs', () => {
      const product = {
        ...validProduct,
        image: 'https://example.com/valid-image.jpg'
      }
      const result = ProductSchema.parse(product)
      expect(result.image).toBe(product.image)
    })

    it('rejects non-string title', () => {
      const product = { ...validProduct, title: 123 }
      expect(() => ProductSchema.parse(product)).toThrow(ZodError)
    })

    it('rejects non-number price', () => {
      const product = { ...validProduct, price: '$29.99' }
      expect(() => ProductSchema.parse(product)).toThrow(ZodError)
    })

    it('accepts zero price', () => {
      const product = { ...validProduct, price: 0 }
      const result = ProductSchema.parse(product)
      expect(result.price).toBe(0)
    })

    it('accepts negative price', () => {
      const product = { ...validProduct, price: -10 }
      const result = ProductSchema.parse(product)
      expect(result.price).toBe(-10)
    })
  })

  describe('CartItemSchema', () => {
    it('validates correct cart item', () => {
      const result = CartItemSchema.parse(validCartItem)
      expect(result).toEqual(validCartItem)
    })

    it('rejects missing id', () => {
      const { id, ...item } = validCartItem
      expect(() => CartItemSchema.parse(item)).toThrow(ZodError)
    })

    it('rejects missing title', () => {
      const { title, ...item } = validCartItem
      expect(() => CartItemSchema.parse(item)).toThrow(ZodError)
    })

    it('rejects missing price', () => {
      const { price, ...item } = validCartItem
      expect(() => CartItemSchema.parse(item)).toThrow(ZodError)
    })

    it('rejects missing image URL', () => {
      const { image, ...item } = validCartItem
      expect(() => CartItemSchema.parse(item)).toThrow(ZodError)
    })

    it('rejects invalid image URL', () => {
      const item = { ...validCartItem, image: 'not-a-url' }
      expect(() => CartItemSchema.parse(item)).toThrow(ZodError)
    })

    it('rejects missing count', () => {
      const { count, ...item } = validCartItem
      expect(() => CartItemSchema.parse(item)).toThrow(ZodError)
    })

    it('rejects non-number count', () => {
      const item = { ...validCartItem, count: 'five' }
      expect(() => CartItemSchema.parse(item)).toThrow(ZodError)
    })

    it('accepts zero count', () => {
      const item = { ...validCartItem, count: 0 }
      const result = CartItemSchema.parse(item)
      expect(result.count).toBe(0)
    })
  })

  describe('ProductsSchema', () => {
    it('validates array of products', () => {
      const products = [validProduct, { ...validProduct, id: 2 }]
      const result = ProductsSchema.parse(products)
      expect(result).toHaveLength(2)
      expect(result).toEqual(products)
    })

    it('validates empty array', () => {
      const result = ProductsSchema.parse([])
      expect(result).toEqual([])
    })

    it('rejects invalid products in array', () => {
      const products = [validProduct, { id: 'invalid' }]
      expect(() => ProductsSchema.parse(products)).toThrow(ZodError)
    })

    it('rejects non-array input', () => {
      expect(() => ProductsSchema.parse({ product: validProduct })).toThrow(ZodError)
    })

    it('validates large product arrays', () => {
      const products = Array(100).fill(null).map((_, i) => ({
        ...validProduct,
        id: i
      }))
      const result = ProductsSchema.parse(products)
      expect(result).toHaveLength(100)
    })
  })

  describe('newCartItem', () => {
    it('creates valid cart item from product', () => {
      const result = newCartItem(validProduct as Product, 5)
      expect(result.id).toBe(validProduct.id)
      expect(result.title).toBe(validProduct.title)
      expect(result.price).toBe(validProduct.price)
      expect(result.image).toBe(validProduct.image)
      expect(result.count).toBe(5)
    })

    it('creates item with count of 1', () => {
      const result = newCartItem(validProduct as Product, 1)
      expect(result.count).toBe(1)
    })

    it('creates item with count of 0', () => {
      const result = newCartItem(validProduct as Product, 0)
      expect(result.count).toBe(0)
    })

    it('creates item with large count', () => {
      const result = newCartItem(validProduct as Product, 999)
      expect(result.count).toBe(999)
    })

    it('excludes description from cart item', () => {
      const result = newCartItem(validProduct as Product, 1)
      expect(result).not.toHaveProperty('description')
    })

    it('excludes rating from cart item', () => {
      const result = newCartItem(validProduct as Product, 1)
      expect(result).not.toHaveProperty('rating')
    })

    it('excludes category from cart item', () => {
      const result = newCartItem(validProduct as Product, 1)
      expect(result).not.toHaveProperty('category')
    })

    it('returns CartItem type', () => {
      const result = newCartItem(validProduct as Product, 5)
      // Verify it matches CartItemSchema
      const validated = CartItemSchema.parse(result)
      expect(validated).toEqual(result)
    })
  })

  describe('Type inference', () => {
    it('Product type is correctly inferred', () => {
      const product = ProductSchema.parse(validProduct)
      expect(product.id).toBeDefined()
      expect(product.title).toBeDefined()
      expect(product.price).toBeDefined()
      expect(product.description).toBeDefined()
      expect(product.category).toBeDefined()
      expect(product.image).toBeDefined()
      expect(product.rating).toBeDefined()
    })

    it('CartItem type is correctly inferred', () => {
      const item = CartItemSchema.parse(validCartItem)
      expect(item.id).toBeDefined()
      expect(item.title).toBeDefined()
      expect(item.price).toBeDefined()
      expect(item.image).toBeDefined()
      expect(item.count).toBeDefined()
    })
  })
})