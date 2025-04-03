import React from 'react';
import { useCart } from './CartContext';

const Cart = () => {
  const { cartItems, isCartOpen, setIsCartOpen } = useCart();

  return (
    <div className={`cart-container ${isCartOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <button onClick={() => setIsCartOpen(false)}>×</button>
      </div>
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={`${item.id}-${JSON.stringify(item.options)}`} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="item-info">
              <h4>{item.name}</h4>
              {item.options.color && <div>Color: {item.options.color}</div>}
              <div>Quantity: {item.quantity}</div>
              <div>Price: ${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total">
        Total: ${cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
      </div>
    </div>
  );
};

export default Cart;