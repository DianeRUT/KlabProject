import { Link } from "react-router-dom"
import "../styles/ErrorPages.css"

const UnauthorizedPage = () => {
  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-icon">
          <i className="fas fa-lock"></i>
        </div>
        <h1>Access Denied</h1>
        <p>Sorry, you don't have permission to access this page.</p>
        <div className="error-actions">
          <Link to="/" className="primary-btn">
            Go to Homepage
          </Link>
          <Link to="/contact" className="secondary-btn">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UnauthorizedPage

