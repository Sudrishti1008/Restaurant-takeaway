import React from 'react' // Import React core
import ReactDOM from 'react-dom/client' // For creating the root of the React app
import App from './App.jsx' // Import the main App component
import './index.css' // Import global styles
import { BrowserRouter } from 'react-router-dom' // Import router wrapper for routing
import StoreContextProvider from './components/context/StoreContext.jsx' // Import global state provider
ReactDOM.createRoot(document.getElementById('root')).render(
  // Enables client-side routing using React Router
  <BrowserRouter>
   <StoreContextProvider>
   <App />
   </StoreContextProvider>
  </BrowserRouter>
)
