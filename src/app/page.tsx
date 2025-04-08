"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import CategoryFilter from "@/components/CategoryFilter"
import styles from "./styles.module.css"

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

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories")
        if (!res.ok) throw new Error("Failed to fetch categories")
        const data: string[] = await res.json()
        setCategories(data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true)
      try {
        const url = selectedCategory
          ? `https://fakestoreapi.com/products/category/${encodeURIComponent(selectedCategory)}`
          : "https://fakestoreapi.com/products"

        const res = await fetch(url)
        if (!res.ok) throw new Error("Failed to fetch products")

        const data: Product[] = await res.json()
        setProducts(data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [selectedCategory])

  return (
    <main>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop Our Products</h1>
        <p className="text-gray-600">Discover our curated collection of high-quality items</p>
      </div>

      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={categories}
      />

      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      )}

      {!isLoading && (
        <div className={styles.productGrid}>
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className={styles.productCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className={styles.productImage}
                />
              </div>
              <div className={styles.productInfo}>
                <p className={styles.category}>{product.category}</p>
                <h3 className={styles.title}>{product.title}</h3>
                <p className={styles.price}>${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!isLoading && products.length === 0 && (
        <div className="text-center py-20">
          <h3 className="text-xl font-medium text-gray-900">No products found</h3>
          <p className="text-gray-600 mt-2">Try selecting a different category</p>
        </div>
      )}
    </main>
  )
}
