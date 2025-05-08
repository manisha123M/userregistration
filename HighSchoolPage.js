import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import './PrimaryPage.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HighSchoolPage() {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0); 
  const userEmail = localStorage.getItem('userEmail');

const navigate = useNavigate();

useEffect(() => {
  if (!userEmail) {
    alert('Please login to access this page.');
    navigate('/login');
  }
}, [userEmail, navigate]);


  const videoUrls = [
    'https://www.youtube.com/embed/s7j84alG-6Q',
    'https://www.youtube.com/embed/3igl7rqBpJE',
    'https://www.youtube.com/embed/-yCoIiMXDMI',
    'https://www.youtube.com/embed/a86niKCT6p0',
  ];

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
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoUrls.length); 
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videoUrls.length) % videoUrls.length);
  };

  return (
    <div className="primary-page">
      <Header />
      <main className="content">
        {/* <h1>Primary Classes (1 - 6)</h1> */}

        <div className="video-section">
          <h2>Lesson {currentVideoIndex + 1}</h2>
          <iframe
            width="560"
            height="315"
            src={videoUrls[currentVideoIndex]} 
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
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

          <button type="submit">Submit Feedback</button><br/>
          <a href='\dashboard'>BACK</a>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '3px' }}>
            <button type="button" onClick={prevVideo} style={buttonStyle}>Prev Video</button>
            <button type="button" onClick={handleNextVideo} style={buttonStyle}>Next Video</button>
          </div>
        </form>
      </main>
      <Footer />
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

export default HighSchoolPage;
