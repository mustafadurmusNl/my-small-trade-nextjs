import { create } from "zustand"

// Define the basic Product type
interface Product {
  id: number
  title: string
  price: number
  image: string
}

// Define CartItem that extends Product and adds quantity
interface CartItem extends Product {
  quantity: number
}

// Define the CartStore interface
interface CartStore {
  cart: CartItem[]  // Use CartItem[] instead of Product[]
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
}

// Zustand store creation
export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addToCart: (product, quantity) =>
    set((state) => {
      const existing = state.cart.find((p) => p.id === product.id)
      if (existing) {
        return {
          cart: state.cart.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p
          ),
        }
      }
      return { cart: [...state.cart, { ...product, quantity }] }
    }),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((p) => p.id !== id) })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((p) => (p.id === id ? { ...p, quantity } : p)),
    })),
  clearCart: () => set({ cart: [] }),
}))
