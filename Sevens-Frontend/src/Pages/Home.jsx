import React from "react";
import "../Styles/Home.css";
import "../Components/Brand.jsx";
import Brand from "../Components/Brand.jsx";

const Hero = () => (
    <section className="hero">
      <div className="hero-text">
        <h1>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
        <p className="slogan">
          Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
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
        <img src="https://via.placeholder.com/500x600" alt="Fashion" />
      </div>
  
      {/* New Brands Section */}
      
    </section>
  );
  
 

const HomeSections = () => (
  <>
  
    {/* New Arrivals */}
    <section>
      <h2 className="section-title">NEW ARRIVALS</h2>
      <div className="items-grid">
        <div className="item">
          <img src="https://via.placeholder.com/300" alt="T-Shirt 1" />
          <p>Black T-Shirt</p>
        </div>
        <div className="item">
          <img src="https://via.placeholder.com/300" alt="Shirt 1" />
          <p>Checkered Shirt</p>
        </div>
        <div className="item">
          <img src="https://via.placeholder.com/300" alt="T-Shirt 2" />
          <p>Orange T-Shirt</p>
        </div>
        <div className="item">
          <img src="https://via.placeholder.com/300" alt="Shirt 2" />
          <p>Plaid Shirt</p>
        </div>
      </div>
    </section>

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

    {/* Dress Style */}
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
