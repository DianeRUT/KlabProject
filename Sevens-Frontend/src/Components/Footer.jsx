import React from "react";
import "../Styles/Footer.css";
const Footer = () => {
    return (
      <div className="footer-wrapper">
        {/* Subscription Section */}
        <div className="subscription-section">
          <div className="subscription-text">
            <h2>Stay up to date</h2>
            <p>Subscribe to get the latest updates and exclusive offers.</p>
          </div>
          <div className="subscription-form">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
  
        {/* Footer Section */}
        <footer className="footer-container">
          <div className="footer-left">
            <h2>Eventful</h2>
            <p>Your go-to platform for discovering and hosting events.</p>
            <div className="footer-social">
              <a href="#">F</a>
              <a href="#">T</a>
              <a href="#">I</a>
            </div>
          </div>
  
          <div className="footer-links">
            <div className="footer-column">
              <h3>Company</h3>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Support</h3>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    );
  };
  
  export default Footer;