import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom' // NavLink is used for navigation with active class support

// Sidebar component for admin dashboard
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
            <p>Add Items</p>
        </NavLink>
        <NavLink to='/slots' className="sidebar-option">
            <p>Delivery Slots</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
            <p>List Items</p>
        </NavLink>

        <NavLink to='/orders' className="sidebar-option">
            <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar // Export the Sidebar component
