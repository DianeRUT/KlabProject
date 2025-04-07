import api from "./axios"

// Create a new order
export const createOrder = async (orderData) => {
  try {
    const response = await api.post("/orders", orderData)
    return response.data
  } catch (error) {
    console.error("Error creating order:", error)
    throw error
  }
}

// Get order details by ID
export const getOrderDetails = async (orderId) => {
  try {
    const response = await api.get(`/orders/${orderId}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error)
    throw error
  }
}

// Alias for getOrderDetails to maintain compatibility with admin components
export const getOrderById = getOrderDetails

// Update order to paid
export const payOrder = async (orderId, paymentResult) => {
  try {
    const response = await api.put(`/orders/${orderId}/pay`, paymentResult)
    return response.data
  } catch (error) {
    console.error("Error updating order to paid:", error)
    throw error
  }
}

// Get logged in user's orders
export const getMyOrders = async () => {
  try {
    const response = await api.get("/orders/myorders")
    return response.data
  } catch (error) {
    console.error("Error fetching my orders:", error)
    throw error
  }
}

// Get all orders (admin)
export const getOrders = async (params = {}) => {
  try {
    const response = await api.get("/orders", { params })
    return response.data
  } catch (error) {
    console.error("Error fetching orders:", error)
    // Return empty array to prevent cascading failures
    return []
  }
}

// Update order status
export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await api.put(`/orders/${orderId}/status`, { status })
    return response.data
  } catch (error) {
    console.error("Error updating order status:", error)
    throw error
  }
}

