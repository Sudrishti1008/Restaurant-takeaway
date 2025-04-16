import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './List.css';

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const fetchList = async () => {
    const res = await axios.get(`${url}/api/food/list`);
    if (res.data.success) {
      setList(res.data.data);
    } else {
      toast.error('Failed to fetch items');
    }
  };

  const removeFood = async (id) => {
    const res = await axios.post(`${url}/api/food/remove`, { id });
    if (res.data.success) {
      toast.success(res.data.message);
      fetchList();
    } else {
      toast.error('Failed to delete item');
    }
  };

  const handleEditSave = async () => {
    try {
      await axios.patch(`${url}/api/food/update/${editItem._id}`, editItem, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      toast.success("Food item updated");
      setEditItem(null);
      fetchList();
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <h2>All Foods List</h2>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Status</b>
          <b>Actions</b>
        </div>

        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>€{item.price}</p>
            <p>{item.status}</p>
            <p>
              <button className="small-btn" onClick={() => setEditItem(item)}>Edit</button>
              <button className="small-btn red" onClick={() => removeFood(item._id)}>Delete</button>
            </p>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      {editItem && (
        <div className="edit-modal">
          <div className="edit-box">
            <h3>Edit Food Item</h3>
            <input type="text" value={editItem.name} onChange={(e) => setEditItem({ ...editItem, name: e.target.value })} placeholder="Name" />
            <textarea value={editItem.description} onChange={(e) => setEditItem({ ...editItem, description: e.target.value })} placeholder="Description" />
            <input type="number" value={editItem.price} onChange={(e) => setEditItem({ ...editItem, price: e.target.value })} placeholder="Price" />
            <input type="text" value={editItem.category} onChange={(e) => setEditItem({ ...editItem, category: e.target.value })} placeholder="Category" />
            <select value={editItem.status} onChange={(e) => setEditItem({ ...editItem, status: e.target.value })}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <div className="edit-actions">
              <button className="small-btn" onClick={handleEditSave}>Save</button>
              <button className="small-btn red" onClick={() => setEditItem(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;

