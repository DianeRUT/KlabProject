import { useState, useEffect } from 'react';
import '../styles/UsestateHook.css';
import { IoClose } from "react-icons/io5";

const AuthModal = ({ handleClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Clear password fields when toggling between login and register
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      password: '',
      confirmPassword: ''
    }));
  }, [isLogin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isLogin) {
      // login
      console.log('Login data:', formData);
    } else {
      // registration
      console.log('Register data:', formData);
    }
  };

  return (
    <div className="botiga-login-container-1" onClick={handleClose}>
      <div className="botiga-login-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="botiga-login-title">{isLogin ? 'Login' : 'Register'}</h2>
        <IoClose 
          onClick={handleClose} 
          className="iconhead"
          style={{ cursor: 'pointer' }}
        />

        <form className="botiga-login-form" onSubmit={handleSubmit}>
          {isLogin ? (
            <>
              <div className="form-row">
                <label>Username or email</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row password-toggle">
                <label>Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <i
                  className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: 'pointer' }}
                />
              </div>

              <div className="remember-me">
                <input type="checkbox" id="rememberme" />
                <label htmlFor="rememberme">Remember me</label>
              </div>

              <button type="submit">Log in</button>
              <a href="#!" className="forgot-password">Lost your password?</a>
            </>
          ) : (
            <>
              <div className="form-row">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row password-toggle">
                <label>Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <i
                  className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: 'pointer' }}
                />
              </div>

              <div className="form-row">
                <label>Confirm Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit">Register</button>
            </>
          )}
        </form>

        <div className="botiga-login-links">
          {isLogin ? (
            <span>Don't have an account?{' '}
              <a href="#!" onClick={() => setIsLogin(false)}>Register</a>
            </span>
          ) : (
            <span>Already have an account?{' '}
              <a href="#!" onClick={() => setIsLogin(true)}>Login</a>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
