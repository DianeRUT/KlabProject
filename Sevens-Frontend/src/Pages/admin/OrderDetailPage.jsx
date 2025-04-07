
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import AdminLayout from "../../Components/Admin/AdminLayout"
import { getOrderById, updateOrderStatus } from "../../api/orderApi"
import "../../styles/admin/OrderDetailPage.css"

const OrderDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState("")

  useEffect(() => {
    fetchOrderDetails()
  }, [id])

  const fetchOrderDetails = async () => {
    try {
      setLoading(true)
      const data = await getOrderById(id)

      if (data) {
        setOrder(data)
        setSelectedStatus(data.status || "")
      }
    } catch (err) {
      console.error("Error fetching order details:", err)
      setError("Failed to load order details")
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async () => {
    if (!selectedStatus || selectedStatus === order.status) return

    try {
      setUpdatingStatus(true)
      await updateOrderStatus(id, selectedStatus)

      // Update local state
      setOrder({ ...order, status: selectedStatus })
    } catch (err) {
      console.error("Error updating order status:", err)
      setError("Failed to update order status")
    } finally {
      setUpdatingStatus(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="loading-spinner">Loading order details...</div>
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

  if (!order) {
    return (
      <AdminLayout>
        <div className="not-found">Order not found</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="order-detail-page">
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate("/admin/orders")}>
            <i className="fas fa-arrow-left"></i> Back to Orders
          </button>
          <h1>Order #{order._id.substring(0, 8)}</h1>
        </div>

        <div className="order-status-bar">
          <div className="status-info">
            <span className="label">Status:</span>
            <span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span>
          </div>

          <div className="status-update">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              disabled={updatingStatus}
            >
              <option value="">Select Status</option>
              <option value="Paid">Paid</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <button
              className="update-btn"
              onClick={handleStatusChange}
              disabled={updatingStatus || !selectedStatus || selectedStatus === order.status}
            >
              {updatingStatus ? "Updating..." : "Update Status"}
            </button>
          </div>
        </div>

        <div className="order-grid">
          <div className="order-info-card">
            <h2>Order Information</h2>
            <div className="info-group">
              <div className="info-item">
                <span className="label">Order ID:</span>
                <span className="value">{order._id}</span>
              </div>

              <div className="info-item">
                <span className="label">Date Placed:</span>
                <span className="value">{new Date(order.createdAt).toLocaleString()}</span>
              </div>

              <div className="info-item">
                <span className="label">Payment Method:</span>
                <span className="value">{order.paymentMethod}</span>
              </div>

              <div className="info-item">
                <span className="label">Payment Status:</span>
                <span className={`value ${order.isPaid ? "text-success" : "text-danger"}`}>
                  {order.isPaid ? `Paid on ${new Date(order.paidAt).toLocaleString()}` : "Not Paid"}
                </span>
              </div>

              <div className="info-item">
                <span className="label">Delivery Status:</span>
                <span className={`value ${order.isDelivered ? "text-success" : "text-warning"}`}>
                  {order.isDelivered ? `Delivered on ${new Date(order.deliveredAt).toLocaleString()}` : "Not Delivered"}
                </span>
              </div>
            </div>
          </div>

          <div className="customer-info-card">
            <h2>Customer Information</h2>
            <div className="info-group">
              <div className="info-item">
                <span className="label">Name:</span>
                <span className="value">{order.user?.name || "Guest"}</span>
              </div>

              <div className="info-item">
                <span className="label">Email:</span>
                <span className="value">{order.user?.email || order.shippingAddress?.email || "N/A"}</span>
              </div>

              <div className="info-item">
                <span className="label">Phone:</span>
                <span className="value">{order.shippingAddress?.phone || "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="shipping-info-card">
            <h2>Shipping Address</h2>
            <div className="address-info">
              <p>
                {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
              </p>
              <p>{order.shippingAddress?.address}</p>
              <p>
                {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}
              </p>
              <p>{order.shippingAddress?.country}</p>
            </div>
          </div>

          <div className="payment-info-card">
            <h2>Payment Information</h2>
            <div className="info-group">
              <div className="info-item">
                <span className="label">Subtotal:</span>
                <span className="value">${order.itemsPrice?.toFixed(2) || "0.00"}</span>
              </div>

              <div className="info-item">
                <span className="label">Shipping:</span>
                <span className="value">${order.shippingPrice?.toFixed(2) || "0.00"}</span>
              </div>

              <div className="info-item">
                <span className="label">Tax:</span>
                <span className="value">${order.taxPrice?.toFixed(2) || "0.00"}</span>
              </div>

              <div className="info-item total">
                <span className="label">Total:</span>
                <span className="value">${order.totalPrice?.toFixed(2) || "0.00"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="order-items-card">
          <h2>Order Items</h2>
          <div className="table-responsive">
            <table className="admin-table items-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems.map((item) => (
                  <tr key={item._id || item.product}>
                    <td className="product-cell">
                      <img src={item.image || "/placeholder.svg"} alt={item.name} />
                      <div className="product-info">
                        <h4>{item.name}</h4>
                        <p>SKU: {item.product}</p>
                      </div>
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default OrderDetailPage

