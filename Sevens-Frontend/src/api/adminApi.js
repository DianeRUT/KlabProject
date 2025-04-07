import api from "./axios"

// Dashboard Stats
export const getOrderStats = async () => {
  try {
    // In a real implementation, you would fetch this from your API
    // For now, we'll return mock data
    return {
      totalSales: 15789.45,
      totalOrders: 124,
      recentOrders: [
        {
          _id: "60d21b4667d0d8992e610c85",
          user: { name: "John Doe" },
          totalPrice: 129.99,
          status: "Processing",
          createdAt: new Date().toISOString(),
        },
        {
          _id: "60d21b4667d0d8992e610c86",
          user: { name: "Jane Smith" },
          totalPrice: 249.95,
          status: "Shipped",
          createdAt: new Date().toISOString(),
        },
        {
          _id: "60d21b4667d0d8992e610c87",
          user: { name: "Mike Johnson" },
          totalPrice: 89.99,
          status: "Delivered",
          createdAt: new Date().toISOString(),
        },
        {
          _id: "60d21b4667d0d8992e610c88",
          user: { name: "Sarah Williams" },
          totalPrice: 199.99,
          status: "Paid",
          createdAt: new Date().toISOString(),
        },
      ],
    }
  } catch (error) {
    console.error("Error fetching order stats:", error)
    throw error
  }
}

export const getProductStats = async () => {
  try {
    // Mock data
    return {
      totalProducts: 68,
      lowStockProducts: [
        {
          _id: "60d21b4667d0d8992e610c89",
          name: "Nike Air Max",
          category: "Shoes",
          price: 129.99,
          countInStock: 2,
          image: "/images/nike-air-max.jpg",
        },
        {
          _id: "60d21b4667d0d8992e610c90",
          name: "Versace Sunglasses",
          category: "Accessories",
          price: 299.99,
          countInStock: 3,
          image: "/images/versace-sunglasses.jpg",
        },
        {
          _id: "60d21b4667d0d8992e610c91",
          name: "Air Jordan 1",
          category: "Shoes",
          price: 199.99,
          countInStock: 0,
          image: "/images/air-jordan-1.jpg",
        },
      ],
    }
  } catch (error) {
    console.error("Error fetching product stats:", error)
    throw error
  }
}

export const getUserStats = async () => {
  try {
    // Mock data
    return {
      totalUsers: 256,
    }
  } catch (error) {
    console.error("Error fetching user stats:", error)
    throw error
  }
}

// User Management
export const getUsers = async (params = {}) => {
  try {
    const response = await api.get("/users", { params })
    return response.data
  } catch (error) {
    console.error("Error fetching users:", error)
    throw error
  }
}

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`)
    return response.data
  } catch (error) {
    console.error("Error deleting user:", error)
    throw error
  }
}

export const updateUserRole = async (userId, isAdmin) => {
  try {
    const response = await api.put(`/users/${userId}`, { isAdmin })
    return response.data
  } catch (error) {
    console.error("Error updating user role:", error)
    throw error
  }
}

// Store Settings
export const getStoreSettings = async () => {
  try {
    // In a real implementation, you would fetch this from your API
    // For now, we'll return mock data
    return {
      storeName: "ShopNow",
      storeEmail: "info@shopnow.com",
      storePhone: "+1 (800) 123-4567",
      storeAddress: "123 Fashion Street, New York, NY 10001, United States",
      logo: "/images/logo.png",
      favicon: "/images/favicon.ico",
      socialLinks: {
        facebook: "https://facebook.com/shopnow",
        twitter: "https://twitter.com/shopnow",
        instagram: "https://instagram.com/shopnow",
        pinterest: "https://pinterest.com/shopnow",
      },
      shippingOptions: [
        { name: "Standard Shipping", price: 10, days: "3-5" },
        { name: "Express Shipping", price: 20, days: "1-2" },
      ],
      taxRate: 10,
      currency: "USD",
    }
  } catch (error) {
    console.error("Error fetching store settings:", error)
    throw error
  }
}

export const updateStoreSettings = async (settings) => {
  try {
    // In a real implementation, you would send this to your API
    console.log("Updating store settings:", settings)
    return settings
  } catch (error) {
    console.error("Error updating store settings:", error)
    throw error
  }
}

// Order Management
export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await api.put(`/orders/${orderId}/status`, { status })
    return response.data
  } catch (error) {
    console.error("Error updating order status:", error)
    throw error
  }
}

