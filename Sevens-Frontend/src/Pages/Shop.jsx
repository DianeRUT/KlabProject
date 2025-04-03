import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../Styles/Shop.css"; 
import { Search, ShoppingBag, Heart, User, ChevronLeft, ChevronRight } from 'lucide-react';

// Importing images
import MenShoes from '../assets/Images/58.jpg';
import WomenShoes from '../assets/Images/52.jpeg';
import SportCollection from '../assets/Images/22.jpeg';
import accessories from '../assets/Images/63.jpg';
import WhiteSneakers from '../assets/Images/64.jpg';
import HighHeels from '../assets/Images/26.jpeg';
import PerformanceRunners from '../assets/Images/24.jpeg';
import LeatherBoots from '../assets/Images/65.jpg';
import redAndBlackSneakers from '../assets/Images/41.jpeg';
import whiteSneakers from '../assets/Images/54.jpeg';
import whiteAndBlackSneakers from '../assets/Images/32.jpeg';
import blackSneakers from '../assets/Images/55.jpeg';


const ShopPage = () => {

 

  return (
    <>
      
    <div className="container">
     
        {/* Hero Section */}
<div className="heros-section">
  <div className="heros-content">
    <h1 className="heros-title">Step into Style</h1>
    <p className="heros-description">Discover the latest collection of footwear for every occasion</p>
    <div className="heros-buttons">
      <button className="btn btn-black">Shop Men</button>
      <button className="btn btn-pink">Shop Women</button>
    </div>
  </div>
  <div className="heros-image">
    <div className="image-grid">
      <img src={redAndBlackSneakers} alt="Red and black sneakers" className="grid-img" />
      <img src={whiteSneakers} alt="White sneakers" className="grid-img" />
      <img src={whiteAndBlackSneakers} alt="White and black sneakers" className="grid-img" />
      <img src={blackSneakers} alt="Black sneakers" className="grid-img" />
    </div>
  </div>
</div>

  {/* Featured Brands */}
  <div className="featured-section">
        <h2 className="section-title">Featured Brands</h2>
        <div className="brand-carousel">
          <div className="arrow-button">
            <ChevronLeft size={20} />
          </div>
          <div className="brands-icons">
            <div className="brands-icon">1</div>
            <div className="brands-icon">2</div>
            <div className="brands-icon">3</div>
            <div className="brands-icon">4</div>
            <div className="brands-icon">
              <img src="/api/placeholder/40/40" alt="Apple logo" className="icon-img" />
            </div>
            <div className="brands-icon">
              <img src="/api/placeholder/40/40" alt="Nike logo" className="icon-img" />
            </div>
          </div>
          <div className="arrow-button">
            <ChevronRight size={20} />
          </div>
        </div>
      </div>

      {/* New Arrivals */}
      <div className="arrivals-section">
        <h2 className="section-title">New Arrivals</h2>
        <div className="product-grid">
          {/* Product 1 */}
          <div className="product-card">
            <div className="product-image-container">
              <div className="wishlist-container">
                <Heart size={20} className="wishlist-icon" />
              </div>
              <img src={WhiteSneakers} alt="Classic White Sneakers" className="product-image" />
              <div className="product-navigation">
                <button className="nav-arrow-btn left">
                  <ChevronLeft size={18} />
                </button>
                <button className="nav-arrow-btn right">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            <h3 className="product-title">Classic White Sneakers</h3>
            <div className="product-price">$129.95</div>
          </div>

          {/* Product 2 */}
          <div className="product-card">
            <div className="product-image-container">
              <div className="wishlist-container">
                <Heart size={20} className="wishlist-icon" />
              </div>
              <img src={HighHeels} alt="Designer High Heels" className="product-image" />
              <div className="product-navigation">
                <button className="nav-arrow-btn left">
                  <ChevronLeft size={18} />
                </button>
                <button className="nav-arrow-btn right">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            <h3 className="product-title">Designer High Heels</h3>
            <div className="product-price">$199.95</div>
          </div>

          {/* Product 3 */}
          <div className="product-card">
            <div className="product-image-container">
              <div className="wishlist-container">
                <Heart size={20} className="wishlist-icon" />
              </div>
              <img src={PerformanceRunners} alt="Performance Runners" className="product-image" />
              <div className="product-navigation">
                <button className="nav-arrow-btn left">
                  <ChevronLeft size={18} />
                </button>
                <button className="nav-arrow-btn right">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            <h3 className="product-title">Performance Runners</h3>
            <div className="product-price">$139.95</div>
          </div>

          {/* Product 4 */}
          <div className="product-card">
            <div className="product-image-container">
              <div className="wishlist-container">
                <Heart size={20} className="wishlist-icon" />
              </div>
              <img src={LeatherBoots} alt="Classic Leather Boots" className="product-image" />
              <div className="product-navigation">
                <button className="nav-arrow-btn left">
                  <ChevronLeft size={18} />
                </button>
                <button className="nav-arrow-btn right">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            <h3 className="product-title">Classic Leather Boots</h3>
            <div className="product-price">$159.95</div>
          </div>
        </div>
      </div>

      {/* Shop by Category */}
      <div className="category-section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="category-grid">
          <div className="category-card">
            <img src={MenShoes} alt="Men's Shoes" className="category-image" />
            <div className="category-overlay">
              <span className="category-name">Men</span>
            </div>
          </div>

          <div className="category-card">
            <img src={WomenShoes} alt="Women's Shoes" className="category-image" />
            <div className="category-overlay">
              <span className="category-name">Women</span>
            </div>
          </div>

          <div className="category-card">
            <img src={SportCollection} alt="Sport Collection" className="category-image" />
            <div className="category-overlay">
              <span className="category-name">Sport Collection</span>
            </div>
          </div>

          <div className="category-card">
            <img src={accessories} alt="Accessories" className="category-image" />
            <div className="category-overlay">
              <span className="category-name">Accessories</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ShopPage;
