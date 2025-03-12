import React, { useState } from 'react';
import '../Styles/Category.css'; 
import polo1 from '../assets/Images/image 26.png'; 
import polo2 from '../assets/Images/image 29.png';
import polo3 from '../assets/Images/image 28.png';
import polo4 from '../assets/Images/image12.png';
import shirt1 from '../assets/Images/image13.png';
import shirt2 from '../assets/Images/image14.png';
import shirt3 from '../assets/Images/image 7.png';
import shirt4 from '../assets/Images/image 15.png';
import image1 from '../assets/Images/image1.png';
import { BsChevronDown } from 'react-icons/bs';


const CategoryPage = () => {
  const [priceRange, setPriceRange] = useState([100, 900]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedDressStyles, setSelectedDressStyles] = useState([]);

  const handlePriceChange = (event) => {
    setPriceRange(event.target.value.split(',').map(Number));
  };

  const handleColorToggle = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleSizeToggle = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handleDressStyleToggle = (style) => {
    if (selectedDressStyles.includes(style)) {
      setSelectedDressStyles(selectedDressStyles.filter((ds) => ds !== style));
    } else {
      setSelectedDressStyles([...selectedDressStyles, style]);
    }
  };

  const products = [
    {
      name: 'Gradient Graphic T-shirt',
      price: 145,
      image: polo1,
      rating: 4.5,
    },
    {
      name: 'Polo with Tipping Details',
      price: 180,
      image: polo2,
      rating: 4.0,
    },
    {
      name: 'Black Striped T-shirt',
      price: 120,
      oldPrice: 160,
      image: polo3,
      rating: 4.5,
    },

    {
      name: 'Skinny Fit Jeans',
      price: 240,
      oldPrice: 260,
      image: polo4 ,
      rating: 4.0,
    },
    {
      name: 'Checkered Shirt',
      price: 180,
      image: shirt1,
      rating: 4.0,
    },
    {
      name: 'Sleeve Striped T-shirt',
      price: 130,
      oldPrice: 160,
      image: shirt2,
      rating: 4.5,
    },
    {
      name: 'Vertical Striped Shirt',
      price: 212,
      oldPrice: 232,
      image: shirt3,
      rating: 4.0,
    },
    {
      name: 'Courage Graphic T-shirt',
      price: 145,
      image: shirt4,
      rating: 4.0,
    },
    {
      name: 'Locke Fit Bermuda Shorts',
      price: 80,
      image: image1,
      rating: 3.0,
    },
    
  ];

  const filteredProducts = products.filter((product) => {
    const isInPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
    return isInPriceRange;
  });

  return (
    <div className="category-page">
      <div className="header">
        Home &gt; Casual
      </div>
      <div className="content">
        <div className="sidebar">
          <div className="filters">
            <div className="filter-title">Filters <span className="filter-icon">☰</span></div>
            <div className="filter-section">
              <div className="filter-subtitle">T-shirts <BsChevronDown className="filter-arrow"/></div>
              <div className="filter-subtitle">Shorts <BsChevronDown className="filter-arrow"/></div>
              <div className="filter-subtitle">Shirts <BsChevronDown className="filter-arrow"/></div>
              <div className="filter-subtitle">Hoodies <BsChevronDown className="filter-arrow"/></div>
              <div className="filter-subtitle">Jeans <BsChevronDown className="filter-arrow"/></div>
            </div>
            <div className="filter-section">
              <div className="filter-title">Price</div>
              <input
                type="range"
                min="100"
                max="900"
                value={priceRange.join(',')}
                onChange={handlePriceChange}
              />
              <div className="price-range">
                ${priceRange[0]} - ${priceRange[1]}
              </div>
            </div>
            <div className="filter-section">
              <div className="filter-title">Colors</div>
              <div className="colors">
                {['red', 'blue', 'green', 'yellow', 'black', 'white', 'purple', 'orange', 'pink'].map((color) => (
                  <div
                    key={color}
                    className={`color ${color} ${selectedColors.includes(color) ? 'selected' : ''}`}
                    onClick={() => handleColorToggle(color)}
                  ></div>
                ))}
              </div>
            </div>
            <div className="filter-section">
              <div className="filter-title">Size</div>
              <div className="sizes">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button
                    key={size}
                    className={`size ${selectedSizes.includes(size) ? 'selected' : ''}`}
                    onClick={() => handleSizeToggle(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-section">
              <div className="filter-title">Dress Style</div>
              <div className="dress-styles">
                {['Casual', 'Formal', 'Party', 'Gym'].map((style) => (
                  <div
                    key={style}
                    className={`dress-style ${selectedDressStyles.includes(style) ? 'selected' : ''}`}
                    onClick={() => handleDressStyleToggle(style)}
                  >
                    {style} <BsChevronDown className="filter-arrow"/>
                  </div>
                ))}
              </div>
            </div>
            <button className="apply-filter">Apply Filter</button>
          </div>
        </div>
        <div className="product-grid">
          <div className="category-header">
            <div className="category-title">Casual</div>
            <div className="category-info">Showing 1-9 of 100 Products Sort by: Most Popular ▾</div>
          </div>
          <div className="products">
            {filteredProducts.map((product, index) => (
              <div className="product" key={index}>
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div className="product-rating">
                    {'★'.repeat(Math.floor(product.rating))}
                    {'☆'.repeat(5 - Math.floor(product.rating))}
                    <span className="rating-num">{product.rating.toFixed(1)}</span>
                  </div>
                  <div className="product-price">
                    ${product.price}
                    {product.oldPrice && <span className="old-price">${product.oldPrice}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button className="prev">← Previous</button>
            <div className="pages">
              <span className="page active">1</span>
              <span className="page">2</span>
              <span className="page">3</span>
              <span className="page">...</span>
              <span className="page">9</span>
            </div>
            <button className="next">Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;