import React from "react";
import "../Styles/Brand.css"; 
import versaceLogo from "../assets/Images/image.png";
import zaraLogo from "../assets/Images/image-1.png";
import gucciLogo from "../assets/Images/image 9.png";
import pradaLogo from "../assets/Images/image 10.png";
import calvinKleinLogo from "../assets/images/Image 11.png";

const Brand = () => (
  <section className="brands-container">
    <div className="brands">
      <img className="brand-icon" src={versaceLogo} alt="Versace" />
      <img className="brand-icon" src={zaraLogo} alt="Zara" />
      <img className="brand-icon" src={gucciLogo} alt="Gucci" />
      <img className="brand-icon" src={pradaLogo} alt="Prada" />
      <img className="brand-icon" src={calvinKleinLogo} alt="Calvin Klein" />
    </div>
  </section>
);

export default Brand;