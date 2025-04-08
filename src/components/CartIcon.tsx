"use client"

import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/store/cartStore"

export default function CartIcon() {
  const cart = useCartStore((state) => state.cart)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors relative">
      <ShoppingCart className="h-6 w-6 text-gray-700" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
          {totalItems}
        </span>
      )}
    </button>
  )
}
