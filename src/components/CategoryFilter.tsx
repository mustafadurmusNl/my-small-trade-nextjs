"use client"

interface CategoryFilterProps {
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"]

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-nowrap gap-3 min-w-max">
      <button
        onClick={() => onSelectCategory("")}
        className={`px-4 py-2 rounded-md transition-colors whitespace-nowrap z-10 ${
          selectedCategory === "" ? "bg-gray-800 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
        }`}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-md transition-colors whitespace-nowrap z-10 ${
            selectedCategory === category ? "bg-gray-800 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
          }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  )
}

