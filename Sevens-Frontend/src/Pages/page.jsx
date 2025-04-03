import React, { useState } from 'react';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import './ShoeShop.css';

const StarRating = ({ rating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        <Star 
          key={index} 
          className={index < rating ? 'star-filled' : 'star-empty'}
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
  const [filters, setFilters] = useState({ category: [], type: [], color: [], minPrice: 0, maxPrice: 100 });
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      const newFilter = prev[filterType].includes(value) ? prev[filterType].filter(item => item !== value) : [...prev[filterType], value];
      return { ...prev, [filterType]: newFilter };
    });
  };

  const filteredProducts = productData.filter(product => {
    return (
      (filters.category.length === 0 || filters.category.includes(product.category)) &&
      (filters.type.length === 0 || filters.type.includes(product.type)) &&
      (filters.color.length === 0 || filters.color.includes(product.color)) &&
      product.price >= filters.minPrice && product.price <= filters.maxPrice
    );
  });

  return (
    <div className="shop-container">
      <div className="sidebar">
        <h3>Category</h3>
        {['Men', 'Women', 'Sports'].map(category => (
          <label key={category}><input type="checkbox" checked={filters.category.includes(category)} onChange={() => handleFilterChange('category', category)} /> {category}</label>
        ))}
        <h3>Type</h3>
        {['Shoes', 'Accessories'].map(type => (
          <label key={type}><input type="checkbox" checked={filters.type.includes(type)} onChange={() => handleFilterChange('type', type)} /> {type}</label>
        ))}
      </div>
      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            <StarRating rating={product.rating} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoeShop;
