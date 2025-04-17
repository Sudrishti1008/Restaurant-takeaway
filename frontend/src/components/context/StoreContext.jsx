import axios from "axios"; // For making HTTP requests
import { createContext, useEffect, useState } from "react"; // React core hooks
export const StoreContext=createContext(null);  // Create a new context called StoreContext

const StoreContextProvider=(props)=>{
    // Local state to track cart items as an object: { itemId: quantity }
const [cartItems,setCartItems]=useState({});
// API base URL
const url = "http://localhost:4000";
const [token,setToken]= useState(""); // Token state for authentication
const [food_list,setFoodList] = useState([]); // Store the full food list fetched from the backend

const addToCart= async (itemId)=>{
    // If item not already in cart, set to 1; otherwise,increase by 1
    if (!cartItems[itemId]) {
        setCartItems((prev)=>({...prev,[itemId]:1}))
    }
    else{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }
// If logged in, update server-side cart
    if (token) {
        await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
    }
}
const removeFromCart=async (itemId)=>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
    // If logged in, update server-side cart
    if (token) {
        await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
}

const getTotalCartAmount=()=>{
    let totalAmount=0;
    // Loop through cart items and calculate total
    for (const item in cartItems) {
        if (cartItems[item]>0) {
            let itemInfo =food_list.find((product)=>product._id===item); 
            totalAmount+=itemInfo.price* cartItems[item];
        }
        
    }
    return totalAmount;
}

const fetchFoodList= async ()=>{
    const response = await axios.get(url+"/api/food/list");
    setFoodList(response.data.data) // Store the fetched food items
}

const loadCartData = async (token)=>{
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
    setCartItems(response.data.cartData); // Set cart state based on response
}

useEffect(()=>{

async function loadData(){
    await fetchFoodList();
    if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
    }
}
loadData();
},[])

    const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider; // Export the provider