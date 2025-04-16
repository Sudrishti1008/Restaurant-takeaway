import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setAdminToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAdminToken(null);
    navigate('/');
  };

  return (
    <div className="admin-navbar">
      <div className="admin-navbar-left">
        <h1>Admin Panel</h1>
      </div>
      <div className="admin-navbar-right">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
