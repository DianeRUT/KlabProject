import React, { useState, useEffect } from "react";
import "../Styles/Home.css";
import "../Components/Brand.jsx";
import Brand from "../Components/Brand.jsx";
import fashionImage from "../assets/Images/image1.png";
import Star1 from "../assets/Images/star1.png"
import Star2 from "../assets/Images/star2.png"
import image8 from "../assets/Images/image 8.png"
import image12 from "../assets/Images/image12.png"
import image13 from "../assets/Images/image13.png"
import image14 from "../assets/Images/image14.png"


const Hero = () => (
  <section className="hero">
    <div className="hero-text">
      <h1>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
      <p className="slogan">
        Browse through our diverse range of meticulously crafted garments, 
        designed to bring out your individuality and cater to your sense of style.
      </p>
      <button className="shop-now-btn">Shop Now</button>
      <div className="stats">
        <div className="stat-item">
          <span>200+</span>
          <p className="brandss">International Brands</p>
        </div>
        <div className="stat-item">
          <span>7k+</span>
          <p className="brandss">High-Quality Products</p>
        </div>
        <div className="stat-item">
          <span>30,000+</span>
          <p className="brandss">Happy Customers</p>
        </div>
      </div>
    </div>
    <div className="hero-image">
      
      <img src={fashionImage} alt="Fashion" />
      <img src={Star1} alt="Logo" className="star-logo" />
      <img src={Star2} alt="Logo" className="star-logo1" />
    </div>
  </section>
);

const NewArrivals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulating a database fetch
    setProducts([
      { id: 1, name: "T-shirt with Tape Details", image: image8, price: 120, rating: 4.5 },
      { id: 2, name: "Skinny Fit Jeans", image: image12, price: 240, oldPrice: 260, discount: 20, rating: 3.5 },
      { id: 3, name: "Checkered Shirt", image: image13, price: 180, rating: 4.5 },
      { id: 4, name: "Sleeve Striped T-shirt", image: image14, price: 130, oldPrice: 160, discount: 30, rating: 4.5 },
    ]);
  }, []);

  return (
    <section className="new-arrivals">
      <h2 className="section-title">NEW ARRIVALS</h2>
      <div className="items-grid">
        {products.map((product) => (
          <div key={product.id} className="item">
            <img src={product.image} alt={product.name} />
            <p className="product-name">{product.name}</p>
            <div className="star-rating">
              {"★".repeat(Math.floor(product.rating))}{"☆".repeat(5 - Math.floor(product.rating))}
              <span className="rating-text">{product.rating}/5</span>
            </div>
            <p className="price">
              <strong>${product.price}</strong>
              {product.oldPrice && <span className="old-price"> ${product.oldPrice}</span>}
              {product.discount && <span className="discount"> {product.discount}%</span>}
            </p>
          </div>
        ))}
      </div>
      <button className="view-all-btn">View All</button>
    </section>
  );
};

const HomeSections = () => (
  <>
    <NewArrivals />

    {/* Top Selling */}
    <section>
      <h2 className="section-title">TOP SELLING</h2>
      <div className="items-grid">
        <div className="item">
          <img src="https://via.placeholder.com/300" alt="Jeans 1" />
          <p>Blue Jeans</p>
        </div>
        <div className="item">
          <img src="https://via.placeholder.com/300" alt="Pants" />
          <p>Chino Pants</p>
        </div>
        <div className="item">
          <img src="https://via.placeholder.com/300" alt="Shorts" />
          <p>Shorts</p>
        </div>
        <div className="item">
          <img src="https://via.placeholder.com/300" alt="Skirt" />
          <p>Denim Skirt</p>
        </div>
      </div>
    </section>

    {/* Browse by Dress Style */}
    <section className="dress-style">
      <h2>BROWSE BY DRESS STYLE</h2>
      <div className="style-grid">
        <div className="style-item">
          <img src="https://via.placeholder.com/200" alt="Casual" />
          <p>Casual</p>
        </div>
        <div className="style-item">
          <img src="https://via.placeholder.com/200" alt="Formal" />
          <p>Formal</p>
        </div>
        <div className="style-item">
          <img src="https://via.placeholder.com/200" alt="Party" />
          <p>Party</p>
        </div>
        <div className="style-item">
          <img src="https://via.placeholder.com/200" alt="Gym" />
          <p>Gym</p>
        </div>
      </div>
    </section>

    {/* Happy Customers */}
    <section className="happy-customers">
      <h2>OUR HAPPY CUSTOMERS</h2>
      <div className="testimonials">
        <div className="testimonial">
          <img src="https://via.placeholder.com/80" alt="Customer 1" />
          <p>"Great quality and fast shipping!"</p>
        </div>
        <div className="testimonial">
          <img src="https://via.placeholder.com/80" alt="Customer 2" />
          <p>"I love the variety of styles available."</p>
        </div>
      </div>
    </section>
  </>
);

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <Brand />
      <HomeSections />
    </div>
  );
};

export default Home;
