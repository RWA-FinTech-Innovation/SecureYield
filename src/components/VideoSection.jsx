import React, { useState, useRef } from 'react';

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section id="flash" className="video-section">
      <div className="container">
        <div className="section-header reveal" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          <span className="kicker">SecureYield Flash</span>
          <h2>Watch the Full Story</h2>
          <p>From green electricity to verified, auditable, compliance-by-design RWA products — the complete narrative in two minutes.</p>
        </div>
        <div className="video-wrap reveal">
          <div className="video-player" id="videoPlayer">
            <video ref={videoRef} id="heroVideo" preload="metadata" playsInline style={{ width: '100%', display: 'block' }}>
              <source src="RWA_Flash.mp4" type="video/mp4"/>
              Your browser does not support HTML5 video.
            </video>
            {!isPlaying && (
              <div className="video-overlay" id="videoOverlay" onClick={handlePlayClick}>
                <div className="play-btn" aria-label="Play video">
                  <svg viewBox="0 0 24 24" fill="var(--bg-primary)">
                    <polygon points="6,3 20,12 6,21"/>
                  </svg>
                </div>
                <span className="video-overlay-label">Play SecureYield Flash</span>
              </div>
            )}
            <div className="video-corner video-corner--tl"></div>
            <div className="video-corner video-corner--tr"></div>
            <div className="video-corner video-corner--bl"></div>
            <div className="video-corner video-corner--br"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
