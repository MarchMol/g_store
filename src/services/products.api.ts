import { ProductSchema, ProductsSchema } from "@/schemas/product.schema"

export async function getProducts() {
    const res = await fetch("https://fakestoreapi.com/products")
    const data = await res.json()
    return ProductsSchema.parse(data)
}

export async function  getCategories(){
    const res = await fetch("https://fakestoreapi.com/products")
    const data = await res.json()
    const parsed = ProductsSchema.parse(data)
    const cats: string[] = [
    ...new Set(parsed.map(p => p.category))
    ]
    return cats
}

export async function getSingle(id: number) {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`)
    const data = await res.json()
    return ProductSchema.parse(data)
}