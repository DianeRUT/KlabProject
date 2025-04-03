import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CartProvider } from "./context/CartContext"; // Ensure correct path
import { AuthProvider } from "./Context/AuthContext";  // Ensure correct path


import HomePage from "./Pages/Home"
import ProductsPage from "./pages/ProductsPage"
import ProductDetailPage from "./Pages/ProductDetail"
import CartPage from "./Pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import PaymentPage from "./pages/PaymentPage"
import ConfirmationPage from "./pages/ConfirmationPage"
import CategoriesPage from "./pages/CategoriesPage"
import ContactPage from "./pages/ContactPage"
import AboutPage from "./pages/AboutPage"
import LoginPage from "./Pages/LoginPage"
import RegisterPage from "./Pages/RegisterPage"
import ProfilePage from "./Pages/ProfilePage"
import SearchResultsPage from "./pages/SearchResultsPage"
import MainLayout from "./Layouts/MainLayout"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminRoute from "./Components/AdminRoute"
// import AdminDashboard from "./pages/admin/AdminDashboard"
// import AdminProducts from "./pages/admin/AdminProducts"
// import AdminOrders from "./pages/admin/AdminOrders"
// import AdminUsers from "./pages/admin/AdminUsers"

function App() {
  return (
    <AuthProvider>
      <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Public Routes */}
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="search" element={<SearchResultsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          {/* Protected Routes (require authentication) */}
          <Route
            path="checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="payment"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="confirmation"
            element={
              <ProtectedRoute>
                <ConfirmationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          {/* <Route path="admin">
            <Route
              path="dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="products"
              element={
                <AdminRoute>
                  <AdminProducts />
                </AdminRoute>
              }
            />
            <Route
              path="orders"
              element={
                <AdminRoute>
                  <AdminOrders />
                </AdminRoute>
              }
            />
            <Route
              path="users"
              element={
                <AdminRoute>
                  <AdminUsers />
                </AdminRoute>
              }
            />
          </Route> */}
        </Route>
      </Routes>
    </Router>
    </CartProvider>
    </AuthProvider>
  )
}

export default App

