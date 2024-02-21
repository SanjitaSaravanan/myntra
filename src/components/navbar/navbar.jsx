
import './navbar.css'
import logo from '../assets/shopcart.png'
import search_icon from '../assets/search.png'
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate();
    const [menu,setmenu] = useState("garme");
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearch = async() => {
      // Implement your search logic here, e.g., navigate to search results page
      navigate(`/SolarSearch/${searchQuery}`);
      const response = await fetch(`http://192.168.1.54:4000/search?q=${encodeURIComponent(searchQuery)}` );
            const data = await response.json();
           // setProducts(data);
            console.log('Search Results:', data);
          }
          const handlehome = ()=>{
            navigate(`/categorys`);
          }

    return (
  <div className='navbar'>
    <div className="nav-logo">
        <img src={logo} alt="logo-img" className="logo-image" onClick={handlehome}/>
    </div>
    <ul className="nav-menu">
        <li onClick={()=>{setmenu("garments");navigate(`/products/category/Garments`)}}>GARMENTS{menu==="garments"?<hr/>:<></>}</li>
        <li onClick={()=>{setmenu("kitchen");navigate(`/products/category/Kitchen`)}}>KITCHEN{menu==="kitchen"?<hr/>:<></>}</li>
        <li onClick={()=>{setmenu("cosmetics");navigate(`/products/category/Cosmetics`)}}>COSMETICS{menu==="cosmetics"?<hr/>:<></>}</li>
        <li onClick={()=>{setmenu("electronics");navigate(`/products/category/Electronics`)}}>ELECTRONICS{menu==="electronics"?<hr/>:<></>}</li>
        <li onClick={()=>{setmenu("dairy");navigate(`/products/category/Dairy`)}}>DAIRY{menu==="dairy"?<hr/>:<></>}</li>
        <li onClick={()=>{setmenu("grocery"); navigate(`/products/category/Groceries`)}}>GROCERY{menu==="grocery"?<hr/>:<></>}</li>
        <li onClick={()=>{setmenu("allproducts"); navigate('/products');}}>All Products{menu==="allproducts"?<hr/>:<></>}</li>
    </ul>
    <div className='searchbar'>
    <input type='text' placeholder='Search...' value={searchQuery} onInput={(e)=>setSearchQuery(e.target.value)} />
    <img src={search_icon} alt='search-icon' className='search-icon' onClick={handleSearch}/>
    </div>
  </div>
);
    }

export default Navbar