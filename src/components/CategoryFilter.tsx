"use client"

interface CategoryFilterProps {
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"]

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="mb-6">
      <select
        value={selectedCategory}
        onChange={(e) => onSelectCategory(e.target.value)}
        className="p-2 border rounded-md"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}
