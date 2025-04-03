import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { products as demoProducts } from "../Data/products";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/productApi";
import { getCategories } from "../api/categoryApi";
// Import demo products
import "../styles/ProductsPage.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("featured");

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get("category");

    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch categories
        const categoriesData = await getCategories();
        setCategories(categoriesData);

        // Prepare filter parameters
        const filters = {
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          sort: sortBy,
        };

        if (selectedCategories.length > 0) {
          filters.categories = selectedCategories.join(",");
        }

        // Fetch products from the backend
        const productsData = await getProducts(filters);
        console.log("Fetched Products:", productsData); // 🔍 Debugging

        if (Array.isArray(productsData) && productsData.length > 0) {
          setProducts(productsData);
        } else {
          setProducts(demoProducts); // Use demo data if backend returns empty
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load products. Please try again.");
        setProducts(demoProducts); // Use demo data in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search, selectedCategories, priceRange, sortBy]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = Number(e.target.value);
    setPriceRange(newRange);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="products-page">
      <h1 className="page-title">All Products</h1>

      <div className="products-container">
        <div className="filters-sidebar">
          <div className="filter-section">
            <h3>Categories</h3>
            <div className="category-filters">
              {categories.map((category) => (
                <label key={category._id} className="category-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.name.toLowerCase())}
                    onChange={() => handleCategoryChange(category.name.toLowerCase())}
                  />
                  {category.name}
                </label>
              ))}
            </div>
          </div>

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
        </div>

        <div className="products-content">
          <div className="products-header">
            <p className="products-count">{products.length} products</p>
            <div className="sort-dropdown">
              <label htmlFor="sort">Sort by:</label>
              <select id="sort" value={sortBy} onChange={handleSortChange}>
                <option value="featured">Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {Array.isArray(products) && products.length > 0 ? (
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>No products found matching your criteria.</p>
              <p>Try adjusting your filters or browse our categories.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
