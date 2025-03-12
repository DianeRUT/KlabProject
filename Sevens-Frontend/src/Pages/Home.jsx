import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/Home.css";
import "../Components/Brand.jsx";
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import Brand from "../Components/Brand.jsx";
import fashionImage from "../assets/Images/image1.png";
import Star1 from "../assets/Images/star1.png"
import Star2 from "../assets/Images/star2.png"
import image8 from "../assets/Images/image 8.png"
import image12 from "../assets/Images/image12.png"
import image13 from "../assets/Images/image13.png"
import image14 from "../assets/Images/image14.png"
import image7 from "../assets/Images/image 7.png"
import image15 from "../assets/Images/image 15.png"
import image17 from "../assets/Images/polo5.png"
import image16 from "../assets/Images/image 16.png"

const Hero = () => (
  <section className="hero">
    <div className="hero-text">
      <h1>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
      <p className="slogan">
        Browse through our diverse range of meticulously crafted garments, 
        designed to bring out your individuality and cater to your sense of style.
      </p>
      <Link to="/shop" className="shops-now-btn">Shop Now</Link>
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

const TopSelling = () => {
  const [topSellingProducts, setTopSellingProducts] = useState([]);

  useEffect(() => {
    // Simulating a database fetch
    setTopSellingProducts([
      { id: 1, name: "Denim Jacket", image: image7, price: 150, rating: 4.5 },
      { id: 2, name: "Casual Hoodie", image: image15, price: 180, oldPrice: 200, discount: 10, rating: 4 },
      { id: 3, name: "Leather Boots", image: image16, price: 300, rating: 4.8 },
      { id: 4, name: "Slim Fit Trousers", image: image17, price: 210, oldPrice: 230, discount: 15, rating: 4.2 },
    ]);
  }, []);

  return (
    <section className="top-selling">
      <h2 className="section-title">TOP SELLING</h2>
      <div className="items-grid">
        {topSellingProducts.map((product) => (
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


const HappyCustomers = () => {
  const [startIndex, setStartIndex] = useState(0);

  const customers = [
    {
      name: 'Sarah M.',
      rating: 5,
      message:
        "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    },
    {
      name: 'Alex K.',
      rating: 4,
      message:
        "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
    },
    {
      name: 'James L.',
      rating: 5,
      message:
        "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
    },
    // Add more customer testimonials here (9 or more)
    {
        name: 'Emily R.',
        rating: 4,
        message: "Shop.co has completely transformed my wardrobe! The quality is outstanding and the styles are always on trend. Highly recommended!"
    },
    {
        name: 'David P.',
        rating: 3,
        message: "Good variety of clothes, but shipping took longer than expected. Overall, I'm satisfied with my purchase."
    },
    {
        name: 'Jessica T.',
        rating: 5,
        message: "Absolutely love the clothes from Shop.co! The materials are top-notch and the designs are stylish. Will definitely be a repeat customer."
    },
    {
        name: 'Michael B.',
        rating: 4,
        message: "Impressed with the selection and quality of clothing. The prices are reasonable and the customer service is excellent."
    },
    {
        name: 'Olivia G.',
        rating: 5,
        message: "Shop.co is my go-to for all my fashion needs. The clothes are comfortable, stylish, and of great quality. Couldn't be happier!"
    },
    {
        name: 'Daniel S.',
        rating: 3,
        message: "Decent clothing options, but some items didn't fit as expected. Make sure to check the size chart carefully."
    },
  ];

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 1, customers.length - 3));
  };

  const visibleCustomers = customers.slice(startIndex, startIndex + 3);

  return (
    <section className="happy-customers">
      <div className="title-container">
        
        <h2>OUR HAPPY CUSTOMERS</h2>
        <div className="arrow-container">
    <FaArrowLeft className="arrow" onClick={handlePrev} />
    <FaArrowRight className="arrow" onClick={handleNext} />
  </div>
      </div>
      <div className="testimonials">
        {visibleCustomers.map((customer, index) => (
          <div key={index} className="testimonial">
            <div className="rating">
              {'★'.repeat(customer.rating)}
              {'☆'.repeat(5 - customer.rating)}
            </div>
            <div className="customer-info">
              <span className="name">
                {customer.name}
                <FaCheckCircle className="check-icon" />
              </span>
            </div>
            <p className="message">"{customer.message}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};




const HomeSections = () => (
  <>
    <NewArrivals />
    <TopSelling />
   
    {/* Browse by Dress Style */}
    <div className="dress-styles-container">
      <div className="section-title">BROWSE BY DRESS STYLE</div>
      <div className="styles-grid">
        <div className="style-item-casual">
          <div className="casual-image"></div>
          <div className="style-label">Casual</div>
        </div>
        <div className="style-item-formal">
          <div className=" formal-image"></div>
          <div className="style-label">Formal</div>
        </div>
        <div className="style-item-party">
          <div className=" party-image"></div>
          <div className="style-label">Party</div>
        </div>
        <div className="style-item-gym">
          <div className=" gym-image"></div>
          <div className="style-label">Gym</div>
        </div>
      </div>
    </div>

    <HappyCustomers/>
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
