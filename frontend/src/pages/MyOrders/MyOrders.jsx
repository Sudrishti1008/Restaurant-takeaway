import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../components/context/StoreContext';
import axios from 'axios';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(`${url}/api/order/userorders`, {}, {
        headers: { token }
      });
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Delivered':
        return 'status-delivered';
      case 'Out for Delivery':
        return 'status-out';
      default:
        return 'status-processing';
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

export default MyOrders;
