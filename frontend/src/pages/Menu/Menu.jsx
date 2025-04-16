import React, { useState } from 'react';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

const Menu = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  return (
    <>
      <FoodDisplay selectedCategories={selectedCategories} />
    </>
  );
};

export default Menu;
