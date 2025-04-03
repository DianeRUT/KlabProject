"use client"

import { useState } from "react"
import "../styles/Filters.css"

const Filters = ({ filters, onFilterChange }) => {
  const [priceRange, setPriceRange] = useState(filters.priceRange[1])

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
          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.category.includes("Men")}
              onChange={() => onFilterChange("category", "Men")}
            />
            Men
          </label>
          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.category.includes("Women")}
              onChange={() => onFilterChange("category", "Women")}
            />
            Women
          </label>
          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.category.includes("Sports")}
              onChange={() => onFilterChange("category", "Sports")}
            />
            Sports
          </label>
        </div>
      </div>

      <div className="filter-section">
        <h3>Type</h3>
        <div className="filter-options">
          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.type.includes("Shoes")}
              onChange={() => onFilterChange("type", "Shoes")}
            />
            Shoes
          </label>
          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.type.includes("Accessories")}
              onChange={() => onFilterChange("type", "Accessories")}
            />
            Accessories
          </label>
          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.type.includes("Clothes")}
              onChange={() => onFilterChange("type", "Clothes")}
            />
            Clothes
          </label>
        </div>
      </div>

      <div className="filter-section">
        <h3>Brand</h3>
        <div className="filter-options">
          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.brand.includes("Nike")}
              onChange={() => onFilterChange("brand", "Nike")}
            />
            Nike
          </label>
          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.brand.includes("Jordan")}
              onChange={() => onFilterChange("brand", "Jordan")}
            />
            Jordan
          </label>
          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.brand.includes("Versace")}
              onChange={() => onFilterChange("brand", "Versace")}
            />
            Versace
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
    </div>
  )
}

export default Filters

