import React, { useState } from 'react';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import "../Styles/ProductListing.css"
import { useCart } from './CartPage';
import { Link, useNavigate } from 'react-router-dom';

const StarRating = ({ rating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        <Star 
          key={index} 
          className={`star-icon ${index < rating ? 'star-filled' : 'star-empty'}`} 
          fill={index < rating ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  );
};

const productData = [
  { id: 1, name: 'Running Shoes', category: 'Men', type: 'Shoes', color: 'gray', price: 89.99, rating: 4, image: '/api/placeholder/300/400', description: 'High-performance running shoes for men. Lightweight and comfortable.' },
  { id: 2, name: 'Sport Sneakers', category: 'Women', type: 'Shoes', color: 'white', price: 79.99, rating: 5, image: '/api/placeholder/300/400', description: 'Stylish and comfortable sport sneakers for women.' },
  { id: 3, name: 'Leather Wallet', category: 'Men', type: 'Accessories', color: 'brown', price: 49.99, rating: 4, image: '/api/placeholder/300/400', description: 'Genuine leather wallet with multiple card slots.' },
  { id: 4, name: 'Sports Cap', category: 'Women', type: 'Accessories', color: 'beige', price: 29.99, rating: 5, image: '/api/placeholder/300/400', description: 'Adjustable sports cap, perfect for outdoor activities.' }
];

const ShoeShop = () => {

  const { addToCart, setIsCartOpen } = useCart();
const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: [],
    type: [],
    color: [],
    minPrice: 0,
    maxPrice: 100
  });
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const filteredProducts = productData.filter(product => {
    return (
      (filters.category.length === 0 || filters.category.includes(product.category)) &&
      (filters.type.length === 0 || filters.type.includes(product.type)) &&
      (filters.color.length === 0 || filters.color.includes(product.color)) &&
      product.price >= filters.minPrice &&
      product.price <= filters.maxPrice
    );
  });

  const QuickViewModal = ({ product, onClose }) => (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-body">
          <img src={product.image} alt={product.name} className="modal-image" />
          <div className="modal-details">
            <h2 className="product-name">{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <div className="rating-container">
              <StarRating rating={product.rating} />
              <span className="rating-text">({product.rating})</span>
            </div>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <div className="modal-buttons">
              <button className="primary-button"
              onClick={() => {
                if (product.requiresOptions) {
                  navigate(`/product/${product.id}`);
                } else {
                  addToCart(product);
                  onClose();
                }
              }}
              >
                <ShoppingCart className="icon-spacing" />
                {product.requiresOptions ? 'Select Options' : 'Add to Cart'}
              </button>
              {product.requiresOptions && (
    <button 
      className="secondary-button"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      Customize
    </button>
  )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container">
      {/* Filters Sidebar */}
      <div className="sidebar-filters">
        <div className="filter-section">
          <h3 className="filter-heading">Category</h3>
          {['Men', 'Women', 'Sports'].map(category => (
            <label key={category} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.category.includes(category)}
                onChange={() => handleFilterChange('category', category)}
              />
              {category}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <h3 className="filter-heading">Type</h3>
          {['Shoes', 'Accessories'].map(type => (
            <label key={type} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.type.includes(type)}
                onChange={() => handleFilterChange('type', type)}
              />
              {type}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <h3 className="filter-heading">Color</h3>
          <div className="color-filters">
            {['brown', 'beige', 'gray', 'white'].map(color => (
              <div
                key={color}
                className={`color-option color-${color} ${filters.color.includes(color) ? 'selected' : ''}`}
                onClick={() => handleFilterChange('color', color)}
              />
            ))}
          </div>
        </div>

        <div className="filter-section">
  <h3 className="filter-heading">Price</h3>
  <input
    type="range"
    className="price-filter"
    min="0"
    max="100"
    value={filters.maxPrice}
    onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
  />
  <div className="price-range">
    <span>${filters.minPrice.toFixed(2)}</span>
    <span>${filters.maxPrice.toFixed(2)}</span>
  </div>
</div>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-actions">
              <button
                className="action-button"
                onClick={() => setQuickViewProduct(product)}
              >
                <Eye className="action-icon" />
              </button>
              <button className="action-button">
                <ShoppingCart className="action-icon" />
              </button>
            </div>
            <div className="product-details">
              <h3 className="product-name">{product.name}</h3>
              <div className="price-rating">
                <span className="product-price">${product.price.toFixed(2)}</span>
                <StarRating rating={product.rating} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};

export default ShoeShop;