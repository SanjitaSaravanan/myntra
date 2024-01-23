import React from "react";
import { BrowserRouter as Router,Route,Routes,Redirect, Switch } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Homepage from "./components/Homepage";
import Category from "./components/Category/Category";
import Products from "./components/Products/Products";
import CategoryProduct from "./components/CategoryProducts/CategoryProduct";
import CategoryTable from "./components/Category/CategoryTable";
import SolarSearch from "./components/SolarSearch";

function App() {
  return (
    <div> 
    <Router>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Homepage/>}  />
      <Route path="/categorys" element={<Category/>}  />
      <Route path="/products" element={<Products/>}  />
      <Route path="/SolarSearch/:searchTerm" element={<SolarSearch/>}/>
      <Route path="/products/category/:category" element={<CategoryProduct/>} />
    </Routes>
    </Router>
  </div>
  );
}

export default App;
