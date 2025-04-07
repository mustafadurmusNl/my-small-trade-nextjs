import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { ShoppingCart, ShoppingBag } from "lucide-react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DurmusShop - Your Online Store",
  description: "Shop the latest products with our easy-to-use e-commerce platform",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gray-50"}>
        <header className="bg-white shadow-md sticky top-0 z-10 py-4">
          <div className="container mx-auto px-6 flex items-center justify-between">
            <Link href="/" className="group flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-2 rounded-lg shadow-lg transform transition-transform group-hover:scale-110">
                <ShoppingBag className="h-7 w-7 text-white" />
              </div>
              <div className="flex flex-col">
                {/* Colorful gradient title with larger size */}
                <span
                  className="text-4xl font-black"
                  style={{
                    background: "linear-gradient(to right, #8b5cf6, #ec4899, #f59e0b)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                    fontSize: "2rem",
                  }}
                >
                  DurmusShop
                </span>
                <span className="text-xs text-gray-500 tracking-widest uppercase -mt-1">Premium Store</span>
              </div>
            </Link>

            <div className="relative">
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <ShoppingCart className="h-6 w-6 text-gray-700" />
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  0
                </span>
              </button>
            </div>
          </div>
        </header>
        <div className="container mx-auto px-6 py-8">
          <div className="bg-white rounded-xl shadow-lg p-6">{children}</div>
        </div>
      </body>
    </html>
  )
}

