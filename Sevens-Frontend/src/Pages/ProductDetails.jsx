import React, { useState, useEffect } from "react";
import '../Styles/ProductDetail.css'; 
import mainImage  from "../assets/Images/image main.png";
import thumbnail1 from "../assets/Images/image 24.png";
import thumbnail2 from "../assets/Images/image 25.png";
import thumbnail3 from "../assets/Images/image 23.png";
import polo1 from "../assets/Images/image 27.png";
import polo2 from "../assets/Images/image 26.png";
import polo3 from "../assets/Images/image 29.png";
import polo4 from "../assets/Images/image 28.png";

const ProductDetails = () => {
  const [selectedColor, setSelectedColor] = useState('green'); // Default color
  const [selectedSize, setSelectedSize] = useState('Large'); // Default size
  const [quantity, setQuantity] = useState(1);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantity(quantity + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="product-details">
      {/* ... (Product details section) */}

      <div className="breadcrumbs">
  Home &gt; Shop &gt; Man &gt; T-shirts
</div>
      <div className="product-content">
        <div className="image-gallery">
          <div className="thumbnails">
            <img src={thumbnail1} alt="Thumbnail 1" className="thumbnail" />
            <img src={thumbnail2} alt="Thumbnail 2" className="thumbnail" />
            <img src={thumbnail3} alt="Thumbnail 3" className="thumbnail" />
          </div>
          <div className="main-image">
            <img src={mainImage} alt="Main Product" />
          </div>
        </div>
        <div className="product-info">
          <h1 className="product-title">ONE LIFE GRAPHIC T-SHIRT</h1>
          <div className="rating">
            ★★★★☆ 4.5/5
          </div>
          <div className="price">
            $260 <span className="old-price">$300</span> <span className="discount">-40%</span>
          </div>
          <p className="description">
            This graphic t-shirt which is perfect for any occasion. Crafted from a soft and
            breathable fabric, it offers superior comfort and style.
          </p>
          <div className="color-selector">
            <p>Select Colors</p>
            <div className="colors">
              <div
                className={`color green ${selectedColor === 'green' ? 'selected' : ''}`}
                onClick={() => handleColorChange('green')}
              ></div>
              <div
                className={`color blue ${selectedColor === 'blue' ? 'selected' : ''}`}
                onClick={() => handleColorChange('blue')}
              ></div>
              <div
                className={`color navy ${selectedColor === 'navy' ? 'selected' : ''}`}
                onClick={() => handleColorChange('navy')}
              ></div>
            </div>
          </div>
          <div className="size-selector">
            <p>Choose Size</p>
            <div className="sizes">
              <button
                className={`size ${selectedSize === 'Small' ? 'selected' : ''}`}
                onClick={() => handleSizeChange('Small')}
              >
                Small
              </button>
              <button
                className={`size ${selectedSize === 'Medium' ? 'selected' : ''}`}
                onClick={() => handleSizeChange('Medium')}
              >
                Medium
              </button>
              <button
                className={`size ${selectedSize === 'Large' ? 'selected' : ''}`}
                onClick={() => handleSizeChange('Large')}
              >
                Large
              </button>
              <button
                className={`size ${selectedSize === 'X-Large' ? 'selected' : ''}`}
                onClick={() => handleSizeChange('X-Large')}
              >
                X-Large
              </button>
            </div>
          </div>
          <div className="quantity-selector">
            <button className="quantity-btn" onClick={() => handleQuantityChange('decrement')}>
              -
            </button>
            <span className="quantity">{quantity}</span>
            <button className="quantity-btn" onClick={() => handleQuantityChange('increment')}>
              +
            </button>
          </div>
          <button className="add-to-cart">Add to Cart</button>
        </div>
      </div>

      {/* Rating & Reviews Section */}
      <div className="reviews-section">
        <div className="reviews-header">
          <div className="tab-navigation">
            <button className="tab-button active">Product Details</button>
            <button className="tab-button active">Rating & Reviews</button>
            <button className="tab-button">FAQs</button>
          </div>
          <div className="reviews-filter">
            <select className="filter-select">
              <option value="latest">Latest</option>
              {/* Add more filter options */}
            </select>
            <button className="write-review-btn">Write a Review</button>
          </div>
        </div>
        <div className="all-reviews">
          <h2>All Reviews (20)</h2>
          <div className="review-cards">
            {/* Sample review cards - replace with dynamic data */}
            <div className="review-card">
              <div className="rating">★★★★★</div>
              <p className="reviewer">Samantha D.</p>
              <p className="review-text">"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to piece."</p>
              <p className="review-date">Posted on August 18, 2023</p>
            </div>
            <div className="review-card">
              <div className="rating">★★★★★</div>
              <p className="reviewer">Alex M.</p>
              <p className="review-text">"This t-shirt exceeded my expectations! The colors are vibrant and the print resists to top-notch. Being a t-shirt enthusiast myself, I'm quite picky about materials, and this one definitely gets a thumbs up from me!"</p>
              <p className="review-date">Posted on August 15, 2023</p>
            </div>
            <div className="review-card">
              <div className="rating">★★★★☆</div>
              <p className="reviewer">Ethan R.</p>
              <p className="review-text">"This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt."</p>
              <p className="review-date">Posted on August 16, 2023</p>
            </div>
            <div className="review-card">
              <div className="rating">★★★★☆</div>
              <p className="reviewer">Olivia P.</p>
              <p className="review-text">"This t-shirt represents value simplicity and functionality. The fabric not only maintains it's core principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out."</p>
              <p className="review-date">Posted on August 17, 2023</p>
            </div>
            <div className="review-card">
              <div className="rating">★★★★☆</div>
              <p className="reviewer">Liam N.</p>
              <p className="review-text">"This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design showcases the designer's talent. It's a statement piece, a wearable piece of art that reflects the current trends in the design of fashion."</p>
              <p className="review-date">Posted on August 16, 2023</p>
            </div>
            <div className="review-card">
              <div className="rating">★★★★★</div>
              <p className="reviewer">Ava H.</p>
              <p className="review-text">"You're not just wearing a t-shirt; You're wearing a piece of design philosophy. The way the fabric drapes and the thoughtful aspects of the design make this t-shirt a conversation starter."</p>
              <p className="review-date">Posted on August 18, 2023</p>
            </div>
          </div>
          <button className="load-more-btn">Load More Reviews</button>
        </div>
      </div>

      {/* You Might Also Like Section */}
      <div className="also-like-section">
        <h2>YOU MIGHT ALSO LIKE</h2>
        <div className="also-like-items">
          <div className="also-like-item">
            <img src={polo1} alt="Polo 1" />
            <p className="item-name">Polo with Contrast Trims</p>
            <div className="item-rating">★★★★☆ 4.0</div>
            <div className="item-price">$212 <span className="old-price">$242</span></div>
          </div>
          <div className="also-like-item">
            <img src={polo2} alt="Polo 2" />
            <p className="item-name">Gradient Graphic T-shirt</p>
            <div className="item-rating">★★★★☆ 4.5</div>
            <div className="item-price">$145</div>
          </div>
          <div className="also-like-item">
            <img src={polo3} alt="Polo 3" />
            <p className="item-name">Polo with Tipping Details</p>
            <div className="item-rating">★★★★★ 5.0</div>
            <div className="item-price">$180</div>
          </div>
          <div className="also-like-item">
            <img src={polo4} alt="Polo 4" />
            <p className="item-name">Black Striped T-shirt</p>
            <div className="item-rating">★★★★☆ 4.0</div>
            <div className="item-price">$120 <span className="old-price">$160</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;