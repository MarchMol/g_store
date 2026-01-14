import {z} from 'zod'

export const ProductRating = z.object ({
    rate: z.number(),
    count: z.number()
})
export const ProductSchema = z.object({
    id: z.number(),
    title: z.string(),
    price: z.number(),
    description: z.string(),
    category: z.string(),
    image: z.url(),
    rating: ProductRating
})

export const CartItemSchema = z.object({
    id: z.number(),
    title: z.string(),
    price: z.number(),
    image: z.url(),
    count: z.number()
})

export type CartItem = z.infer<typeof CartItemSchema>
export type Product = z.infer<typeof ProductSchema>
export const ProductsSchema = z.array(ProductSchema)


export const newCartItem = (p: Product, c: number) => {
    const cart_item = {
        id: p.id,
        title: p.title,
        price: p.price,
        image: p.image,
        count: c
    }
    
    return CartItemSchema.parse(cart_item)
}
//   {
//     "id": 1,
//     "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//     "price": 109.95,
//     "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//     "category": "men's clothing",
//     "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
//     "rating": {
//       "rate": 3.9,
//       "count": 120
//     }
//   },