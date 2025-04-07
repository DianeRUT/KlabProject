
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import Filters from "../components/Filters"
import Pagination from "../components/Pagination"
import { getProducts } from "../api/productApi"
import { getCategories } from "../api/categoryApi"
import "../styles/ProductsPage.css"

const ProductsPage = () => {
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get("category") || ""

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Filter state
  const [filters, setFilters] = useState({
    category: initialCategory ? [initialCategory] : [],
    brand: [],
    type: [],
    priceRange: [0, 1000],
    gender: [],
  })

  // Sort state
  const [sortBy, setSortBy] = useState("newest")

  // View state (grid or list)
  const [viewMode, setViewMode] = useState("grid")

  useEffect(() => {
    // Fetch categories for filter options
    const fetchCategories = async () => {
      try {
        const data = await getCategories()
        if (Array.isArray(data)) {
          setCategories(data)
        }
      } catch (err) {
        console.error("Error fetching categories:", err)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        console.log("Fetching products with filters:", filters)

        // Convert filters to API parameters
        const params = {
          page: currentPage,
          sort: sortBy,
          minPrice: filters.priceRange[0],
          maxPrice: filters.priceRange[1],
        }

        // Add category filter if selected
        if (filters.category.length > 0) {
          params.category = filters.category.join(",")
        }

        // Add brand filter if selected
        if (filters.brand.length > 0) {
          params.brand = filters.brand.join(",")
        }

        // Add type filter if selected
        if (filters.type.length > 0) {
          params.type = filters.type.join(",")
        }

        // Add gender filter if selected
        if (filters.gender.length > 0) {
          params.gender = filters.gender.join(",")
        }

        const data = await getProducts(params)
        console.log("Products data received:", data)

        // Handle different response structures
        if (data && data.products && Array.isArray(data.products)) {
          setProducts(data.products)
          setTotalPages(data.pages || 1)
        } else if (Array.isArray(data)) {
          setProducts(data)
          setTotalPages(Math.ceil(data.length / 10)) // Assuming 10 products per page
        } else {
          console.warn("Unexpected data structure:", data)
          setProducts([])
          setTotalPages(1)
        }
      } catch (err) {
        console.error("Error in ProductsPage:", err)
        setError("Failed to load products. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [currentPage, sortBy, filters])

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters }

      // Handle different filter types
      if (filterType === "priceRange") {
        newFilters.priceRange = value
      } else {
        // Toggle filter value (add or remove)
        if (Array.isArray(newFilters[filterType])) {
          if (newFilters[filterType].includes(value)) {
            newFilters[filterType] = newFilters[filterType].filter((item) => item !== value)
          } else {
            newFilters[filterType] = [...newFilters[filterType], value]
          }
        }
      }

      return newFilters
    })

    // Reset to first page when filters change
    setCurrentPage(1)
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
    setCurrentPage(1) // Reset to first page when sort changes
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const toggleViewMode = (mode) => {
    setViewMode(mode)
  }

  if (loading && products.length === 0) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    )
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
              <select value={sortBy} onChange={handleSortChange}>
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            <div className="view-options">
              <button
                className={`view-option ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => toggleViewMode("grid")}
              >
                <i className="fas fa-th"></i>
              </button>
              <button
                className={`view-option ${viewMode === "list" ? "active" : ""}`}
                onClick={() => toggleViewMode("list")}
              >
                <i className="fas fa-list"></i>
              </button>
            </div>
          </div>

          {error ? (
            <div className="error-container">
              <p>{error}</p>
              <button onClick={() => window.location.reload()} className="retry-btn">
                Try Again
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="no-products">
              <p>No products found matching your criteria.</p>
              <p>Try adjusting your filters or browse our categories.</p>
            </div>
          ) : (
            <>
              <div className={`products-${viewMode}`}>
                {products.map((product) => (
                  <ProductCard key={product._id || product.id} product={product} />
                ))}
              </div>

              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductsPage

