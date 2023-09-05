import React, { useState, useRef, useEffect } from "react";
import "./styling/App.css";
import HumanPoseEstimation from "./HumanPoseEstimation";
import ImagePoseEstimation from "./ImagePoseEstimation";
import CalculateEuclidean from "./CalculateEuclidean";
import gameplayMusic from "./assets/GameplayMusic.wav";
import gameframevid from "./assets/GameFrame.mp4";
import pose1 from "./assets/pose1.jpg";

function GamePlay() {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [currentHumanPose, setCurrentHumanPose] = useState(null);
  const [currentImagePose, setCurrentImagePose] = useState(null);
  const [isImageStored, setIsImageStored] = useState(false);
  const audioRef = useRef(null);

  const handleButtonClick = () => {
    setIsTimerActive(true);
  };

  useEffect(() => {
    let timer;
    if (isTimerActive) {
      timer = setTimeout(() => {
        detectFunction();
        setIsTimerActive(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isTimerActive]);

  // play music
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  return (
    <div className="main-container">
      <video className="background-video" preload="auto" autoPlay loop muted>
        <source src={gameframevid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <audio ref={audioRef} preload="auto" loop autoPlay>
        <source src={gameplayMusic} type="audio/mp3" />
        Your browser does not support the audio tag.
      </audio>

      <div className="pose-container">
        <HumanPoseEstimation
          setIsImageStored={setIsImageStored}
          isImageStored={isImageStored}
          onPoseDetected={setCurrentHumanPose}
        />
      </div>
      <div className="image-container">
        {console.log(currentHumanPose)}
        {/* Render the ImagePoseEstimation component */}
        <ImagePoseEstimation
          onImagePoseDetected={setCurrentImagePose}
          // imageSrc="/NeymarPose.jpg"
          imageSrc={pose1}
        />
        {console.log(`This is the image pose ${currentImagePose}`)}
      </div>
      {/* <button onClick={handleButtonClick}>Play</button> */}

      <div>
        {currentHumanPose ? (
          <CalculateEuclidean
            onCurrentHumanPose={currentHumanPose}
            onCurrentImagePose={currentImagePose}
          />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
export default GamePlay;
