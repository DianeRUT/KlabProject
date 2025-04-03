
import { useState, useEffect } from "react"
import { useAuth } from "../Context/AuthContext"
import { getMyOrders } from "../api/orderApi"
import { updateUserProfile } from "../api/userApi"
import "../styles/ProfilePage.css"

const ProfilePage = () => {
  const { userInfo, isAuthenticated } = useAuth()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState(null)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(false)

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name)
      setEmail(userInfo.email)
    }

    const fetchOrders = async () => {
      setLoadingOrders(true)
      try {
        const data = await getMyOrders()
        setOrders(data)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setLoadingOrders(false)
      }
    }

    if (isAuthenticated) {
      fetchOrders()
    }
  }, [userInfo, isAuthenticated])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage("Passwords do not match")
      return
    }

    setMessage(null)
    setLoading(true)

    try {
      await updateUserProfile({
        name,
        email,
        password: password ? password : undefined,
      })

      setUpdateSuccess(true)
      setPassword("")
      setConfirmPassword("")

      // Hide success message after 3 seconds
      setTimeout(() => {
        setUpdateSuccess(false)
      }, 3000)
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-update">
          <h2>User Profile</h2>

          {message && <div className="error-message">{message}</div>}
          {updateSuccess && <div className="success-message">Profile Updated Successfully</div>}

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
              />
            </div>

            <button type="submit" className="update-btn" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>

        <div className="order-history">
          <h2>Order History</h2>

          {loadingOrders ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <p>You have no orders yet</p>
          ) : (
            <div className="orders-table-container">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>${order.totalPrice.toFixed(2)}</td>
                      <td>
                        {order.isPaid ? (
                          new Date(order.paidAt).toLocaleDateString()
                        ) : (
                          <i className="fas fa-times" style={{ color: "red" }}></i>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          new Date(order.deliveredAt).toLocaleDateString()
                        ) : (
                          <i className="fas fa-times" style={{ color: "red" }}></i>
                        )}
                      </td>
                      <td>
                        <a href={`/order/${order._id}`} className="btn-details">
                          Details
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

