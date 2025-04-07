
import { useState, useEffect } from "react"
import AdminLayout from "../../Components/Admin/AdminLayout"
import { getUsers, deleteUser, updateUserRole } from "../../api/adminApi"
import "../../styles/admin/UsersPage.css"

const UsersPage = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [currentPage, searchTerm])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const params = {
        page: currentPage,
        search: searchTerm || undefined,
      }

      const data = await getUsers(params)

      if (Array.isArray(data)) {
        setUsers(data)
        setTotalPages(Math.ceil(data.length / 10) || 1)
      } else {
        setUsers([])
        setTotalPages(1)
      }
    } catch (err) {
      console.error("Error fetching users:", err)
      setError("Failed to load users")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchUsers()
  }

  const handleDeleteClick = (user) => {
    setUserToDelete(user)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!userToDelete) return

    try {
      await deleteUser(userToDelete._id)
      setUsers(users.filter((u) => u._id !== userToDelete._id))
      setShowDeleteModal(false)
      setUserToDelete(null)
    } catch (err) {
      console.error("Error deleting user:", err)
      setError("Failed to delete user")
    }
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setUserToDelete(null)
  }

  const toggleAdminRole = async (userId, isCurrentlyAdmin) => {
    try {
      await updateUserRole(userId, !isCurrentlyAdmin)

      // Update local state
      setUsers(users.map((user) => (user._id === userId ? { ...user, isAdmin: !isCurrentlyAdmin } : user)))
    } catch (err) {
      console.error("Error updating user role:", err)
      setError("Failed to update user role")
    }
  }

  return (
    <AdminLayout>
      <div className="admin-users">
        <div className="page-header">
          <h1>Users</h1>
        </div>

        <div className="filters-bar">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>

        {loading ? (
          <div className="loading-spinner">Loading users...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="admin-table users-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Registered</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user._id}>
                        <td>{user._id.substring(0, 8)}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td>
                          <span className={`role-badge ${user.isAdmin ? "admin" : "customer"}`}>
                            {user.isAdmin ? "Admin" : "Customer"}
                          </span>
                        </td>
                        <td className="actions-cell">
                          <button
                            className={`action-btn ${user.isAdmin ? "remove-admin" : "make-admin"}`}
                            onClick={() => toggleAdminRole(user._id, user.isAdmin)}
                          >
                            {user.isAdmin ? (
                              <>
                                <i className="fas fa-user-minus"></i> Remove Admin
                              </>
                            ) : (
                              <>
                                <i className="fas fa-user-shield"></i> Make Admin
                              </>
                            )}
                          </button>

                          <button className="action-btn delete" onClick={() => handleDeleteClick(user)}>
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="no-data">
                        No users found
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete the user "{userToDelete?.name}"?</p>
            <p className="warning-text">This action cannot be undone.</p>

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

export default UsersPage

