// import React, { useEffect, useState } from 'react'
// import './Orders.css'
// import {toast} from 'react-toastify'
// import axios from 'axios'
// import {assets} from "../../assets/assets"
// const Orders = ({url}) => {
//   const [orders,setOrders]= useState([]);

//   const fetchAllOrders = async ()=>{
//     const response = await axios.get(url+"/api/order/list");

//     if (response.data.success) {
//       setOrders(response.data.data);
//       console.log(response.data.data);
//     }
//     else{
//       toast.error("Error");
//     }
//   }

// const statusHandler = async (event,orderId)=>{
// const response = await axios.post(url+"/api/order/status",{
//   orderId,
//   status:event.target.value
// })
// if (response.data.success) {
//   await fetchAllOrders();
// }
// }

//   useEffect(()=>{
//     fetchAllOrders();
//   },[])
//   return (
//     <div className='order add'>
//       <h3>Order Page</h3>
//       <div className="order-list">
//         {orders.map((order,index)=>(
//           <div key={index} className='order-item'>
//             <div>
//               <p className="order-item-food">
//                 {order.items.map((item,index)=>{
//                   if (index===order.items.length-1) {
//                     return item.name + " x " + item.quantity
//                   }
//                   else{
//                     return item.name + " x " + item.quantity + ", "
//                   }
//                 })}
//               </p>
//               <p className="order-item-name">
//                 {order.address.firstName+ " "+ order.address.lastName}
//               </p>
//               <div className="order-item-address">
//                 <p>{order.address.street+","}</p>
//                 <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
//               </div>
//               <p className='order-item-phone'>
//                  {order.address.phone}
//               </p>
//             </div>
//             <p>Items : {order.items.length} </p>
//             <p>${order.amount}</p>
//             <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
//               <option value="Food Processing">Food Processing</option>
//               <option value="Out for Delivery">Out for Delivery</option>
//               <option value="Delivered">Delivered</option>
//             </select>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Orders

import React, { useEffect, useState } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + '/api/order/list');
    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      toast.error('Error fetching orders');
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + '/api/order/status', {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order-list-page">
      <h2>All Orders</h2>
      <div className="orders-table">
        <div className="orders-header">
          <div>Image</div>
          <div>Items</div>
          <div>Customer</div>
          <div>Date</div>
          <div>Delivery Slot</div>
          <div>Total</div>
          <div>Status</div>
        </div>
        {orders.map((order, index) => (
          <div className="orders-row" key={index}>
            <div><img src={assets.parcel_icon} alt="icon" /></div>
            <div>
              {order.items.map((item, i) => (
                <div key={i}>{item.name} x {item.quantity}</div>
              ))}
            </div>
            <div>
              <strong>{order.address.firstName} {order.address.lastName}</strong><br />
              {order.address.houseNumber}, {order.address.locality},<br />
              {order.address.county}<br />
              {order.address.phone}
            </div>
            <div>{formatDate(order.date)}</div>
            <div>{order.deliverySlot?.day}, {order.deliverySlot?.timeRange}</div>
            <div>€{order.amount}</div>
            <div>
              <select
                value={order.status}
                onChange={(e) => statusHandler(e, order._id)}
                className={`status-select ${order.status.replace(/\s/g, '-').toLowerCase()}`}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
