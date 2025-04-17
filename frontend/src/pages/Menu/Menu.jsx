import React, { useState } from 'react'; // Import React and the useState hook
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'; // Import the FoodDisplay component

const Menu = () => {
  // Local state to keep track of selected food categories (for filtering)
  const [selectedCategories, setSelectedCategories] = useState([]);

  return (
    <>
      <FoodDisplay selectedCategories={selectedCategories} />
    </>
  );
};

export default Menu; // Export the Menu component
