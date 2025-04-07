
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import AdminLayout from "../../Components/Admin/AdminLayout"
import { getOrders } from "../../api/orderApi"
import "../../styles/admin/OrdersPage.css"

const OrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filterStatus, setFilterStatus] = useState("")
  const [dateRange, setDateRange] = useState({ from: "", to: "" })

  useEffect(() => {
    fetchOrders()
  }, [currentPage, filterStatus, dateRange])

  const fetchOrders = async () => {
    try {
      setLoading(true)

      // In a real implementation, you would pass these filters to your API
      const params = {
        page: currentPage,
        status: filterStatus || undefined,
        from: dateRange.from || undefined,
        to: dateRange.to || undefined,
      }

      const data = await getOrders(params)

      if (data) {
        setOrders(data)
        // Assuming the API returns pagination info
        setTotalPages(Math.ceil(data.length / 10) || 1)
      } else {
        setOrders([])
        setTotalPages(1)
      }
    } catch (err) {
      console.error("Error fetching orders:", err)
      setError("Failed to load orders")
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value)
    setCurrentPage(1)
  }

  const handleDateChange = (e) => {
    const { name, value } = e.target
    setDateRange({ ...dateRange, [name]: value })
    setCurrentPage(1)
  }

  const getStatusClass = (status) => {
    // Add a null check before calling toLowerCase()
    if (!status) return "" // Return empty string for undefined/null status

    switch (status.toLowerCase()) {
      case "paid":
        return "status-paid"
      case "processing":
        return "status-processing"
      case "shipped":
        return "status-shipped"
      case "delivered":
        return "status-delivered"
      case "cancelled":
        return "status-cancelled"
      default:
        return ""
    }
  }

  return (
    <AdminLayout>
      <div className="admin-orders">
        <div className="page-header">
          <h1>Orders</h1>
        </div>

        <div className="filters-bar">
          <div className="filter-group">
            <label>Status:</label>
            <select value={filterStatus} onChange={handleStatusChange}>
              <option value="">All Statuses</option>
              <option value="paid">Paid</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="filter-group date-filter">
            <label>Date Range:</label>
            <input type="date" name="from" value={dateRange.from} onChange={handleDateChange} />
            <span>to</span>
            <input type="date" name="to" value={dateRange.to} onChange={handleDateChange} />
          </div>

          <button
            className="reset-btn"
            onClick={() => {
              setFilterStatus("")
              setDateRange({ from: "", to: "" })
            }}
          >
            Reset Filters
          </button>
        </div>

        {loading ? (
          <div className="loading-spinner">Loading orders...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="admin-table orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <tr key={order._id}>
                        <td>#{order._id.substring(0, 8)}</td>
                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>{order.user?.name || "Guest"}</td>
                        <td>${order.totalPrice.toFixed(2)}</td>
                        <td>
                          {order.isPaid ? (
                            <span className="payment-status paid">
                              <i className="fas fa-check-circle"></i> Paid
                            </span>
                          ) : (
                            <span className="payment-status unpaid">
                              <i className="fas fa-times-circle"></i> Unpaid
                            </span>
                          )}
                        </td>
                        <td>
                          <span className={`status-badge ${getStatusClass(order.status)}`}>{order.status}</span>
                        </td>
                        <td className="actions-cell">
                          <Link to={`/admin/orders/${order._id}`} className="action-btn view">
                            <i className="fas fa-eye"></i>
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="no-data">
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>

                <span className="pagination-info">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  className="pagination-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  )
}

export default OrdersPage

