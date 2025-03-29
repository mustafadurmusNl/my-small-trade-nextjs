import Image from "next/image"

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

export default async function Home() {
  const products = await getProducts()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shop Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-64 w-full">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500 mb-1">{product.category}</p>
              <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
              <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
              <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products")
  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }
  return res.json()
}

