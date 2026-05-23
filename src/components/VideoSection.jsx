import { useState, useRef } from 'react';

const VideoSection = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const videoRef = useRef(null);
  const videoSrc = `${import.meta.env.BASE_URL}RWA_Flash.mp4`;

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.ended) video.currentTime = 0;
    video.play();
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
            <video
              ref={videoRef}
              id="heroVideo"
              preload="none"
              playsInline
              controls
              onPlay={() => {
                setHasStarted(true);
                setIsEnded(false);
              }}
              onEnded={() => {
                setIsEnded(true);
              }}
              style={{ width: '100%', display: 'block' }}
            >
              <source src={videoSrc} type="video/mp4"/>
              Your browser does not support HTML5 video.
            </video>
            {(!hasStarted || isEnded) && (
              <div
                className="video-overlay"
                id="videoOverlay"
                role="button"
                tabIndex={0}
                aria-label={!hasStarted ? 'Play video' : 'Replay video'}
                onClick={handlePlay}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handlePlay();
                  }
                }}
              >
                <div className="play-btn" aria-label="Play video">
                  <svg viewBox="0 0 24 24" fill="var(--bg-primary)">
                    <polygon points="6,3 20,12 6,21"/>
                  </svg>
                </div>
                <span className="video-overlay-label">{!hasStarted ? 'Play SecureYield Flash' : 'Replay SecureYield Flash'}</span>
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
