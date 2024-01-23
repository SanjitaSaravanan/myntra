import React, { useState } from 'react';
import './sidebar.css'; // Import your CSS file for styling
import CategoryTable from '../Category/CategoryTable';
import ProductList from '../Products/ProductList';
import CategoryProducts from '../CategoryProducts/CategoryProducts';

const SidenavBar = () => {
  const categories = ['Category 1', 'Category 2', 'Category 3'];
  const products = ['Product 1', 'Product 2', 'Product 3'];

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleProductChange = (product) => {
    if (selectedProducts.includes(product)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== product));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  return (
    <div className="flex-container">
      <div className="side-navbar">
        <h2>Categories</h2>
        {categories.map((category) => (
          <div key={category}>
            <input
              type="checkbox"
              id={category}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
        <h2>Products</h2>
        {products.map((product) => (
          <div key={product}>
            <input
              type="checkbox"
              id={product}
              checked={selectedProducts.includes(product)}
              onChange={() => handleProductChange(product)}
            />
            <label htmlFor={product}>{product}</label>
          </div>
        ))}
      </div>
      <div className="main-content">
        <CategoryProducts/>
      </div>
    </div>
  );
};

export default SidenavBar;
