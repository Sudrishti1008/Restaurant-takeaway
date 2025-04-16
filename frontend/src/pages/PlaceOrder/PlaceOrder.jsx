import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../components/context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: '', lastName: '', email: '',
    houseNumber: '', locality: '', county: '',
    eirCode: '', phone: ''
  });

  const [slots, setSlots] = useState([]);
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) navigate('/cart');
  }, [token]);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get(`${url}/api/slots/list`);
        const availableSlots = response.data.filter(slot => slot.isAvailable);
        setSlots(response.data);
        const uniqueDays = [...new Set(availableSlots.map(slot => slot.day))];
        setDays(uniqueDays);
      } catch (error) {
        console.error('Failed to fetch delivery slots', error);
      }
    };
    fetchSlots();
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    const orderItems = food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({
        ...item,
        quantity: cartItems[item._id]
      }));

    const orderData = {
      userId: localStorage.getItem("userId"),
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
      delivery: {
        day: selectedDay,
        timeRange: selectedTime
      }
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token }
      });

      if (response.data.success) {
        const selectedSlot = slots.find(
          slot => slot.day === selectedDay && slot.timeRange === selectedTime
        );

        if (selectedSlot) {
          await axios.patch(`${url}/api/slots/toggle/${selectedSlot._id}`);
        }

        setCartItems({}); // clear cart
        setShowSuccess(true); // show modal
      } else {
        alert('Error placing order.');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };

  const filteredTimes = slots.filter(slot => slot.day === selectedDay);

  return (
    <>
      <form onSubmit={placeOrder} className="place-order">
        <div className="place-order-left">
          <label className="section-title">Select Delivery Slot</label>
          <div className="multi-fields">
            <select required value={selectedDay} onChange={e => setSelectedDay(e.target.value)}>
              <option value="">-- Select Delivery Day --</option>
              {days.map((day, i) => (
                <option key={i} value={day}>{day}</option>
              ))}
            </select>
            <select required value={selectedTime} onChange={e => setSelectedTime(e.target.value)} disabled={!selectedDay}>
              <option value="">-- Select Time Slot --</option>
              {filteredTimes.map((slot, i) => (
                <option key={i} value={slot.timeRange} disabled={!slot.isAvailable}>
                  {slot.timeRange}
                </option>
              ))}
            </select>
          </div>

          <label className="section-title">Delivery Information</label>
          <div className="multi-fields">
            <input type="text" name="firstName" placeholder="First Name" value={data.firstName} onChange={onChangeHandler} required />
            <input type="text" name="lastName" placeholder="Last Name" value={data.lastName} onChange={onChangeHandler} required />
          </div>
          <input type="email" name="email" placeholder="Email Address" value={data.email} onChange={onChangeHandler} required />
          <input type="text" name="houseNumber" placeholder="House Number / Street" value={data.houseNumber} onChange={onChangeHandler} required />
          <div className="multi-fields">
            <input type="text" name="locality" placeholder="Locality" value={data.locality} onChange={onChangeHandler} required />
            <input type="text" name="county" placeholder="County" value={data.county} onChange={onChangeHandler} required />
          </div>
          <input type="text" name="eirCode" placeholder="Eir Code" value={data.eirCode} onChange={onChangeHandler} required />
          <input type="text" name="phone" placeholder="Phone" value={data.phone} onChange={onChangeHandler} required />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>€{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>€{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>€{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
            <button type="submit">PROCEED TO CONFIRM</button>
          </div>
        </div>
      </form>

      {showSuccess && (
        <div className="order-success-popup">
          <div className="popup-content">
            <h2>Order Placed Successfully!</h2>
            <button onClick={() => navigate('/myorders')}>Go to Orders</button>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaceOrder;
