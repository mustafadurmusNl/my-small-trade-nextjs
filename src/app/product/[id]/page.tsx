"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { useCartStore } from "@/store/cartStore"
import styles from "@/app/styles.module.css"

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  const { addToCart } = useCartStore()

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`)
        const data = await res.json()
        setProduct(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) return <div className="p-6 text-center text-lg">Loading...</div>
  if (!product) return <div className="p-6 text-center text-red-500">Product not found</div>

  return (
    <div className={styles.container}>
      <div className={styles.productDetailWrapperRow}>
        {/* Left: Image */}
        <Image
  src={product.image || "/placeholder.svg"}
  alt={product.title}
  width={300}
  height={300}  // Adjust these values according to your needs
  className={styles.productImage}
/>

        {/* Right: Product Info */}
        <div className={styles.productInfo}>
          <h1 className={styles.productTitle}>{product.title}</h1>
          <p className={styles.productDescription}>{product.description}</p>

          <p className={styles.productPrice}>${product.price.toFixed(2)}</p>

          {/* Rating */}
          <div className={styles.productRating}>
            <span className={styles.productRatingStars}>
              {"★".repeat(Math.round(product.rating.rate))}
            </span>
            <span className="text-gray-600 text-sm">({product.rating.count} reviews)</span>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-3 mt-4">
            <label htmlFor="qty" className="font-medium">Qty:</label>
            <input
              id="qty"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className={styles.qtyInput}
            />
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product, quantity)}
            className={styles.addToCartButton}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
