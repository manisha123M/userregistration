import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Header from './Header';
import Footer from './Footer';
import AnimatedBackground from './AnimatedBackground'; 

function Dashboard() {
  const navigate = useNavigate();

  const handleButtonClick = (route) => {
    navigate(route);}
  return (
    <div className="dashboard">
      <AnimatedBackground /> 
      <Header />
      <main className="dashboard-main">
        <div className='button'>
      <h2><b>Choose Your class</b></h2>
  <div className="button-container">
    <button onClick={() => handleButtonClick('/nursery')}>1 -6 Standard</button>
    <button onClick={() => handleButtonClick('/primary')}>7-8 Standard</button>
    <button onClick={() => handleButtonClick('/secondary')}>10 -12 Standard</button>
  </div></div>
</main>

      <Footer />
    </div>
  );
}
export default Dashboard;
