import React, { useContext, useEffect, useRef, useState } from 'react';
import './Navbar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { assets } from '../../assets/assets';

const Navbar = ({ setShowLogin }) => {
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Set active tab based on URL path
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveTab('home');
    else if (path === '/menu') setActiveTab('menu');
    else setActiveTab('');
  }, [location]);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={assets.logo} alt="Chomp Logo" className="navbar-logo" />
        </Link>
      </div>

      <div className="navbar-right">
        <Link
          to="/"
          className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
        >
          Home
        </Link>

        <Link
          to="/menu"
          className={`nav-link ${activeTab === 'menu' ? 'active' : ''}`}
        >
          Menu
        </Link>

        {!token ? (
          <span className="nav-link sign-in" onClick={() => setShowLogin(true)}>Sign In</span>
        ) : (
          <div className="navbar-profile" ref={dropdownRef}>
            <img
              src={assets.user}
              alt="User"
              className="profile-icon"
              onClick={() => setShowDropdown(prev => !prev)}
            />
            {showDropdown && (
              <ul className="nav-profile-dropdown">
                <li onClick={() => { navigate('/myorders'); setShowDropdown(false); }}>
                  <img src={assets.bag_icon} alt="Orders" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={() => { logout(); setShowDropdown(false); }}>
                  <img src={assets.logout_icon} alt="Logout" />
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}

        <Link to="/cart" className="cart-link">
          <img src={assets.shopping_cart} alt="Cart" />
          {getTotalCartAmount() !== 0 && <div className="dot"></div>}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
