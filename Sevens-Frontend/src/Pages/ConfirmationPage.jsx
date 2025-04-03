"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/ConfirmationPage.css"

const ConfirmationPage = () => {
  const [order, setOrder] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Get current order from localStorage
    const currentOrder = localStorage.getItem("currentOrder")

    if (!currentOrder) {
      navigate("/")
      return
    }

    setOrder(JSON.parse(currentOrder))
  }, [navigate])

  if (!order) {
    return null
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-header">
          <i className="fas fa-check-circle"></i>
          <h1>Order Confirmed!</h1>
          <p>Thank you for your purchase. Your order has been received.</p>
        </div>

        <div className="order-info">
          <div className="order-info-item">
            <span className="info-label">Order Number</span>
            <span className="info-value">{order.id}</span>
          </div>

          <div className="order-info-item">
            <span className="info-label">Date</span>
            <span className="info-value">{new Date(order.date).toLocaleDateString()}</span>
          </div>

          <div className="order-info-item">
            <span className="info-label">Total</span>
            <span className="info-value">${order.total.toFixed(2)}</span>
          </div>

          <div className="order-info-item">
            <span className="info-label">Payment Method</span>
            <span className="info-value">
              {order.paymentMethod === "credit-card" && "Credit Card"}
              {order.paymentMethod === "paypal" && "PayPal"}
              {order.paymentMethod === "apple-pay" && "Apple Pay"}
            </span>
          </div>
        </div>

        <div className="order-details">
          <h2>Order Details</h2>

          <div className="order-items">
            {order.items.map((item) => (
              <div key={item.id} className="order-item">
                <div className="item-image">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} />
                </div>

                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-brand">{item.brand}</p>
                  <p className="item-quantity">Quantity: {item.quantity}</p>
                </div>

                <div className="item-price">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="shipping-info">
            <h3>Shipping Information</h3>
            <p>
              {order.shippingInfo.firstName} {order.shippingInfo.lastName}
              <br />
              {order.shippingInfo.address}
              <br />
              {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}
              <br />
              {order.shippingInfo.country}
              <br />
              {order.shippingInfo.email}
              <br />
              {order.shippingInfo.phone}
            </p>
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationPage

