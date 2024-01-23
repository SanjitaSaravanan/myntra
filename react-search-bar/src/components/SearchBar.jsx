import React from 'react';
import {FaSearch} from "react-icons/fa"
import { useState } from 'react';

const SearchBar=({setResults})=> {
    const [input, setInput] = useState("");
    const fetchData = (value)=>{
        fetch(`https://jsonplaceholder.typicode.com/users`)
        .then((response) =>response.json())
        .then((json)=>{
           const results = json.filter((user) =>{
            return (value && 
            user && 
            user.name && 
            user.name.toLowerCase().includes(value)
           );
           });
           setResults(results);
        });
    };
    const handleChange =(value=>{
        setInput(value);
        fetchData(value);
    })
  return (
    <div className="input-wrapper">
     <FaSearch id="searchicon"/>
     <input placeholder="Search brand, category..." value={input} onChange={(e) => handleChange(e.target.value)}/>
    </div>
  );
}

export default SearchBar;