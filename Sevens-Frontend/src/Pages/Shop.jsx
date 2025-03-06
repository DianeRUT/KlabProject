import React from "react";
import "../Styles/Shop.css";

const products = [
  { id: 1, name: "Product 1", price: "$29.99", image: "https://via.placeholder.com/300" },
  { id: 2, name: "Product 2", price: "$39.99", image: "https://via.placeholder.com/300" },
  { id: 3, name: "Product 3", price: "$49.99", image: "https://via.placeholder.com/300" },
  { id: 4, name: "Product 4", price: "$59.99", image: "https://via.placeholder.com/300" },
  { id: 5, name: "Product 5", price: "$69.99", image: "https://via.placeholder.com/300" },
  { id: 6, name: "Product 6", price: "$79.99", image: "https://via.placeholder.com/300" },
];

const Shop = () => {
  return (
    <div className="shop-page">
      <h1 className="page-title">Shop</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h2>{product.name}</h2>
              <p className="price">{product.price}</p>
              <button>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
