"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import AdminLayout from "../../Components/Admin/AdminLayout"
import { getOrderStats, getProductStats, getUserStats } from "../../api/adminApi"
import "../../styles/admin/DashboardPage.css"

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    recentOrders: [],
    lowStockProducts: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)

        // In a real implementation, you would fetch this data from your API
        // For now, we'll use mock data
        const orderStats = await getOrderStats()
        const productStats = await getProductStats()
        const userStats = await getUserStats()

        setStats({
          totalSales: orderStats.totalSales || 0,
          totalOrders: orderStats.totalOrders || 0,
          totalProducts: productStats.totalProducts || 0,
          totalUsers: userStats.totalUsers || 0,
          recentOrders: orderStats.recentOrders || [],
          lowStockProducts: productStats.lowStockProducts || [],
        })
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
        setError("Failed to load dashboard data")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <AdminLayout>
        <div className="loading-spinner">Loading dashboard data...</div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="error-message">{error}</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <h1>Dashboard</h1>

        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-icon sales">
              <i className="fas fa-dollar-sign"></i>
            </div>
            <div className="stat-details">
              <h3>Total Sales</h3>
              <p className="stat-value">${stats.totalSales.toFixed(2)}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orders">
              <i className="fas fa-shopping-bag"></i>
            </div>
            <div className="stat-details">
              <h3>Total Orders</h3>
              <p className="stat-value">{stats.totalOrders}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon products">
              <i className="fas fa-box"></i>
            </div>
            <div className="stat-details">
              <h3>Total Products</h3>
              <p className="stat-value">{stats.totalProducts}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon users">
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-details">
              <h3>Total Users</h3>
              <p className="stat-value">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="dashboard-sections">
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Recent Orders</h2>
              <Link to="/admin/orders" className="view-all">
                View All
              </Link>
            </div>

            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.length > 0 ? (
                    stats.recentOrders.map((order) => (
                      <tr key={order._id}>
                        <td>#{order._id.substring(0, 8)}</td>
                        <td>{order.user?.name || "Guest"}</td>
                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>${order.totalPrice.toFixed(2)}</td>
                        <td>
                          <span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span>
                        </td>
                        <td>
                          <Link to={`/admin/orders/${order._id}`} className="action-btn view">
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="no-data">
                        No recent orders
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2>Low Stock Products</h2>
              <Link to="/admin/products" className="view-all">
                View All
              </Link>
            </div>

            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.lowStockProducts.length > 0 ? (
                    stats.lowStockProducts.map((product) => (
                      <tr key={product._id}>
                        <td className="product-cell">
                          <img src={product.image || "/placeholder.svg"} alt={product.name} />
                          <span>{product.name}</span>
                        </td>
                        <td>{product.category}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>
                          <span className={`stock-badge ${product.countInStock <= 0 ? "out" : "low"}`}>
                            {product.countInStock <= 0 ? "Out of Stock" : `${product.countInStock} left`}
                          </span>
                        </td>
                        <td>
                          <Link to={`/admin/products/edit/${product._id}`} className="action-btn edit">
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="no-data">
                        No low stock products
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default DashboardPage

