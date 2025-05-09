import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Header from './Header';
import Footer from './Footer';
import AnimatedBackground from './AnimatedBackground';

function Dashboard() {
  const navigate = useNavigate();
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleClassButtonClick = (route) => {
    setSelectedRoute(route);
    setShowLanguageOptions(true);
    setShowPopup(false);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setShowPopup(true);

    setTimeout(() => {
      navigate(`${selectedRoute}?lang=${language}`);
    }, 2000);
  };

  return (
    <div className="dashboard">
      <AnimatedBackground />
      <Header />
      <main className="dashboard-main">
        <div className='button'>
          <h2><b>Choose Your Class</b></h2>
          <div className="button-container">
            <button onClick={() => handleClassButtonClick('/primary')}>1 - 6 Standard</button>
            <button onClick={() => handleClassButtonClick('/secondary')}>7 - 8 Standard</button>
            <button onClick={() => handleClassButtonClick('/seniors')}>10 - 12 Standard</button>
          </div>

          {showLanguageOptions && (
            <div className="language-section">
              <h3>Select a Language:</h3>
              <button onClick={() => handleLanguageSelect('english')}>English</button>
              <button onClick={() => handleLanguageSelect('hindi')}>Hindi</button>
              <button onClick={() => handleLanguageSelect('kannada')}>Kannada</button>
            </div>
          )}

          {showPopup && (
            <div className="popup-message">
              <p>Language selection successful!</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;
