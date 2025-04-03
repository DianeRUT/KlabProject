

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../Context/AuthContext";
import "../styles/AdminPage.css"

const AdminPage = () => {
  const { currentUser } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    // Load data from localStorage
    setProducts(JSON.parse(localStorage.getItem("products") || "[]"))
    setOrders(JSON.parse(localStorage.getItem("orders") || "[]"))
    setUsers(
      JSON.parse(localStorage.getItem("users") || "[]").map((user) => {
        // Remove passwords for security
        const { password, ...userWithoutPassword } = user
        return userWithoutPassword
      }),
    )
  }, [])

  // Dashboard stats
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0)
  const totalOrders = orders.length
  const totalUsers = users.length
  const totalProducts = products.length

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="container">
          <h1>Admin Dashboard</h1>
          <p>Welcome, {currentUser.name}!</p>
        </div>
      </div>

      <div className="container">
        <div className="admin-content">
          <div className="admin-sidebar">
            <div className="admin-nav">
              <button
                className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
                onClick={() => setActiveTab("dashboard")}
              >
                <i className="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </button>

              <button
                className={`nav-item ${activeTab === "products" ? "active" : ""}`}
                onClick={() => setActiveTab("products")}
              >
                <i className="fas fa-box"></i>
                <span>Products</span>
              </button>

              <button
                className={`nav-item ${activeTab === "orders" ? "active" : ""}`}
                onClick={() => setActiveTab("orders")}
              >
                <i className="fas fa-shopping-cart"></i>
                <span>Orders</span>
              </button>

              <button
                className={`nav-item ${activeTab === "users" ? "active" : ""}`}
                onClick={() => setActiveTab("users")}
              >
                <i className="fas fa-users"></i>
                <span>Users</span>
              </button>

              <Link to="/profile" className="nav-item">
                <i className="fas fa-user"></i>
                <span>My Profile</span>
              </Link>

              <Link to="/" className="nav-item">
                <i className="fas fa-home"></i>
                <span>Back to Store</span>
              </Link>
            </div>
          </div>

          <div className="admin-main">
            {activeTab === "dashboard" && (
              <div className="dashboard-tab">
                <h2>Dashboard Overview</h2>

                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon sales">
                      <i className="fas fa-dollar-sign"></i>
                    </div>
                    <div className="stat-details">
                      <h3>Total Sales</h3>
                      <p className="stat-value">${totalSales.toFixed(2)}</p>
                      <p className="stat-period">All time</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon orders">
                      <i className="fas fa-shopping-bag"></i>
                    </div>
                    <div className="stat-details">
                      <h3>Total Orders</h3>
                      <p className="stat-value">{totalOrders}</p>
                      <p className="stat-period">All time</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon users">
                      <i className="fas fa-users"></i>
                    </div>
                    <div className="stat-details">
                      <h3>Total Users</h3>
                      <p className="stat-value">{totalUsers}</p>
                      <p className="stat-period">Registered accounts</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon products">
                      <i className="fas fa-box"></i>
                    </div>
                    <div className="stat-details">
                      <h3>Total Products</h3>
                      <p className="stat-value">{totalProducts}</p>
                      <p className="stat-period">Active listings</p>
                    </div>
                  </div>
                </div>

                <div className="dashboard-sections">
                  <div className="recent-orders">
                    <div className="section-header">
                      <h3>Recent Orders</h3>
                      <button className="view-all-btn" onClick={() => setActiveTab("orders")}>
                        View All
                      </button>
                    </div>

                    {orders.length === 0 ? (
                      <p className="no-data">No orders yet</p>
                    ) : (
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.slice(0, 5).map((order) => (
                            <tr key={order.id}>
                              <td>#{order.id}</td>
                              <td>{new Date(order.date).toLocaleDateString()}</td>
                              <td>
                                {order.shippingInfo?.firstName} {order.shippingInfo?.lastName}
                              </td>
                              <td>${order.total.toFixed(2)}</td>
                              <td>
                                <span className="status-badge">Delivered</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>

                  <div className="top-products">
                    <div className="section-header">
                      <h3>Top Products</h3>
                      <button className="view-all-btn" onClick={() => setActiveTab("products")}>
                        View All
                      </button>
                    </div>

                    {products.length === 0 ? (
                      <p className="no-data">No products yet</p>
                    ) : (
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Sales</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.slice(0, 5).map((product) => (
                            <tr key={product.id}>
                              <td className="product-cells">
                                <div className="product-infos">
                                  <img src={product.image || "/placeholder.svg"} alt={product.name} />
                                  <span>{product.name}</span>
                                </div>
                              </td>
                              <td>${product.price.toFixed(2)}</td>
                              <td>In Stock</td>
                              <td>24 units</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "products" && (
              <div className="products-tab">
                <div className="tab-header">
                  <h2>Products Management</h2>
                  <button className="add-new-btn">
                    <i className="fas fa-plus"></i> Add New Product
                  </button>
                </div>

                <div className="filter-bar">
                  <div className="search-box">
                    <input type="text" placeholder="Search products..." />
                    <button>
                      <i className="fas fa-search"></i>
                    </button>
                  </div>

                  <div className="filter-options">
                    <select>
                      <option value="">All Categories</option>
                      <option value="shoes">Shoes</option>
                      <option value="clothes">Clothes</option>
                      <option value="accessories">Accessories</option>
                    </select>

                    <select>
                      <option value="">All Brands</option>
                      <option value="nike">Nike</option>
                      <option value="jordan">Jordan</option>
                      <option value="versace">Versace</option>
                    </select>

                    <select>
                      <option value="">Sort By</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="name-asc">Name: A to Z</option>
                      <option value="name-desc">Name: Z to A</option>
                    </select>
                  </div>
                </div>

                {products.length === 0 ? (
                  <div className="empty-state">
                    <i className="fas fa-box-open"></i>
                    <p>No products found</p>
                    <button className="add-new-btn">Add Your First Product</button>
                  </div>
                ) : (
                  <table className="data-table products-table">
                    <thead>
                      <tr>
                        <th>
                          <input type="checkbox" />
                        </th>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td className="product-cell">
                            <div className="product-info">
                              <img src={product.image || "/placeholder.svg"} alt={product.name} />
                              <span>{product.name}</span>
                            </div>
                          </td>
                          <td>{product.category}</td>
                          <td>{product.brand}</td>
                          <td>${product.price.toFixed(2)}</td>
                          <td>
                            <span className="status-badge active">Active</span>
                          </td>
                          <td className="actions-cell">
                            <button className="action-btn edit">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="action-btn delete">
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                <div className="pagination">
                  <button className="pagination-btn" disabled>
                    Previous
                  </button>
                  <button className="pagination-btn active">1</button>
                  <button className="pagination-btn">2</button>
                  <button className="pagination-btn">3</button>
                  <button className="pagination-btn">Next</button>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="orders-tab">
                <h2>Orders Management</h2>

                <div className="filter-bar">
                  <div className="search-box">
                    <input type="text" placeholder="Search orders..." />
                    <button>
                      <i className="fas fa-search"></i>
                    </button>
                  </div>

                  <div className="filter-options">
                    <select>
                      <option value="">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <select>
                      <option value="">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="year">This Year</option>
                    </select>
                  </div>
                </div>

                {orders.length === 0 ? (
                  <div className="empty-state">
                    <i className="fas fa-shopping-cart"></i>
                    <p>No orders found</p>
                  </div>
                ) : (
                  <table className="data-table orders-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td>#{order.id}</td>
                          <td>{new Date(order.date).toLocaleDateString()}</td>
                          <td>
                            {order.shippingInfo?.firstName} {order.shippingInfo?.lastName}
                          </td>
                          <td>{order.items.length} items</td>
                          <td>${order.total.toFixed(2)}</td>
                          <td>
                            <span className="status-badge">Delivered</span>
                          </td>
                          <td className="actions-cell">
                            <button className="action-btn view">
                              <i className="fas fa-eye"></i>
                            </button>
                            <button className="action-btn edit">
                              <i className="fas fa-edit"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                <div className="pagination">
                  <button className="pagination-btn" disabled>
                    Previous
                  </button>
                  <button className="pagination-btn active">1</button>
                  <button className="pagination-btn">Next</button>
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div className="users-tab">
                <h2>Users Management</h2>

                <div className="filter-bar">
                  <div className="search-box">
                    <input type="text" placeholder="Search users..." />
                    <button>
                      <i className="fas fa-search"></i>
                    </button>
                  </div>

                  <div className="filter-options">
                    <select>
                      <option value="">All Roles</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </div>

                {users.length === 0 ? (
                  <div className="empty-state">
                    <i className="fas fa-users"></i>
                    <p>No users found</p>
                  </div>
                ) : (
                  <table className="data-table users-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Joined</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>#{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`role-badge ${user.role}`}>
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </span>
                          </td>
                          <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                          <td className="actions-cell">
                            <button className="action-btn view">
                              <i className="fas fa-eye"></i>
                            </button>
                            <button className="action-btn edit">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="action-btn delete">
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage

