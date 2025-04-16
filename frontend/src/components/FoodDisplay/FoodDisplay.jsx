import React, { useContext, useState } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = () => {
  const { food_list } = useContext(StoreContext);
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Non-Veg', 'Veg', 'Vegan'];

  return (
    <div className="food-display-wrapper">
      <div className="food-display-header">
        <h2>Dive Into the Chomp Menu</h2>
        <div className="filter-wrapper">
          <label htmlFor="category">Filter by Category: </label>
          <select id="category" onChange={(e) => setCategory(e.target.value)} value={category}>
            {categories.map((cat, idx) => (
              <option value={cat} key={idx}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      <hr className="section-divider" />
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === 'All' || item.category === category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
