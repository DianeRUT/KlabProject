"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../Context/AuthContext";
import "../styles/ProfilePage.css"

const ProfilePage = () => {
  const { currentUser, logout } = useAuth()
  const [orders, setOrders] = useState([])
  const [activeTab, setActiveTab] = useState("orders")

  useEffect(() => {
    // Load user's orders from localStorage
    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    // Filter orders for current user (in a real app, this would be done on the server)
    const userOrders = allOrders.filter((order) => order.userId === currentUser.id)
    setOrders(userOrders)
  }, [currentUser.id])

  const handleLogout = () => {
    logout()
    // Navigate is handled by the App component based on auth state
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <h1>My Account</h1>
          <p>Welcome back, {currentUser.name}!</p>
        </div>

        <div className="profile-content">
          <div className="profile-sidebar">
            <div className="user-info">
              <div className="user-avatar">
                <span>{currentUser.name.charAt(0)}</span>
              </div>
              <div className="user-details">
                <h3>{currentUser.name}</h3>
                <p>{currentUser.email}</p>
                <span className="user-role">{currentUser.role}</span>
              </div>
            </div>

            <div className="profile-nav">
              <button
                className={`nav-item ${activeTab === "orders" ? "active" : ""}`}
                onClick={() => setActiveTab("orders")}
              >
                <i className="fas fa-shopping-bag"></i>
                <span>My Orders</span>
              </button>

              <button
                className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
                onClick={() => setActiveTab("settings")}
              >
                <i className="fas fa-cog"></i>
                <span>Account Settings</span>
              </button>

              <button
                className={`nav-item ${activeTab === "addresses" ? "active" : ""}`}
                onClick={() => setActiveTab("addresses")}
              >
                <i className="fas fa-map-marker-alt"></i>
                <span>Addresses</span>
              </button>

              <button
                className={`nav-item ${activeTab === "wishlist" ? "active" : ""}`}
                onClick={() => setActiveTab("wishlist")}
              >
                <i className="fas fa-heart"></i>
                <span>Wishlist</span>
              </button>

              {currentUser.role === "admin" && (
                <Link to="/admin" className="nav-item">
                  <i className="fas fa-user-shield"></i>
                  <span>Admin Panel</span>
                </Link>
              )}

              <button className="nav-item logout" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </button>
            </div>
          </div>

          <div className="profile-main">
            {activeTab === "orders" && (
              <div className="orders-tab">
                <h2>My Orders</h2>

                {orders.length === 0 ? (
                  <div className="empty-state">
                    <i className="fas fa-shopping-bag"></i>
                    <p>You haven't placed any orders yet.</p>
                    <Link to="/products" className="shop-now-btn">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="orders-list">
                    {orders.map((order) => (
                      <div key={order.id} className="order-card">
                        <div className="order-header">
                          <div>
                            <h3>Order #{order.id}</h3>
                            <p className="order-date">{new Date(order.date).toLocaleDateString()}</p>
                          </div>
                          <div className="order-status">
                            <span className="status-badge">Delivered</span>
                          </div>
                        </div>

                        <div className="order-items">
                          {order.items.map((item) => (
                            <div key={item.id} className="order-item">
                              <div className="item-image">
                                <img src={item.image || "/placeholder.svg"} alt={item.name} />
                              </div>
                              <div className="item-details">
                                <h4>{item.name}</h4>
                                <p>Quantity: {item.quantity}</p>
                                <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="order-footer">
                          <div className="order-total">
                            <span>Total:</span>
                            <span className="total-amount">${order.total.toFixed(2)}</span>
                          </div>
                          <div className="order-actions">
                            <button className="view-details-btn">View Details</button>
                            <button className="reorder-btn">Reorder</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="settings-tab">
                <h2>Account Settings</h2>
                <p className="tab-description">Manage your account details and preferences.</p>

                <form className="settings-form">
                  <div className="form-section">
                    <h3>Personal Information</h3>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" defaultValue={currentUser.name} />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" defaultValue={currentUser.email} />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="tel" id="phone" placeholder="Add phone number" />
                      </div>

                      <div className="form-group">
                        <label htmlFor="birthday">Date of Birth</label>
                        <input type="date" id="birthday" />
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h3>Password</h3>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="currentPassword">Current Password</label>
                        <input type="password" id="currentPassword" />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <input type="password" id="newPassword" />
                      </div>

                      <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <input type="password" id="confirmPassword" />
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h3>Preferences</h3>

                    <div className="form-group checkbox-group">
                      <label className="checkbox-label">
                        <input type="checkbox" defaultChecked />
                        <span>Receive email notifications about orders</span>
                      </label>
                    </div>

                    <div className="form-group checkbox-group">
                      <label className="checkbox-label">
                        <input type="checkbox" defaultChecked />
                        <span>Receive promotional emails and offers</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="save-btn">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="addresses-tab">
                <h2>My Addresses</h2>
                <p className="tab-description">Manage your shipping and billing addresses.</p>

                <div className="addresses-container">
                  <div className="address-card add-new">
                    <div className="add-icon">
                      <i className="fas fa-plus"></i>
                    </div>
                    <p>Add New Address</p>
                  </div>

                  <div className="address-card">
                    <div className="address-header">
                      <h3>Home</h3>
                      <span className="default-badge">Default</span>
                    </div>
                    <div className="address-content">
                      <p>John Doe</p>
                      <p>123 Main Street</p>
                      <p>Apt 4B</p>
                      <p>New York, NY 10001</p>
                      <p>United States</p>
                      <p>Phone: (123) 456-7890</p>
                    </div>
                    <div className="address-actions">
                      <button className="edit-btn">Edit</button>
                      <button className="delete-btn">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="wishlist-tab">
                <h2>My Wishlist</h2>

                <div className="empty-state">
                  <i className="fas fa-heart"></i>
                  <p>Your wishlist is empty.</p>
                  <Link to="/products" className="shop-now-btn">
                    Discover Products
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

