import React from 'react'; // Import React
import './Navbar.css'; // Import CSS styling for the admin navbar
import { useNavigate } from 'react-router-dom'; // Hook to programmatically navigate between routes

// Navbar component for the admin panel
// Receives setAdminToken as a prop to clear login session
const Navbar = ({ setAdminToken }) => {
  const navigate = useNavigate();

// Handle admin logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear auth token from local storage
    setAdminToken(null); // Reset admin token state in parent
    navigate('/'); // Redirect to homepage or login screen
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

export default Navbar; // Export the Navbar component
