import React from 'react';
import './Home.css';
import hand_icon from '../assets/Fashion-Woman-PNG-Transparent.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/categorys');
  };
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>
          <div className="hand-hand-icon">
            <p>new</p>
            <p>Collections</p>
            <p>For Everyone</p>
          </div>
          <div className="hero-latest-btn">
            <div><button onClick={handleClick}>Explore Category Catalog</button></div>
          </div>
        </h2>
      </div>
      <div className="hero-right">
        <img src={hand_icon} alt="hand icon" />
      </div>
    </div>
  );
}

export default Home;
