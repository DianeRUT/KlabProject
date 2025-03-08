import React from "react";
import "../Styles/Footer.css";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="newsletter-section">
        <div className="newsletter-text">
          STAY UP TO DATE ABOUT
          <br />
          OUR LATEST OFFERS
        </div>
        <div className="newsletter-form">
          <div className="email-input">
            <input type="email" placeholder="Enter your email address" />
          </div>
          <button className="subscribe-button">Subscribe to Newsletter</button>
        </div>
      </div>
      <div className="footer-content">
        <div className="shop-info">
          <h3 className="shop-title">SEVENS</h3>
          <p className="shop-description">
            We have clothes that suits your style and which you're proud to wear. From women to men.
          </p>
          <div className="social-icons">
            <a href="#" className="social-icon">
              <i className="fab fa-twitter"></i> 
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h4>COMPANY</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Works</a></li>
              <li><a href="#">Career</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>HELP</h4>
            <ul>
              <li><a href="#">Customer Support</a></li>
              <li><a href="#">Delivery Details</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>FAQ</h4>
            <ul>
              <li><a href="#">Account</a></li>
              <li><a href="#">Manage Deliveries</a></li>
              <li><a href="#">Orders</a></li>
              <li><a href="#">Payments</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>RESOURCES</h4>
            <ul>
              <li><a href="#">Free eBooks</a></li>
              <li><a href="#">Development Tutorial</a></li>
              <li><a href="#">How to - Blog</a></li>
              <li><a href="#">Youtube Playlist</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;