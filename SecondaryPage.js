import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import './PrimaryPage.css';

function SecondaryPage() {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ rating, feedback });
    alert('Thank you for your feedback!');
    setRating(0);
    setFeedback('');
  };

  return (
    <div className="primary-page">
      <Header />
      <main className="content">
        <h1> Classes (10 - 12)</h1>

        <div className="video-section">
          <h2>Lesson 1: Math</h2>
          {/* <video controls width="600">
            <source src="/sample-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}
          <div className="video-container">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/X98-TJRMZRk?autoplay=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
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
          </div>

          <label><b>Feedback:</b></label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="4"
            placeholder="What did you think about the lesson?"
          ></textarea>

          <button type="submit">Submit Feedback</button>
        </form>
        <a href='/dashboard'>Back</a>
      </main>
      <Footer />
    </div>
  );
}

export default SecondaryPage;
