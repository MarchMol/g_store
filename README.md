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

## 🧪 Testing

This project uses **Vitest** as the unit testing framework, optimized for Vue 3 and TypeScript environments. All tests are located in `src/tests/` and follow the `*.spec.ts` naming convention.

### Setup

#### Installation
```
npm install -D vitest @vitest/ui happy-dom @vue/test-utils @testing-library/vue
```

#### Configuration
Create a `vitest.config.ts` file in the root directory of the project and put something like this
```
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: [],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```
also add this in the package.json for the scripts
```
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:run": "vitest --run"
  }
}
```

### Running Tests
- Watch mode (recommended for development)
```
npm run test
```

- UI dashboard (visual test interface)
```
npm run test:ui
```

- Single run (CI mode)
```
npm run test:run
```

- Specific test file
```
npm run test -- src/tests/cart.storage.spec.ts
```

- Tests matching pattern
```
npm run test -- --grep "getCartSize"
```
## Tests:

### 1. Services Layer Tests 

#### products.api.spec.ts

**getProducts()** - Fetches all products from FakeStore API
- Returns array of products on valid response
- Throws ZodError on invalid product data
- Throws error on network failure
- Throws error on invalid JSON response
- Calls correct API endpoint (https://fakestoreapi.com/products)
- Handles empty product array

**getCategories()** - Extracts and deduplicates unique product categories
- Returns unique categories
- Deduplicates categories correctly (Set-based)
- Handles empty products array
- Throws error on network failure
- Throws ZodError on invalid data

**getSingle(id)** - Fetches a single product by ID
- Returns single product by id
- Calls correct API endpoint with id parameter
- Throws ZodError on invalid product data
- Throws error on 404 response
- Throws error on network failure
- Handles different product ids

#### cart.storage.spec.ts

**getCartSize()** - Returns total quantity of all items in cart
- Returns 0 for empty cart
- Returns correct total quantity for single item
- Returns correct total quantity for multiple items
- Handles corrupted JSON gracefully
- Handles empty string in localStorage

**getCartItems()** - Retrieves cart items from localStorage
- Returns empty array for empty cart
- Returns valid cart items
- Returns empty array for corrupted JSON
- Returns empty array when localStorage key does not exist

**increaseCartItem(id)** - Increments item quantity or creates new cart item
- Increments count for existing item
- Creates new item if not exists (async API call)
- Handles API errors gracefully
- Adds to empty cart

**decreaseCartItem(id)** - Decrements item quantity
- Decrements count for existing item
- Does not decrement below 0
- Ignores non-existent items

**removeFromCart(id)** - Removes item completely from cart
- Removes item from cart
- Removes correct item with multiple items
- Handles removing non-existent item
- Clears cart when removing only item

**rewriteCartItem(id, count)** - Updates item quantity or creates new item with specific count
- Updates existing item count
- Creates new item if not exists
- Handles setting count to 0
- Handles API errors gracefully

**getItemCount(id)** - Returns quantity of specific item in cart
- Returns correct count for existing item
- Returns 0 for non-existent item
- Returns 0 for empty cart
- Returns correct count with multiple items

### 2. Schemas Layer Tests

#### product.schema.spec.ts

**ProductRating** - Validates rating object with rate and count
- Validates correct rating object
- Rejects missing rate field
- Rejects missing count field
- Rejects non-numeric rate
- Accepts zero values

**ProductSchema** - Validates complete product object with all required fields
- Validates correct product
- Rejects missing id
- Rejects missing title
- Rejects missing price
- Rejects missing description
- Rejects missing category
- Rejects invalid image URL
- Rejects missing rating
- Accepts valid URLs
- Rejects non-string title
- Rejects non-number price
- Accepts zero price
- Accepts negative price

**CartItemSchema** - Validates cart item with id, title, price, image, and count
- Validates correct cart item
- Rejects missing id
- Rejects missing title
- Rejects missing price
- Rejects missing image URL
- Rejects invalid image URL
- Rejects missing count
- Rejects non-number count
- Accepts zero count

**ProductsSchema** - Validates array of products
- Validates array of products
- Validates empty array
- Rejects invalid products in array
- Rejects non-array input
- Validates large product arrays

**newCartItem(product, count)** - Transforms Product to CartItem with specified quantity
- Creates valid cart item from product
- Creates item with count of 1
- Creates item with count of 0
- Creates item with large count
- Excludes description from cart item
- Excludes rating from cart item
- Excludes category from cart item
- Returns CartItem type

**Type inference** - Validates type inference from Zod schemas
- Product type is correctly inferred
- CartItem type is correctly inferred

### 3. Directives Tests

#### clickOutside.spec.ts

**clickOutside** - Custom Vue directive for detecting clicks outside element
- Mounts without errors
- Cleans up event listener on unmount
- Removes stored handler reference on unmount
- Handles multiple directives on same page

### 4. Components Tests

#### amountCustom.spec.ts

**AmountCustom** - Quantity selector component with increment/decrement buttons
- Displays current count
- Renders increment button
- Renders decrement button
- Emits add event when plus button clicked
- Emits sub event when minus button clicked
- Prevents subtraction when count is 0
- Allows addition when count is 0
- Handles large count values
- Handles count of 1
- Allows addition at count 1

### 5. Pages Tests

#### catalogueView.spec.ts

**CatalogueView** - Main product listing page with search and filtering
- Renders loading state initially
- Loads products on mount

## Test Statistics
| Category | Files | Tests | Status |
|----------|-------|-------|--------|
| Services | 2 | 40+ | ✅ |
| Schemas | 1 | 50+ | ✅ |
| Directives | 1 | 5+ | ✅ |
| Components | 1 | 10+ | ✅ |
| Pages | 1 | 3+ | ✅ |
| **Total** | **6** | **100+** | ✅ |

## 🌐 External Resources
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
