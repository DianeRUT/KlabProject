"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../components/ProtectedRoute"
import { getUserProfile } from "../api/userApi"
import "../styles/CheckoutPage.css"

const CheckoutPage = () => {
  const navigate = useNavigate()
  const { cartItems, subtotal, shipping, tax, total } = useCart()
  const { isAuthenticated, userInfo } = useAuth()

  // Form states
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [country, setCountry] = useState("")
  const [phone, setPhone] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load user profile data if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const fetchUserProfile = async () => {
        try {
          const userData = await getUserProfile()

          // Split name into first and last name
          const nameParts = userData.name.split(" ")
          setFirstName(nameParts[0] || "")
          setLastName(nameParts.slice(1).join(" ") || "")

          setEmail(userData.email || "")

          // Set shipping address if available
          if (userData.shippingAddress) {
            setAddress(userData.shippingAddress.address || "")
            setCity(userData.shippingAddress.city || "")
            setPostalCode(userData.shippingAddress.postalCode || "")
            setCountry(userData.shippingAddress.country || "")
            setPhone(userData.shippingAddress.phone || "")
          }
        } catch (err) {
          console.error("Error fetching user profile:", err)
        }
      }

      fetchUserProfile()
    }
  }, [isAuthenticated])

  // Check if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart")
    }
  }, [cartItems, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()

    // Save shipping info to localStorage
    const shippingInfo = {
      firstName,
      lastName,
      email,
      address,
      city,
      postalCode,
      country,
      phone,
    }

    localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo))

    // Navigate to payment page
    navigate("/payment")
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading checkout...</p>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-steps">
          <div className="step active">
            <div className="step-number">1</div>
            <div className="step-title">Shipping</div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-title">Payment</div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-title">Confirmation</div>
          </div>
        </div>

        <div className="checkout-content">
          <div className="shipping-form-container">
            <h2>Shipping Information</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="shipping-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
                </div>

                <div className="form-group">
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    type="text"
                    id="postalCode"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="back-btn" onClick={() => navigate("/cart")}>
                  Back to Cart
                </button>
                <button type="submit" className="continue-btn">
                  Continue to Payment
                </button>
              </div>
            </form>
          </div>

          <div className="order-summary">
            <h2>Order Summary</h2>

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

export default CheckoutPage

