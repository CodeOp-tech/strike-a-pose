import React from "react";
import "./App.css";
import videoPath from "./assets/strikeaposevid.mp4";
import musicPath from "./assets/HomeMusic.wav";
import { useRef, useEffect } from "react";
import { useState } from "react";
import popBonus from "./assets/popBonus.wav";

export default function Homepage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const clickSoundRef = useRef(null);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playClickSound = () => {
    return new Promise((resolve) => {
      clickSoundRef.current.play();
      clickSoundRef.current.onended = resolve;
    });
  };

  const handleButtonClick = async () => {
    await playClickSound();
    window.location.href = "/gameplay";
  };

  return (
    <div className="homepage-container">
      <video className="background-video" preload="auto" autoPlay loop muted>
        <source src={videoPath} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <audio ref={audioRef} preload="auto" loop>
        <source src={musicPath} type="audio/wav" />
        Your browser does not support the audio tag.
      </audio>

      <audio ref={clickSoundRef} preload="auto">
        {" "}
        {/* Audio element for the click sound */}
        <source src={popBonus} type="audio/wav" />
        Your browser does not support the audio tag.
      </audio>

      <div className="content-container">
        <div>
          <h1 className="neon-headline">Strike A Pose</h1>
        </div>
        <div>
          <button className="button" onClick={handleButtonClick}>
            PLAY
          </button>
        </div>
      </div>

      {/* Sound Icon */}
      <div
        onClick={toggleAudio}
        style={{
          cursor: "pointer",
          position: "absolute",
          top: "10px",
          right: "10px",
        }}
      >
        {isPlaying ? "🔊" : "🔇"}
      </div>
    </div>
  );
}
