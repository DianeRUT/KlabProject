"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { createOrder } from "../api/orderApi"
import "../styles/PaymentPage.css"

const PaymentPage = () => {
  const navigate = useNavigate()
  const { cartItems, subtotal, shipping, tax, total, clearCart } = useCart()

  const [paymentMethod, setPaymentMethod] = useState("creditCard")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Get shipping info from localStorage
  const [shippingInfo, setShippingInfo] = useState(null)

  useEffect(() => {
    const savedShippingInfo = localStorage.getItem("shippingInfo")
    if (!savedShippingInfo) {
      navigate("/checkout")
    } else {
      setShippingInfo(JSON.parse(savedShippingInfo))
    }

    // Check if cart is empty
    if (cartItems.length === 0) {
      navigate("/cart")
    }
  }, [cartItems, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (paymentMethod === "creditCard") {
      // Validate credit card info
      if (cardNumber.length < 16 || expiryDate.length < 5 || cvv.length < 3) {
        setError("Please enter valid card details")
        return
      }
    }

    setLoading(true)
    setError(null)

    try {
      // Create order object
      const orderData = {
        orderItems: cartItems.map((item) => ({
          product: item._id || item.product,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),
        shippingAddress: {
          address: shippingInfo.address,
          city: shippingInfo.city,
          postalCode: shippingInfo.postalCode,
          country: shippingInfo.country,
          phone: shippingInfo.phone,
        },
        paymentMethod,
        itemsPrice: subtotal,
        shippingPrice: shipping,
        taxPrice: tax,
        totalPrice: total,
      }

      // Send order to backend
      const createdOrder = await createOrder(orderData)

      // Clear cart
      await clearCart()

      // Clear shipping info
      localStorage.removeItem("shippingInfo")

      // Navigate to confirmation page with order ID
      navigate(`/confirmation?orderId=${createdOrder._id}`)
    } catch (err) {
      console.error("Error creating order:", err)
      setError(err.response?.data?.message || "Failed to process payment. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!shippingInfo) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="checkout-steps">
          <div className="step completed">
            <div className="step-number">1</div>
            <div className="step-title">Shipping</div>
          </div>
          <div className="step active">
            <div className="step-number">2</div>
            <div className="step-title">Payment</div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-title">Confirmation</div>
          </div>
        </div>

        <div className="payment-content">
          <div className="payment-form-container">
            <h2>Payment Method</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="payment-form">
              <div className="payment-methods">
                <div className="payment-method">
                  <input
                    type="radio"
                    id="creditCard"
                    name="paymentMethod"
                    value="creditCard"
                    checked={paymentMethod === "creditCard"}
                    onChange={() => setPaymentMethod("creditCard")}
                  />
                  <label htmlFor="creditCard">Credit Card</label>
                </div>

                <div className="payment-method">
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={() => setPaymentMethod("paypal")}
                  />
                  <label htmlFor="paypal">PayPal</label>
                </div>
              </div>

              {paymentMethod === "creditCard" && (
                <div className="credit-card-form">
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cardName">Name on Card</label>
                    <input
                      type="text"
                      id="cardName"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="expiryDate">Expiry Date</label>
                      <input
                        type="text"
                        id="expiryDate"
                        value={expiryDate}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "")
                          if (value.length <= 2) {
                            setExpiryDate(value)
                          } else {
                            setExpiryDate(`${value.slice(0, 2)}/${value.slice(2, 4)}`)
                          }
                        }}
                        placeholder="MM/YY"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "paypal" && (
                <div className="paypal-info">
                  <p>You will be redirected to PayPal to complete your payment.</p>
                </div>
              )}

              <div className="form-actions">
                <button type="button" className="back-btn" onClick={() => navigate("/checkout")}>
                  Back to Shipping
                </button>
                <button type="submit" className="place-order-btn" disabled={loading}>
                  {loading ? "Processing..." : "Place Order"}
                </button>
              </div>
            </form>
          </div>

          <div className="order-summary">
            <h2>Order Summary</h2>

            <div className="shipping-info-summary">
              <h3>Shipping To</h3>
              <p>
                {shippingInfo.firstName} {shippingInfo.lastName}
                <br />
                {shippingInfo.address}
                <br />
                {shippingInfo.city}, {shippingInfo.postalCode}
                <br />
                {shippingInfo.country}
                <br />
                {shippingInfo.phone}
              </p>
            </div>

            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <div className="item-name">{item.name}</div>
                    <div className="item-price">
                      {item.quantity} x ${item.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="total-row total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage

