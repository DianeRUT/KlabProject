import React from 'react';
import '../Styles/Cart.css';
import { FaTrashAlt, FaPlus, FaMinus, FaArrowRight } from 'react-icons/fa'; 
import polo1 from '../assets/Images/image 26.png';
import shirt1 from '../assets/Images/image13.png';
import polo4 from '../assets/Images/image12.png';

const CartPage = () => {
  const cartItems = [
    {
      id: 1,
      name: 'Gradient Graphic T-shirt',
      size: 'Large',
      color: 'White',
      price: 145,
      image: polo1,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Checkered Shirt',
      size: 'Medium',
      color: 'Red',
      price: 180,
      image: shirt1,
      quantity: 1,
    },
    {
      id: 3,
      name: 'Skinny Fit Jeans',
      size: 'Large',
      color: 'Blue',
      price: 240,
      image: polo4,
      quantity: 1,
    },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = -113;
  const deliveryFee = 15;
  const total = subtotal + discount + deliveryFee;

  return (
    <div className="cart-page">
      <div className="header">
        Home &gt; Cart
      </div>
      <div className="cart-content">
        <div className="cart-items">
          <h1>YOUR CART</h1>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="item-details">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-info">
                  <div className="item-name">{item.name}</div>
                  <div className="item-size">Size: {item.size}</div>
                  <div className="item-color">Color: {item.color}</div>
                  <div className="item-price">${item.price}</div>
                </div>
              </div>
              <div className="item-actions">
                <button className="remove-item">
                  <FaTrashAlt />
                </button>
                <div className="quantity-control">
                  <button className="quantity-btn">
                    <FaMinus />
                  </button>
                  <span className="quantity">1</span>
                  <button className="quantity-btn">
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-item">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="summary-item">
            <span>Discount (-20%)</span>
            <span>${discount}</span>
          </div>
          <div className="summary-item">
            <span>Delivery Fee</span>
            <span>${deliveryFee}</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${total}</span>
          </div>
          <div className="promo-code">
            <input type="text" placeholder="Add promo code" />
            <button className="apply-promo">Apply</button>
          </div>
          <button className="checkout-btn">
            Go to Checkout <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;