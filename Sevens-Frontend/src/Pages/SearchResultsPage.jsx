"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { searchProducts } from "../api/searchApi"
import ProductCard from "../components/ProductCard"
import "../styles/SearchResultsPage.css"

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q") || ""
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [sortBy, setSortBy] = useState("relevance")

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return

      setLoading(true)
      try {
        const filters = {
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          categories: selectedCategories.length > 0 ? selectedCategories.join(",") : undefined,
          sort: sortBy,
        }

        const data = await searchProducts(query, filters)
        setProducts(data)
      } catch (err) {
        setError("Failed to load search results")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [query, priceRange, selectedCategories, sortBy])

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category)
      } else {
        return [...prev, category]
      }
    })
  }

  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange]
    newRange[index] = Number(e.target.value)
    setPriceRange(newRange)
  }

  if (loading) {
    return (
      <div className="search-results-loading">
        <div className="loading-spinner"></div>
        <p>Searching for "{query}"...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="search-results-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="search-results-page">
      <div className="search-header">
        <h1>Search Results for "{query}"</h1>
        <p>{products.length} products found</p>
      </div>

      <div className="search-container">
        <div className="search-filters">
          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="price-inputs">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(e, 0)}
                min="0"
                max={priceRange[1]}
              />
              <span>to</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(e, 1)}
                min={priceRange[0]}
              />
            </div>
            <div className="price-slider">
              <input type="range" min="0" max="1000" value={priceRange[0]} onChange={(e) => handlePriceChange(e, 0)} />
              <input type="range" min="0" max="1000" value={priceRange[1]} onChange={(e) => handlePriceChange(e, 1)} />
            </div>
          </div>

          <div className="filter-section">
            <h3>Categories</h3>
            <div className="category-checkboxes">
              {["Electronics", "Clothing", "Home", "Books", "Sports"].map((category) => (
                <label key={category} className="category-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="search-results">
          <div className="search-sort">
            <label>
              Sort by:
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="relevance">Relevance</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="rating">Customer Rating</option>
              </select>
            </label>
          </div>

          {products.length === 0 ? (
            <div className="no-results">
              <p>No products found for "{query}"</p>
              <p>Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchResultsPage

