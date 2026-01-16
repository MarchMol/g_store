# G-Store: Vue 3 + TypeScript + Vite E-commerce Application

A modern, fully-typed e-commerce application built with Vue 3, TypeScript, and Vite. The application features product browsing, filtering, shopping cart management, and is styled with Tailwind CSS.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Available Scripts](#available-scripts)
- [Architecture](#architecture)
- [Components](#components)
- [Pages](#pages)
- [Services](#services)
- [Schemas & Types](#schemas--types)
- [Directives](#directives)
- [Routing](#routing)
- [External Resources](#external-resources)

## ✨ Features

- **Product Catalogue**: Browse all products from the FakeStore API
- **Search Functionality**: Real-time search across product titles
- **Category Filtering**: Filter products by category with dynamic category loading
- **Shopping Cart**: Add/remove items, adjust quantities with persistent localStorage storage
- **Product Details**: View detailed information about individual products
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Type Safety**: Full TypeScript support with Zod schema validation
- **Click Outside Directive**: Custom Vue directive for modal/dropdown handling

## 🛠 Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Language**: TypeScript 5.9
- **Build Tool**: Vite with Rolldown
- **State Management**: Pinia 3.0
- **Styling**: Tailwind CSS 4.1 + PostCSS
- **Routing**: Vue Router 4.6
- **Type Validation**: Zod 4.3
- **Icons**: PrimeIcons 7.0
- **Package Manager**: npm

## 📁 Project Structure

150 x 9
I'll create comprehensive documentation for your Vue 3 + TypeScript + Vite project. Let me first explore the codebase to understand its structure and functionality.

Now let me read the services and schemas to understand the data layer:

Let me also check the components and pages for a complete picture:

Now let me read a few key components and pages to understand the functionality:

Perfect! Now I have enough context. Let me create comprehensive documentation for the README file:

Based on my analysis of your project, here's the complete documentation:
```
g_store/
├── src/
│ ├── pages/
│ │ ├── catalogue/
│ │ ├── cart/
│ │ ├── prod_detail/
│ │ └── about/
│ ├── components/
│ │ ├── NavBar.vue
│ │ ├── ProductGrid.vue 
│ │ ├── Search.vue
│ │ ├── ComboBox.vue
│ │ ├── CartButton.vue
│ │ ├── AmountCustom.vue 
│ │ ├── Button.vue
│ │ └── Closable.vue 
│ ├── services/
│ │ ├── products.api.ts
│ │ └── cart.storage.ts
│ ├── schemas/
│ │ └── product.schema.ts
│ ├── directives/
│ │ └── clickOutside.ts
│ ├── router/
│ │ └── index.ts
│ ├── assets/
│ │ ├── icons/
│ │ └── styles/
│ ├── App.vue 
│ ├── main.ts
│ ├── style.css 
└── README.md #
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Install Dependencies
```bash
npm install
```

## 🏗 Architecture
1. API Layer (products.api.ts):

  - Fetches data from FakeStore API
  - Validates responses using Zod schemas
  - Provides three main functions: getProducts(), getCategories(), getSingle(id)
2. Storage Layer (cart.storage.ts):

  - Manages shopping cart in localStorage
  - Key: gstore:cart
  - Stores array of CartItem objects with id, count, title, price, image
3. State Management:

  - Uses Pinia for global state (if needed)
  - Reactive refs in components for local state
  - localStorage for cart persistence
4. Type Safety:

  - Zod schemas validate all API responses
  - TypeScript enforces type safety throughout
  - Type inference from Zod schemas

## 🧩 Components
#### NavBar
Navigation bar with logo, route links, and cart button.
  - Props: cartAmount: number
  - Features: Responsive design, logo click opens about page

#### ProductGrid
Displays products in a grid layout with add/remove functionality.
  - Props: products: Product[]
  - Emits: Add/remove item events
  - Features: Clickable product cards for detail view

#### Search
Text input component for searching products by title.
  - Emits: Search term updates
  - Debounced: Real-time filtering
#### ComboBox
Dropdown filter for product categories.
  - Props: categories: string[]
  - Features: Clear filter option, dynamic category loading
#### CartButton
Button displaying cart item count with visual indicator.
  - Props: cartAmount: number
#### AmountCustom
Quantity selector with increment/decrement buttons. 

  - Props: value: number
  - Emits: Amount change events
  - Button
  - Generic reusable button component with customizable styling.

#### Closable
Container component with close functionality.

## 📄 Pages
#### CatalogueView (CatalogueView.vue)
Main product listing page with integrated search and filtering.

  - Features:
    - Loads all products on mount
    - Real-time search filtering by product title
    - Category filtering with ComboBox
    - Add/remove items from cart
    - Click product to view details
    - Displays cart amount in header
  - State:

    - all_products: Original product list
    - current_products: Filtered product list
    - search_term: Current search query
    - filter: Selected category
    - cart: Current cart items
    - cart_amount: Total items in cart
#### CartView (CartView.vue)
Shopping cart display and management.

  - Features:
    - Display all cart items with images and prices
    - Adjust quantities with AmountCustom component
    - Remove items from cart
    - Calculate total price
    - Proceed to checkout (shows alert)
    - Return to catalogue
    - Calculations:

Total price computed from: cart items × quantity × price
#### ProdDetailView (pages/prod_detail/ProdDetailView.vue)
Detailed product information page.

  - Features:
    - Display full product details
    - Product rating and review count
    - Add to cart with quantity selection
    - Responsive image display
#### AboutView (pages/about/AboutView.vue)
  - About page with company information.


## 📊 Schemas & Types
- **Schemas (Zod):**
```
ProductRating = {
  rate: number
  count: number
}

ProductSchema = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: URL
  rating: ProductRating
}

CartItemSchema = {
  id: number
  title: string
  price: number
  image: URL
  count: number
}

ProductsSchema = Product[]
```
- **Type Inference**
```
type Product = z.infer<typeof ProductSchema>
type CartItem = z.infer<typeof CartItemSchema>
```

- **Helper functions**
```
newCartItem(product: Product, count: number): CartItem
```

## Directives
#### clickOutside (clickOutside.ts)
Custom Vue 3 directive for detecting clicks outside an element.

  - Usage:
    ```<div v-click-outside="handleClickOutside">
    <!-- Content -->
    </div>
    ```

  - Behavior:

Listens to pointerdown events
Calls binding value function when user clicks outside element
Automatically cleans up event listeners on unmount

## 🛣 Routing
| Route | Name | Component | Props |
|-------|------|-----------|-------|
| `/catalogue` | Catalogue | CatalogueView | — |
| `/product-detail/:id` | product-detail | ProdDetailView | id |
| `/cart` | cart | CartView | — |
| `/about` | about | AboutView | — |

🌐 External Resources
 - Icons
<a href="https://primevue.org/icons/">PrimeIcons</a> - Comprehensive icon library

 - API
<a href="https://fakestoreapi.com/docs">FakeStore API</a> - Free JSON API for testing and development

 - Dependencies Documentation
    - Vue 3
    - TypeScript
    - Vite
    - Tailwind CSS
    - Pinia
    - Vue Router
    - Zod
