"use client"

import { useState, useEffect } from "react"
import "../styles/Filters.css"

const Filters = ({ filters, onFilterChange }) => {
  const [priceRange, setPriceRange] = useState(filters.priceRange[1])
  const [categories, setCategories] = useState(["Men", "Women", "Kids", "Sports", "Sale"])
  const [types, setTypes] = useState(["Shoes", "Clothes", "Accessories"])
  const [brands, setBrands] = useState(["Nike", "Jordan", "Adidas", "Puma", "Versace"])

  // Update price range when filters change
  useEffect(() => {
    setPriceRange(filters.priceRange[1])
  }, [filters.priceRange])

  const handlePriceChange = (e) => {
    const value = Number.parseInt(e.target.value)
    setPriceRange(value)
    onFilterChange("priceRange", [0, value])
  }

  return (
    <div className="filters">
      <h2>Filters</h2>

      <div className="filter-section">
        <h3>Category</h3>
        <div className="filter-options">
          {categories.map((category) => (
            <label key={category} className="filter-option">
              <input
                type="checkbox"
                checked={filters.category.includes(category)}
                onChange={() => onFilterChange("category", category)}
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Type</h3>
        <div className="filter-options">
          {types.map((type) => (
            <label key={type} className="filter-option">
              <input
                type="checkbox"
                checked={filters.type.includes(type)}
                onChange={() => onFilterChange("type", type)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Brand</h3>
        <div className="filter-options">
          {brands.map((brand) => (
            <label key={brand} className="filter-option">
              <input
                type="checkbox"
                checked={filters.brand.includes(brand)}
                onChange={() => onFilterChange("brand", brand)}
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Gender</h3>
        <div className="filter-options">
          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.gender.includes("Men")}
              onChange={() => onFilterChange("gender", "Men")}
            />
            Men
          </label>
          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.gender.includes("Women")}
              onChange={() => onFilterChange("gender", "Women")}
            />
            Women
          </label>
          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.gender.includes("Unisex")}
              onChange={() => onFilterChange("gender", "Unisex")}
            />
            Unisex
          </label>
        </div>
      </div>

      <div className="filter-section">
        <h3>Price Range</h3>
        <div className="price-slider">
          <input type="range" min="0" max="1000" value={priceRange} onChange={handlePriceChange} />
          <div className="price-range-values">
            <span>$0</span>
            <span>${priceRange}</span>
          </div>
        </div>
      </div>

      <button
        className="clear-filters-btn"
        onClick={() => {
          // Reset all filters
          onFilterChange("reset", {
            category: [],
            brand: [],
            type: [],
            priceRange: [0, 1000],
            gender: [],
          })
        }}
      >
        Clear All Filters
      </button>
    </div>
  )
}

export default Filters

