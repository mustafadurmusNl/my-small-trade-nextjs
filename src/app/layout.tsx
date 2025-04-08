// layout.tsx

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import { ShoppingBag } from "lucide-react" // OK to use in server component
import CartIcon from "@/components/CartIcon"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DurmusShop - Your Online Store",
  description: "Shop the latest products with our easy-to-use e-commerce platform",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gray-50"}>
        {/* Header with title and cart icon */}
        <header className="bg-white shadow-md sticky top-0 z-10 py-4">
          <div className="container mx-auto px-6 flex items-center justify-between">
            <Link href="/" className="group flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-2 rounded-lg shadow-lg transform transition-transform group-hover:scale-110">
                <ShoppingBag className="h-7 w-7 text-white" />
              </div>
              <div className="flex flex-col">
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
              </div>
            </Link>

            {/* CartIcon remains as it is */}
            <CartIcon />
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </body>
    </html>
  )
}
