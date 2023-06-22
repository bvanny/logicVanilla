import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './VideoPreview.module.css';

export const VideoPreview = ({ src, buttonText, to, textVideo }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handleMouseLeave = () => {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  return (
    <div>
      <div className={styles.videoContainer}>
        <video
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={videoRef}
          src={src}
          muted
        ></video>
        {isPlaying ? null : <div className={styles.previewText}>Prévia</div>}
      </div>
      <Link className={styles.link} to={to}>{buttonText}</Link>
      <p className={styles.textVideo}>{textVideo}</p>
    </div>
  );
};
