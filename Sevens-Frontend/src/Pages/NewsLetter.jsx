import React from "react";
import "../Styles/Newsletter.css"; 
const Newsletter = () => {
    return(
<div className="newsletter-section">
        <h2 className="newsletter-title">STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>
        <div className="newsletter-input">
          <input type="email" placeholder="Enter your email address" />
          <button>Subscribe to Newsletter</button>
        </div>
      </div>
      )
      };
      export default Newsletter;