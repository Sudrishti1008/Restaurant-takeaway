import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';

import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import Login from './pages/Login/Login';
import ManageSlots from './pages/ManageSlots/ManageSlots';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url = "http://localhost:4000";
  const [adminToken, setAdminToken] = useState(localStorage.getItem('token'));

  // Listen for manual token changes (logout in other tabs)
  useEffect(() => {
    const onStorageChange = () => {
      setAdminToken(localStorage.getItem('token'));
    };
    window.addEventListener('storage', onStorageChange);
    return () => window.removeEventListener('storage', onStorageChange);
  }, []);

  return (
    <div>
      <ToastContainer />
      {adminToken && <Navbar setAdminToken={setAdminToken} />}
      <hr />
      <div className="app-content">
        {adminToken && <Sidebar />}
        <Routes>
          <Route path="/" element={adminToken ? <Navigate to="/add" /> : <Login url={url} />} />
          <Route path="/slots" element={adminToken ? <ManageSlots url={url} /> : <Navigate to="/" />} />
          <Route path="/add" element={adminToken ? <Add url={url} /> : <Navigate to="/" />} />
          <Route path="/list" element={adminToken ? <List url={url} /> : <Navigate to="/" />} />
          <Route path="/orders" element={adminToken ? <Orders url={url} /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
