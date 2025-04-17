import React, { useContext, useEffect, useState } from 'react'; // React core + hooks
import './MyOrders.css'; // CSS file for styling this component
import { StoreContext } from '../../components/context/StoreContext'; // Import global context
import axios from 'axios'; // Axios for making API requests

const MyOrders = () => {
  const { url, token } = useContext(StoreContext); // Get API URL and auth token from context
  const [data, setData] = useState([]); // Local state to store the user's order data

// Function to fetch orders from backend
  const fetchOrders = async () => {
    try {
      const response = await axios.post(`${url}/api/order/userorders`, {}, {
        headers: { token } // Pass token in request headers for authentication
      });
      setData(response.data.data); // Save the fetched order data in state
    } catch (error) {
      console.error("Error fetching orders", error); // Log any errors
    }
  };
// Fetch orders when token is available
  useEffect(() => {
    if (token) fetchOrders();
  }, [token]); // Fetch orders when token is available

// Helper function to return CSS class based on order status
  const getStatusClass = (status) => {
    switch (status) {
      case 'Delivered':
        return 'status-delivered'; // Green or success style
      case 'Out for Delivery':
        return 'status-out'; // Orange or in-transit style
      default:
        return 'status-processing'; // Default style for processing or unknown
    }
  };

  return (
    <div className="my-orders-page">
      <h2>My Orders</h2>
      <div className="orders-list">
        {data.length === 0 ? (
          <p className="empty-msg">You have no orders yet.</p>
        ) : (
          data.map((order, index) => (
            <div className="order-card" key={index}>
              <div className="order-line">
                <span className="label">Items:</span>
                <span>{order.items.map(item => `${item.name} x${item.quantity}`).join(', ')}</span>
              </div>
              <div className="order-line">
                <span className="label">Total:</span>
                <span>€{order.amount}.00</span>
              </div>
              <div className="order-line">
                <span className="label">Date:</span>
                <span>
                {order.date
  ? new Date(order.date).toLocaleString('en-IE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  : 'N/A'}
                </span>
              </div>
              <div className={`order-line status-line ${getStatusClass(order.status)}`}>
                <span className="label">Status:</span>
                <span>{order.status}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders; // Export the component
