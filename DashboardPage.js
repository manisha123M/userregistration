import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Header from './Header';
import Footer from './Footer';
import AnimatedBackground from './AnimatedBackground'; 

function Dashboard() {
  const[showVideo,setShowVideo]=useState(false);
  const navigate = useNavigate();

  const handleButtonClick = (route) => {
    if(route=== '/nursery'){
      setShowVideo(true);
    }else{
    navigate(route);}
  };

  return (
    <div className="dashboard">
      <AnimatedBackground /> 
      <Header />
      <main className="dashboard-main">
        <div className="button">
      <h2><b>Choose the domain you want</b></h2>
  <div className="button-container">
    <button onClick={() => handleButtonClick('/nursery')}>3-5 years</button>
    <button onClick={() => handleButtonClick('/primary')}>6-11 years</button>
    <button onClick={() => handleButtonClick('/secondary')}>13-15 years</button>
  </div></div>
  {showVideo && (
  <div className="video-container">
    <iframe
      width="640"
      height="360"
      src="https://www.youtube.com/embed/p3AdDBsR9Os?autoplay=1"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
)}

</main>

      <Footer />
    </div>
  );
}

export default Dashboard;
