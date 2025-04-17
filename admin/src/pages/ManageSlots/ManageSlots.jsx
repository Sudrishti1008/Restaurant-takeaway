import React, { useEffect, useState } from 'react';
import './ManageSlots.css';
import axios from 'axios';

const ManageSlots = ({ url }) => {
  const [slots, setSlots] = useState([]);
  const [day, setDay] = useState('');
  const [timeRange, setTimeRange] = useState('');

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const timeRanges = [
    '10:00 AM - 10:30 AM',
    '10:30 AM - 11:00 AM',
    '11:30 PM - 12:00 PM',
    '12:00 PM - 12:30 PM',
    '12:30 PM - 1:00 PM',
    '1:00 PM - 1:30 PM',
    '1:30 PM - 2:00 PM',
    '2:00 PM - 2:30 PM',  
    '2:30 PM - 3:00 PM',
    '3:00 PM - 3:30 PM',
    '3:30 PM - 4:00 PM',
    '4:00 PM - 4:30 PM',
    '4:30 PM - 5:00 PM',
    '5:00 PM - 5:30 PM',
    '5:30 PM - 6:00 PM',
    '6:00 PM - 6:30 PM',
    '6:30 PM - 7:00 PM',
    '7:00 PM - 7:30 PM',
    '7:30 PM - 8:00 PM'
  ];

  const fetchSlots = async () => {
    try {
      const res = await axios.get(`${url}/api/slots/list`);
      setSlots(res.data);
    } catch (err) {
      console.error('Failed to fetch slots', err);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleAddSlot = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/slots/add`, { day, timeRange }, {
        headers: { Authorization: localStorage.getItem("token") }
      });
      console.log("Slot added:", res.data);
      setDay('');
      setTimeRange('');
      fetchSlots();
    } catch (err) {
      console.error('Add failed', err.response?.data || err.message);
    }
  };

  const handleToggle = async (id) => {
    try {
      await axios.patch(`${url}/api/slots/toggle/${id}`, {}, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      fetchSlots();
    } catch (err) {
      console.error('Toggle failed', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/api/slots/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      fetchSlots();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <div className="manage-slots-container">
      <h2>Manage Delivery Slots</h2>

      <form onSubmit={handleAddSlot} className="slot-form">
        <label>
          Day
          <select value={day} onChange={(e) => setDay(e.target.value)} required>
            <option value="">Select Day</option>
            {daysOfWeek.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </label>

        <label>
          Time Range
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} required>
            <option value="">Select Time Range</option>
            {timeRanges.map((tr) => (
              <option key={tr} value={tr}>{tr}</option>
            ))}
          </select>
        </label>

        <button type="submit">Add Slot</button>
      </form>

      <table className="slot-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Time Range</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot) => (
            <tr key={slot._id}>
              <td>{slot.day}</td>
              <td>{slot.timeRange}</td>
              <td>{slot.isAvailable ? 'Yes' : 'No'}</td>
              <td>
                <button className="toggle-btn" onClick={() => handleToggle(slot._id)}>Toggle</button>
                <button className="delete-btn" onClick={() => handleDelete(slot._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageSlots;
