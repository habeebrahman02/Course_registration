import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

const Navigation = ({ onLogout }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    onLogout();
    setShowLogoutConfirm(false);
  };

  const user = JSON.parse(localStorage.getItem("user") || '{"username":"admin"}');

  return (
    <>
      <nav className="navbar">
        <div className="nav-brand">
          <h2>🎓 EduAdmin</h2>
        </div>
        
        <div className="nav-links">
          <Link 
            to="/courses" 
            className={location.pathname === "/courses" ? "nav-link active" : "nav-link"}
          >
            📚 Courses
          </Link>
          <Link 
            to="/students" 
            className={location.pathname === "/students" ? "nav-link active" : "nav-link"}
          >
            👥 Students
          </Link>
        </div>

        <div className="nav-user">
          <span className="welcome-text">Welcome, {user.username}</span>
          <button 
            className="logout-btn"
            onClick={() => setShowLogoutConfirm(true)}
          >
            🚪 Logout
          </button>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="modal-actions">
              <button className="confirm-btn" onClick={handleLogout}>
                ✅ Yes, Logout
              </button>
              <button 
                className="cancel-btn"
                onClick={() => setShowLogoutConfirm(false)}
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;