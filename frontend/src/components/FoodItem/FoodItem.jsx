import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-info">
        <h3>{name}</h3>
        <p className="food-item-price">€{price}</p>
        <p className="food-item-desc">{description}</p>
      </div>
      <div className="food-item-img-container">
      <img className="food-item-img" src={image} alt={name} />
        <div className="food-item-actions">
          {cartItems[id] ? (
            <div className="food-item-counter">
              <img src={assets.remove_icon_red} alt="-" onClick={() => removeFromCart(id)} />
              <p>{cartItems[id]}</p>
              <img src={assets.add_icon_green} alt="+" onClick={() => addToCart(id)} />
            </div>
          ) : (
            <button className="add-btn" onClick={() => addToCart(id)}>ADD</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
