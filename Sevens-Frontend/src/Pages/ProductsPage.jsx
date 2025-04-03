"use client"

import { useState, useEffect } from "react"
import { products } from "../Data/products"
import ProductCard from "../Components/ProductCard"
import Filters from "../Components/Filters"
import Pagination from "../Components/Pagination"
import "../styles/ProductsPage.css"

const ProductsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("newest")
  const [filters, setFilters] = useState({
    category: [],
    type: [],
    brand: [],
    priceRange: [0, 1000],
  })

  const productsPerPage = 3

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products]

    // Apply category filter
    if (filters.category.length > 0) {
      result = result.filter((product) => filters.category.some((cat) => product.gender.includes(cat)))
    }

    // Apply type filter
    if (filters.type.length > 0) {
      result = result.filter((product) => filters.type.includes(product.type))
    }

    // Apply brand filter
    if (filters.brand.length > 0) {
      result = result.filter((product) => filters.brand.includes(product.brand))
    }

    // Apply price range filter
    result = result.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    // Apply sorting
    if (sortBy === "newest") {
      // For demo purposes, we'll just keep the original order
    } else if (sortBy === "price-low-high") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high-low") {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating)
    }

    setFilteredProducts(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [filters, sortBy])

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev }

      if (filterType === "priceRange") {
        newFilters.priceRange = value
      } else {
        // Toggle the filter value
        if (newFilters[filterType].includes(value)) {
          newFilters[filterType] = newFilters[filterType].filter((item) => item !== value)
        } else {
          newFilters[filterType] = [...newFilters[filterType], value]
        }
      }

      return newFilters
    })
  }

  return (
    <div className="products-page">
      <div className="products-container">
        <div className="filters-column">
          <Filters filters={filters} onFilterChange={handleFilterChange} />
        </div>

        <div className="products-column">
          <div className="products-header">
            <div className="sort-by">
              <span>Sort by:</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="newest">Newest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            <div className="view-options">
              <button className="view-option active">
                <i className="fas fa-th-large"></i>
              </button>
              <button className="view-option">
                <i className="fas fa-list"></i>
              </button>
            </div>
          </div>

          <div className="products-grid">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  )
}

export default ProductsPage

