import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Header from './Header';
import Footer from './Footer';
import AnimatedBackground from './AnimatedBackground'; 

function Dashboard() {
  const navigate = useNavigate();

  const handleButtonClick = (route) => {
    navigate(route);
  };

  return (
    <div className="dashboard">
      <AnimatedBackground /> 
      <Header />
      <main className="dashboard-main">
        <button onClick={() => handleButtonClick('/nursery')}>3-5 years</button>
        <button onClick={() => handleButtonClick('/primary')}>6-11 years</button>
        <button onClick={() => handleButtonClick('/secondary')}>13-15 years</button>
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;
