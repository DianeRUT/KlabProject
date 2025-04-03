"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import "../styles/PaymentPage.css"

const PaymentPage = () => {
  const { cart, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()

  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCardChange = (e) => {
    const { name, value } = e.target
    setCardData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when field is being edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (paymentMethod === "credit-card") {
      if (!cardData.cardNumber.trim()) {
        newErrors.cardNumber = "Card number is required"
      } else if (!/^\d{16}$/.test(cardData.cardNumber.replace(/\s/g, ""))) {
        newErrors.cardNumber = "Card number must be 16 digits"
      }

      if (!cardData.cardName.trim()) {
        newErrors.cardName = "Name on card is required"
      }

      if (!cardData.expiryDate.trim()) {
        newErrors.expiryDate = "Expiry date is required"
      } else if (!/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
        newErrors.expiryDate = "Expiry date must be in MM/YY format"
      }

      if (!cardData.cvv.trim()) {
        newErrors.cvv = "CVV is required"
      } else if (!/^\d{3,4}$/.test(cardData.cvv)) {
        newErrors.cvv = "CVV must be 3 or 4 digits"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsProcessing(true)

      // Simulate payment processing
      setTimeout(() => {
        // Save order to localStorage
        const order = {
          id: `ORD-${Date.now()}`,
          items: cart,
          total: totalPrice + totalPrice * 0.1,
          date: new Date().toISOString(),
          shippingInfo: JSON.parse(localStorage.getItem("shippingInfo") || "{}"),
          paymentMethod,
        }

        const orders = JSON.parse(localStorage.getItem("orders") || "[]")
        orders.push(order)
        localStorage.setItem("orders", JSON.stringify(orders))
        localStorage.setItem("currentOrder", JSON.stringify(order))

        // Clear cart
        clearCart()

        // Navigate to confirmation page
        navigate("/confirmation")
      }, 2000)
    }
  }

  if (cart.length === 0 && !isProcessing) {
    navigate("/")
    return null
  }

  // Get shipping info from localStorage
  const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo") || "{}")

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1>Payment</h1>

        <div className="payment-content">
          <div className="payment-form">
            <h2>Payment Method</h2>

            <div className="payment-methods">
              <label className={`payment-method ${paymentMethod === "credit-card" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit-card"
                  checked={paymentMethod === "credit-card"}
                  onChange={() => setPaymentMethod("credit-card")}
                />
                <i className="far fa-credit-card"></i>
                <span>Credit Card</span>
              </label>

              <label className={`payment-method ${paymentMethod === "paypal" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={() => setPaymentMethod("paypal")}
                />
                <i className="fab fa-paypal"></i>
                <span>PayPal</span>
              </label>

              <label className={`payment-method ${paymentMethod === "apple-pay" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="apple-pay"
                  checked={paymentMethod === "apple-pay"}
                  onChange={() => setPaymentMethod("apple-pay")}
                />
                <i className="fab fa-apple-pay"></i>
                <span>Apple Pay</span>
              </label>
            </div>

            {paymentMethod === "credit-card" && (
              <form onSubmit={handleSubmit} className="credit-card-form">
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.cardNumber}
                    onChange={handleCardChange}
                    className={errors.cardNumber ? "error" : ""}
                    maxLength="19"
                  />
                  {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="cardName">Name on Card</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    placeholder="John Doe"
                    value={cardData.cardName}
                    onChange={handleCardChange}
                    className={errors.cardName ? "error" : ""}
                  />
                  {errors.cardName && <span className="error-message">{errors.cardName}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={cardData.expiryDate}
                      onChange={handleCardChange}
                      className={errors.expiryDate ? "error" : ""}
                      maxLength="5"
                    />
                    {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={cardData.cvv}
                      onChange={handleCardChange}
                      className={errors.cvv ? "error" : ""}
                      maxLength="4"
                    />
                    {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                  </div>
                </div>

                <button type="submit" className="place-order-btn" disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Place Order"}
                </button>
              </form>
            )}

            {paymentMethod === "paypal" && (
              <div className="alternative-payment">
                <p>You will be redirected to PayPal to complete your payment.</p>
                <button onClick={handleSubmit} className="place-order-btn paypal" disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Pay with PayPal"}
                </button>
              </div>
            )}

            {paymentMethod === "apple-pay" && (
              <div className="alternative-payment">
                <p>You will be redirected to Apple Pay to complete your payment.</p>
                <button onClick={handleSubmit} className="place-order-btn apple-pay" disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Pay with Apple Pay"}
                </button>
              </div>
            )}
          </div>

          <div className="order-details">
            <h2>Order Details</h2>

            <div className="shipping-info">
              <h3>Shipping Information</h3>
              <p>
                {shippingInfo.firstName} {shippingInfo.lastName}
                <br />
                {shippingInfo.address}
                <br />
                {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                <br />
                {shippingInfo.country}
                <br />
                {shippingInfo.email}
                <br />
                {shippingInfo.phone}
              </p>
            </div>

            <div className="order-summary">
              <h3>Order Summary</h3>

              <div className="summary-items">
                {cart.map((item) => (
                  <div key={item.id} className="summary-item">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

                <div className="summary-row">
                  <span>Tax</span>
                  <span>${(totalPrice * 0.1).toFixed(2)}</span>
                </div>

                <div className="summary-row total">
                  <span>Total</span>
                  <span>${(totalPrice + totalPrice * 0.1).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage

