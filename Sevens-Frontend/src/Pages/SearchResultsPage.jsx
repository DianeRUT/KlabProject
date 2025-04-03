"use client"

import { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { products } from "../Data/products" 
import ProductCard from "../Components/ProductCard"
import "../styles/SearchResultsPage.css"

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate search delay
    setLoading(true)

    const timer = setTimeout(() => {
      if (query) {
        // Search in product name, brand, and category
        const searchResults = products.filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.brand.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()),
        )

        setResults(searchResults)
      } else {
        setResults([])
      }

      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [query])

  return (
    <div className="search-results-page">
      <div className="container">
        <div className="search-header">
          <h1>Search Results</h1>
          <p>
            {loading
              ? "Searching..."
              : results.length > 0
                ? `Found ${results.length} results for "${query}"`
                : `No results found for "${query}"`}
          </p>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Searching for products...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="search-results">
            <div className="products-grid">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">
              <i className="fas fa-search"></i>
            </div>
            <h2>No results found</h2>
            <p>We couldn't find any products matching your search.</p>
            <div className="no-results-suggestions">
              <h3>Suggestions:</h3>
              <ul>
                <li>Check the spelling of your search term</li>
                <li>Try using more general keywords</li>
                <li>Try searching for a related product</li>
              </ul>
            </div>
            <Link to="/products" className="browse-products-btn">
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchResultsPage

