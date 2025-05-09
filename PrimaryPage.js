import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import './PrimaryPage.css';
import { useNavigate, useLocation } from 'react-router-dom';

function PrimaryPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const langParam = queryParams.get('lang') || 'english';
  const formattedLanguage = langParam.charAt(0).toUpperCase() + langParam.slice(1).toLowerCase();

  const [language] = useState(formattedLanguage);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    if (!userEmail) {
      alert('Please login to access this page.');
      navigate('/login');
    }
  }, [userEmail, navigate]);

  useEffect(() => {
    setShowPopup(true);
    const timer = setTimeout(() => setShowPopup(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const videoUrls = {
    English: [
      'https://www.youtube.com/embed/lNhCiXoR-5k',
      'https://www.youtube.com/embed/D_cvJPPAlck',
      'https://www.youtube.com/embed/7zKuRqVTL6o',
      'https://www.youtube.com/embed/9tSsjKkk_oQ',
    ],
    Hindi: [
      'https://www.youtube.com/embed/iGqQahWV-xA',
      'https://www.youtube.com/embed/KannadaVideo2',
      'https://www.youtube.com/embed/KannadaVideo3',
      'https://www.youtube.com/embed/KannadaVideo4',
    ],
    Kannada: [
      'https://www.youtube.com/embed/HindiVideo1',
      'https://www.youtube.com/embed/HindiVideo2',
      'https://www.youtube.com/embed/HindiVideo3',
      'https://www.youtube.com/embed/HindiVideo4',
    ],
  };

  const selectedVideos = videoUrls[language] || [];
  const videoSrc = selectedVideos.length > 0 ? selectedVideos[currentVideoIndex] : '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/primary-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          lessonNumber: currentVideoIndex + 1,
          rating,
          feedback,
        }),
      });

      if (response.ok) {
        alert('Thank you for your feedback!');
        setRating(0);
        setFeedback('');
      } else {
        alert('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Feedback error:', error);
      alert('An error occurred. Try again later.');
    }
  };

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % selectedVideos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + selectedVideos.length) % selectedVideos.length);
  };

  return (
    <div className="primary-page">
      <Header />
      <main className="content">
        <div className="video-section">
          <h2>Lesson {currentVideoIndex + 1} ({language})</h2>
          {videoSrc ? (
            <iframe
              width="560"
              height="315"
              src={videoSrc}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ) : (
            <p>No videos available for the selected language.</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="feedback-section">
          <label><b>Rating:</b></label>
          <div className="stars">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={(hover || rating) > index ? 'colored' : 'uncolored'}
                onClick={() => setRating(index + 1)}
                onMouseEnter={() => setHover(index + 1)}
                onMouseLeave={() => setHover(0)}
              >
                &#9733;
              </span>
            ))}
          </div><br/>

          <label><b>Feedback:</b></label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="4"
            placeholder="What did you think about the lesson?"
          ></textarea>

          <button type="submit">Submit Feedback</button><br />
          <a href="/dashboard">BACK</a>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '3px' }}>
            <button type="button" onClick={prevVideo} style={buttonStyle}>Prev Video</button>
            <button type="button" onClick={handleNextVideo} style={buttonStyle}>Next Video</button>
          </div>
        </form>
      </main>
      <Footer />

      {showPopup && (
        <div style={popupStyle}>
          <div style={popupContentStyle}>
            <h3>Language: {language}</h3>
            <p>Now showing lessons in {language}.</p>
            <button onClick={() => setShowPopup(false)} style={popupCloseStyle}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  textAlign: 'center',
  cursor: 'pointer',
  minWidth: '100px',
};

const popupStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const popupContentStyle = {
  background: '#fff',
  padding: '20px',
  borderRadius: '10px',
  textAlign: 'center',
};

const popupCloseStyle = {
  padding: '5px 10px',
  backgroundColor: '#f44336',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default PrimaryPage;
