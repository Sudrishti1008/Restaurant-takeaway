
import React, { useState } from 'react'; // React core and useState hook
import { Route, Routes } from 'react-router-dom'; // Routing components from React Router

// Global layout components

import Navbar from './components/Navbar/Navbar';
import Banner from './components/Banner/Banner';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';

// Page components
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
import Menu from './pages/Menu/Menu'; 

const App = () => {
  const [showLogin, setShowLogin] = useState(false); // Local state to control login popup visibility

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <Navbar setShowLogin={setShowLogin} />
      <Banner />

      <main className="content">
        <div className="app-container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/menu' element={<Menu />} /> 
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<PlaceOrder />} />
            <Route path='/verify' element={<Verify />} />
            <Route path='/myorders' element={<MyOrders />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default App; // Export the root App component

