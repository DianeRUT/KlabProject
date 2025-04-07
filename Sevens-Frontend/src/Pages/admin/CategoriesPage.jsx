"use client"

import { useState, useEffect } from "react"
import AdminLayout from "../../Components/Admin/AdminLayout"
import { getCategories, createCategory, updateCategory, deleteCategory } from "../../api/categoryApi"
import "../../styles/admin/CategoriesPage.css"

const CategoriesAdminPage= () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState("create") // "create" or "edit"
  const [currentCategory, setCurrentCategory] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    subcategories: [],
  })

  const [newSubcategory, setNewSubcategory] = useState("")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const data = await getCategories()

      if (Array.isArray(data)) {
        setCategories(data)
      } else {
        setCategories([])
      }
    } catch (err) {
      console.error("Error fetching categories:", err)
      setError("Failed to load categories")
    } finally {
      setLoading(false)
    }
  }

  const openCreateModal = () => {
    setFormData({
      name: "",
      image: "",
      subcategories: [],
    })
    setModalMode("create")
    setShowModal(true)
  }

  const openEditModal = (category) => {
    setCurrentCategory(category)
    setFormData({
      name: category.name || "",
      image: category.image || "",
      subcategories: category.subcategories || [],
    })
    setModalMode("edit")
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setCurrentCategory(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const addSubcategory = () => {
    if (!newSubcategory.trim()) return

    setFormData({
      ...formData,
      subcategories: [...formData.subcategories, { name: newSubcategory, count: 0 }],
    })

    setNewSubcategory("")
  }

  const removeSubcategory = (index) => {
    const updatedSubcategories = [...formData.subcategories]
    updatedSubcategories.splice(index, 1)
    setFormData({ ...formData, subcategories: updatedSubcategories })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (modalMode === "create") {
        await createCategory(formData)
      } else {
        await updateCategory(currentCategory._id, formData)
      }

      fetchCategories()
      closeModal()
    } catch (err) {
      console.error("Error saving category:", err)
      setError("Failed to save category")
    }
  }

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!categoryToDelete) return

    try {
      await deleteCategory(categoryToDelete._id)
      setCategories(categories.filter((c) => c._id !== categoryToDelete._id))
      setShowDeleteModal(false)
      setCategoryToDelete(null)
    } catch (err) {
      console.error("Error deleting category:", err)
      setError("Failed to delete category")
    }
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setCategoryToDelete(null)
  }

  return (
    <AdminLayout>
      <div className="admin-categories">
        <div className="page-header">
          <h1>Categories</h1>
          <button className="create-btn" onClick={openCreateModal}>
            <i className="fas fa-plus"></i> Add Category
          </button>
        </div>

        {loading ? (
          <div className="loading-spinner">Loading categories...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="categories-grid">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div key={category._id} className="category-card">
                  <div className="category-image">
                    <img src={category.image || "/placeholder.svg"} alt={category.name} />
                  </div>

                  <div className="category-content">
                    <h3 className="category-name">{category.name}</h3>

                    <div className="subcategories-list">
                      <h4>Subcategories:</h4>
                      {category.subcategories && category.subcategories.length > 0 ? (
                        <ul>
                          {category.subcategories.map((sub, index) => (
                            <li key={index}>
                              {sub.name} <span className="count">({sub.count})</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="no-subcategories">No subcategories</p>
                      )}
                    </div>
                  </div>

                  <div className="category-actions">
                    <button className="edit-btn" onClick={() => openEditModal(category)}>
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteClick(category)}>
                      <i className="fas fa-trash-alt"></i> Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-categories">
                <p>No categories found</p>
                <button className="create-btn" onClick={openCreateModal}>
                  Add Your First Category
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Category Form Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content category-modal">
            <h3>{modalMode === "create" ? "Add New Category" : "Edit Category"}</h3>

            <form onSubmit={handleSubmit} className="category-form">
              <div className="form-group">
                <label htmlFor="name">Category Name*</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="image">Image URL*</label>
                <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} required />

                {formData.image && (
                  <div className="image-preview">
                    <img src={formData.image || "/placeholder.svg"} alt="Category preview" />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Subcategories</label>

                <div className="subcategory-input">
                  <input
                    type="text"
                    placeholder="Add subcategory"
                    value={newSubcategory}
                    onChange={(e) => setNewSubcategory(e.target.value)}
                  />
                  <button type="button" onClick={addSubcategory}>
                    <i className="fas fa-plus"></i>
                  </button>
                </div>

                <div className="subcategories-list">
                  {formData.subcategories.length > 0 ? (
                    <ul>
                      {formData.subcategories.map((sub, index) => (
                        <li key={index}>
                          {sub.name}
                          <button type="button" onClick={() => removeSubcategory(index)}>
                            <i className="fas fa-times"></i>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-subcategories">No subcategories added</p>
                  )}
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  {modalMode === "create" ? "Create Category" : "Update Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete the category "{categoryToDelete?.name}"?</p>
            <p className="warning-text">This will also delete all subcategories. This action cannot be undone.</p>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="delete-btn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default CategoriesAdminPage

