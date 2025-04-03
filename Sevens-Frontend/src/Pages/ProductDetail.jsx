import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from './CartPage';
// import StarRating from '../Components/StarRating';
import "../Styles/ProductDetails.css"
const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({
    color: '',
    size: '',
    quantity: 1
  });

  // Sample product data - replace with your actual data source
  const productData = [
    {
      id: 1,
      name: 'Running Shoes',
      category: 'Men',
      price: 89.99,
      rating: 4,
      image: '/api/placeholder/300/400',
      description: 'High-performance running shoes',
      requiresOptions: true,
      availableColors: ['#6b7280', '#000000', '#3b82f6'],
      sizes: ['US 8', 'US 9', 'US 10', 'US 11'],
      stock: 10
    },
    // ... other products
  ];

  useEffect(() => {
    const foundProduct = productData.find(p => p.id === Number(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedOptions(prev => ({
        ...prev,
        color: foundProduct.availableColors?.[0] || '',
        size: foundProduct.sizes?.[0] || ''
      }));
    } else {
      navigate('/products');
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedOptions: {
        color: selectedOptions.color,
        size: selectedOptions.size
      }
    }, selectedOptions.quantity);
    navigate('/cart');
  };

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-detail-container">
      <div className="product-images">
        <img src={product.image} alt={product.name} />
      </div>
      
      <div className="product-info">
        <h1>{product.name}</h1>
        <div className="price-rating">
          <span className="price">${product.price.toFixed(2)}</span>
          <StarRating rating={product.rating} />
        </div>
        
        <div className="options-section">
          {product.availableColors && (
            <div className="option-group">
              <h3>Color:</h3>
              <div className="color-options">
                {product.availableColors.map(color => (
                  <button
                    key={color}
                    className={`color-option ${selectedOptions.color === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedOptions(prev => ({...prev, color}))}
                  />
                ))}
              </div>
            </div>
          )}

          {product.sizes && (
            <div className="option-group">
              <h3>Size:</h3>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-option ${selectedOptions.size === size ? 'selected' : ''}`}
                    onClick={() => setSelectedOptions(prev => ({...prev, size}))}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="option-group">
            <h3>Quantity:</h3>
            <div className="quantity-selector">
              <button 
                onClick={() => setSelectedOptions(prev => ({
                  ...prev,
                  quantity: Math.max(1, prev.quantity - 1)
                }))}
              >
                -
              </button>
              <input
                type="number"
                value={selectedOptions.quantity}
                onChange={(e) => setSelectedOptions(prev => ({
                  ...prev,
                  quantity: Math.min(product.stock, Math.max(1, e.target.value))
                }))}
              />
              <button 
                onClick={() => setSelectedOptions(prev => ({
                  ...prev,
                  quantity: Math.min(product.stock, prev.quantity + 1)
                }))}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={!selectedOptions.color || !selectedOptions.size}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;