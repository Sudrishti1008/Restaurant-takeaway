import React, { useContext, useEffect } from 'react' // Import React and required hooks
import './Verify.css' // Import Verify page styles
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../components/context/StoreContext';
import axios from 'axios'; // Axios for making HTTP requests
const Verify = () => {
    const [searchParams,setSearchParams]=useSearchParams(); // Hook to access URL query parameters
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const {url} = useContext(StoreContext); // Get base URL from context
    const navigate = useNavigate();// Hook to programmatically redirect user

        // Function to verify payment with backend
    const verifyPayment = async ()=>{
        const response = await axios.post(url+"/api/order/verify",{success,orderId});
        if (response.data.success) {
            navigate("/myorders");
        }
        else{
            navigate("/")
        }
    }
    useEffect(()=>{
        verifyPayment();
    },[])
  return (
    <div className='verify'>
        <div className="spinner">

        </div>
      
    </div>
  )
}

export default Verify // Export the component
