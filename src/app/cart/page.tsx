"use client"

import { useCartStore } from "@/store/cartStore"
import Image from "next/image"
import Link from "next/link"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCartStore()

  const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0)

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link href="/">Go shopping</Link></p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border-b pb-4">
              <div className="relative w-24 h-24">
                <Image src={item.image} alt={item.title} fill className="object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p>${item.price.toFixed(2)}</p>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                  className="mt-2 w-20 border rounded px-2 py-1"
                />
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right mt-4 text-xl font-semibold">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  )
}
