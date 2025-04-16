import React, { useContext, useState } from 'react';
import './Cart.css';
import { StoreContext } from '../../components/context/StoreContext';
import { useNavigate } from 'react-router-dom';
import LoginPopup from '../../components/LoginPopup/LoginPopup';

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    token,
  } = useContext(StoreContext);

  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleCheckout = () => {
    if (!token) {
      setShowLoginPopup(true);
    } else {
      navigate('/order');
    }
  };

  const isCartEmpty = getTotalCartAmount() === 0;

  return (
    <div className="cart">
      {showLoginPopup && <LoginPopup setShowLogin={setShowLoginPopup} />}

      {isCartEmpty ? (
        <div className="empty-cart-message">
          <h2>Your cart is empty</h2>
          <p>Add some delicious food to your cart to get started!</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            <div className="cart-items-title">
              <div>Items</div>
              <div>Title</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total</div>
              <div>Remove</div>
            </div>
            <hr />
            {food_list.map((item, index) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div key={index}>
                    <div className="cart-items-item">
                      <img src={`http://localhost:4000/images/${item.image}`} alt={item.name} />
                      <div>{item.name}</div>
                      <div>€{item.price}</div>
                      <div>{cartItems[item._id]}</div>
                      <div>€{item.price * cartItems[item._id]}</div>
                      <div className="cross" onClick={() => removeFromCart(item._id)}>✕</div>
                    </div>
                    <hr />
                  </div>
                );
              }
              return null;
            })}
          </div>

          <div className="cart-bottom">
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
              <button onClick={handleCheckout}>
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
