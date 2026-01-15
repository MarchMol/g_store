import { newCartItem, type CartItem } from "@/schemas/product.schema"
import { getSingle } from "./products.api"

export function getCartSize():number {
    const savedCart = localStorage.getItem("gstore:cart")
    if (savedCart) {
        try{
            const cart = JSON.parse(savedCart)
            const size = cart.reduce((acc:number, item:{id:number, count:number}) =>{
                return acc + item.count
            },
        0)
            return size
        } catch(err) {
            console.log(err)
            return 0
        }
    } else {
        return 0
    }
}



export function getCartItems():CartItem[] {
    const savedCart = localStorage.getItem("gstore:cart")
    if (savedCart) {
        try{
            const cart = JSON.parse(savedCart)
            return cart
        } catch(err) {
            console.log(err)
            return []
        }
    } else {
        return []
    }
}


export async function increaseCartItem(id: number) {
    const cart = getCartItems()
    var exists = false
    cart.forEach((element: CartItem) =>{
        if (element.id === id){
            element.count += 1
            exists = true
        }
    })

    if (!exists) {
        try{
            const prod = await getSingle(id)
            const cart_item = newCartItem(prod, 1)
            cart.push(cart_item)
        } catch (err){
            console.log(err)
        }
    }

    localStorage.setItem(
        'gstore:cart',
        JSON.stringify(
            cart
        )  
    )
}


export function decreaseCartItem(id:number) {
    const cart = getCartItems()
    var is_empty = false
    cart.forEach((element: CartItem) =>{
        if (element.id === id){
            if(element.count>=1){
                element.count -= 1
                if(element.count ==0){
                    is_empty=true
                }
            }
        }
    })

    if (is_empty){
        removeFromCart(id)
    }

    localStorage.setItem(
        'gstore:cart',
        JSON.stringify(
            cart
        )  
    )
}

export async function rewriteCartItem(id: number, count: number) {
    const cart = getCartItems()
    var exists = false
    cart.forEach((element: CartItem) =>{
        if (element.id === id){
            element.count = count
            exists = true
        }
    })

    if (!exists) {
        try{
            const prod = await getSingle(id)
            const cart_item = newCartItem(prod, count)
            cart.push(cart_item)
        } catch (err){
            console.log(err)
        }
    }

    localStorage.setItem(
        'gstore:cart',
        JSON.stringify(
            cart
        )  
    )
}
export function getItemCount(id:number):number {
    const cart = getCartItems()
    const match = cart.filter(o => o.id == id)
    const item = match[0]
    return item ? item.count : 0
}

export function removeFromCart(id:number) {
    const cart = getCartItems()
    const filtered = cart.filter(o => o.id!== id)
        localStorage.setItem(
        'gstore:cart',
        JSON.stringify(
            filtered
        )  
    )
}