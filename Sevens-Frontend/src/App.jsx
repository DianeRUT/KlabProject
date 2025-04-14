import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./Pages/Home"
import ProductsPage from "./Pages/ProductsPage"
import ProductDetailPage from "./Pages/ProductDetail" 
import CartPage from "./pages/CartPage"
import CheckoutPage from "./Pages/CheckoutPage"
import PaymentPage from "./Pages/PaymentPage"
import ConfirmationPage from "./pages/ConfirmationPage"
import CategoriesPage from "./pages/CategoriesPage"
import ContactPage from "./pages/ContactPage"
import AboutPage from "./pages/AboutPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ProfilePage from "./pages/ProfilePage"
import MainLayout from "./Layouts/MainLayout"
import { CartProvider } from "./context/CartContext"
import { AuthProvider } from "./Context/AuthContext" 
import ProtectedRoute from "./components/ProtectedRoute"

// Admin Pages
import DashboardPage from "./Pages/admin/DashboardPage"
import AdminProductsPage from "./Pages/admin/ProductsPage"
import ProductFormPage from "./Pages/admin/ProductFormPage"
import OrdersPage from "./Pages/admin/OrdersPage"
import OrderDetailPage from "./Pages/admin/OrderDetailPage"
import UsersPage from "./Pages/admin/UsersPage"
import CategoriesAdminPage from "./Pages/admin/CategoriesPage"
import SettingsPage from "./Pages/admin/SettingsPage"
import AdminRoute from "./components/AdminRoute"

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="products/:id" element={<ProductDetailPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />

              {/* Protected Routes */}
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
            </Route>

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <DashboardPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <AdminProductsPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products/create"
              element={
                <AdminRoute>
                  <ProductFormPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products/edit/:id"
              element={
                <AdminRoute>
                  <ProductFormPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminRoute>
                  <OrdersPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/orders/:id"
              element={
                <AdminRoute>
                  <OrderDetailPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <UsersPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <AdminRoute>
                  <CategoriesAdminPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <AdminRoute>
                  <SettingsPage />
                </AdminRoute>
              }
            />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App

