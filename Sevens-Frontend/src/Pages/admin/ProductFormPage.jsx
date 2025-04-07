import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import AdminLayout from "../../Components/Admin/AdminLayout"
import { getProductById, createProduct, updateProduct } from "../../api/productApi"
import { getCategories } from "../../api/categoryApi"
import "../../styles/admin/ProductFormPage.css"

const ProductFormPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = !!id

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    type: "",
    description: "",
    price: "",
    originalPrice: "",
    discount: "",
    countInStock: "",
    image: "",
    isNew: false,
    gender: [],
  })

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [imagePreview, setImagePreview] = useState("")
  const [imageFile, setImageFile] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories()
        if (Array.isArray(data)) {
          setCategories(data)
        }
      } catch (err) {
        console.error("Error fetching categories:", err)
      }
    }

    fetchCategories()

    if (isEditMode) {
      fetchProductDetails()
    }
  }, [id, isEditMode])

  const fetchProductDetails = async () => {
    try {
      setLoading(true)
      const product = await getProductById(id)

      if (product) {
        setFormData({
          name: product.name || "",
          brand: product.brand || "",
          category: product.category || "",
          type: product.type || "",
          description: product.description || "",
          price: product.price || "",
          originalPrice: product.originalPrice || "",
          discount: product.discount || "",
          countInStock: product.countInStock || "",
          image: product.image || "",
          isNew: product.isNew || false,
          gender: product.gender || [],
        })

        setImagePreview(product.image || "")
      }
    } catch (err) {
      console.error("Error fetching product details:", err)
      setError("Failed to load product details")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked })
    } else if (name === "gender") {
      const updatedGender = [...formData.gender]
      if (checked) {
        updatedGender.push(value)
      } else {
        const index = updatedGender.indexOf(value)
        if (index !== -1) {
          updatedGender.splice(index, 1)
        }
      }
      setFormData({ ...formData, gender: updatedGender })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError(null)

      // In a real implementation, you would upload the image first
      // and then use the returned URL
      let imageUrl = formData.image
      if (imageFile) {
        // This is a placeholder for image upload
        // imageUrl = await uploadImage(imageFile)
        imageUrl = imagePreview // For demo purposes
      }

      const productData = {
        ...formData,
        price: Number.parseFloat(formData.price),
        originalPrice: Number.parseFloat(formData.originalPrice) || Number.parseFloat(formData.price),
        countInStock: Number.parseInt(formData.countInStock),
        image: imageUrl,
      }

      if (isEditMode) {
        await updateProduct(id, productData)
      } else {
        await createProduct(productData)
      }

      navigate("/admin/products")
    } catch (err) {
      console.error("Error saving product:", err)
      setError("Failed to save product. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (loading && isEditMode) {
    return (
      <AdminLayout>
        <div className="loading-spinner">Loading product details...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="product-form-page">
        <div className="page-header">
          <h1>{isEditMode ? "Edit Product" : "Add New Product"}</h1>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-grid">
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="name">Product Name*</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="brand">Brand*</label>
                  <input type="text" id="brand" name="brand" value={formData.brand} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category*</label>
                  <select id="category" name="category" value={formData.category} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="type">Type*</label>
                  <select id="type" name="type" value={formData.type} onChange={handleChange} required>
                    <option value="">Select Type</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Clothes">Clothes</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="countInStock">Stock Quantity*</label>
                  <input
                    type="number"
                    id="countInStock"
                    name="countInStock"
                    value={formData.countInStock}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description*</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  required
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Price ($)*</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="originalPrice">Original Price ($)</label>
                  <input
                    type="number"
                    id="originalPrice"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="discount">Discount</label>
                  <input
                    type="text"
                    id="discount"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    placeholder="e.g. 20%"
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" name="isNew" checked={formData.isNew} onChange={handleChange} />
                    Mark as New Arrival
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Gender</label>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="gender"
                      value="Men"
                      checked={formData.gender.includes("Men")}
                      onChange={handleChange}
                    />
                    Men
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="gender"
                      value="Women"
                      checked={formData.gender.includes("Women")}
                      onChange={handleChange}
                    />
                    Women
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="gender"
                      value="Unisex"
                      checked={formData.gender.includes("Unisex")}
                      onChange={handleChange}
                    />
                    Unisex
                  </label>
                </div>
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <label>Product Image</label>
                <div className="image-upload-container">
                  <div className="image-preview">
                    {imagePreview ? (
                      <img src={imagePreview || "/placeholder.svg"} alt="Product preview" />
                    ) : (
                      <div className="no-image">
                        <i className="fas fa-image"></i>
                        <p>No image selected</p>
                      </div>
                    )}
                  </div>

                  <div className="image-upload">
                    <label htmlFor="image-upload" className="upload-btn">
                      <i className="fas fa-upload"></i> Choose Image
                    </label>
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </div>

                  <div className="image-url-input">
                    <label htmlFor="image">Or enter image URL</label>
                    <input
                      type="text"
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => navigate("/admin/products")}>
              Cancel
            </button>
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? "Saving..." : isEditMode ? "Update Product" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

export default ProductFormPage

