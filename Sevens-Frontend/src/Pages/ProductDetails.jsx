import React from "react";
import "../Styles/ProductDetail.css";

const ProductDetail = () => {
  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-image">
          <img src="https://via.placeholder.com/500" alt="Product" />
        </div>
        <div className="product-info">
          <h1>Product Title</h1>
          <p className="price">$49.99</p>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in
            sapien nec nulla luctus dictum non in ligula. Fusce efficitur
            sollicitudin libero.
          </p>
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
