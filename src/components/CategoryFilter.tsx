// "use client"

import styles from "@/app/styles.module.css"

interface CategoryFilterProps {
  selectedCategory: string
  onSelectCategory: (category: string) => void
  categories: string[]
}

export default function CategoryFilter({ selectedCategory, onSelectCategory, categories }: CategoryFilterProps) {
  return (
    <div className={styles.categoryContainer}>
      <div className={styles.categoryList}>
        <button
          onClick={() => onSelectCategory("")}
          className={`${styles.categoryButton} ${
            selectedCategory === "" ? styles.categoryButtonActive : styles.categoryButtonInactive
          }`}
        >
          All Products
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`${styles.categoryButton} ${
              selectedCategory === category ? styles.categoryButtonActive : styles.categoryButtonInactive
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1).replace("'s", "'s")}
          </button>
        ))}
      </div>
    </div>
  )
}
