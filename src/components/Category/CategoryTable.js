import { Link } from "react-router-dom";
import "./CategoryTable.css";
import React, { useState, useEffect } from "react";

const CategoryTable = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/category")
      .then((response) => response.json())
      .then((data) => setCategory(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container-fluid mt-4">
      <h1 className="text-center text-primary mb-4">Category Images</h1>
      <div className="category-container">
        {category.map((category) => (
          <div key={category.PD_ID} className="category-card">
            <Link to={`/products/category/${encodeURIComponent(category.CATEGORY_NAME)}`}>
              <img
                src={`/images/category${category.CD_ID}.jpg`}
                alt={category.CATEGORY_NAME}
                className="category-image"
              />
              <div className="category-name">{category.CATEGORY_NAME}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryTable;
