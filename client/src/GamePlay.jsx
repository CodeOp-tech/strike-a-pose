import React, { useState, useRef, useEffect } from "react";
import "./styling/App.css";
import Homepage from "./Homepage";
import HumanPoseEstimation from "./HumanPoseEstimation";
import ImagePoseEstimation from "./ImagePoseEstimation";
import CalculateEuclidean from "./CalculateEuclidean";
import gameplayMusic from "./assets/GameplayMusic.wav";
import gameframevid from "./assets/GameFrame.mp4";
import axios from "axios";
import { all } from "@tensorflow/tfjs";
import Registration from "./authetication/Registration";
import Login from "./authetication/Login";

function GamePlay() {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [currentHumanPose, setCurrentHumanPose] = useState(null);
  const [currentImagePose, setCurrentImagePose] = useState(null);
  const [isImageStored, setIsImageStored] = useState(false);
  const audioRef = useRef(null);

  const [currentImage, setCurrentImage] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturePose, setCapturePose] = useState(null);
  const [allImages, setAllImages] = useState([]); // create a state that is the images array

  //fecthing the images from the database
  const getAllImages = () => {
    fetch("/api/images")
      .then((response) => response.json())
      .then((imagesData) => {
        console.log(imagesData);
        setAllImages(imagesData);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };

  //function to get a random image
  const getNewImage = () => {
    const randomIndex = Math.floor(Math.random() * allImages.length);

    if (allImages.length) {
      console.log(allImages[randomIndex].image_url);
      setCurrentImage(allImages[randomIndex].image_url);
    }
  };

  console.log(currentImage);

  useEffect(() => {
    getAllImages();
    // getNewImage();
  }, []);

  useEffect(() => {
    getNewImage();
  }, [allImages]);

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
    <div>
      <video className="background-video" preload="auto" autoPlay loop muted>
        <source src={gameframevid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <audio ref={audioRef} preload="auto" loop autoPlay>
        <source src={gameplayMusic} type="audio/mp3" />
        Your browser does not support the audio tag.
      </audio>
      <div>
        {currentHumanPose ? (
          <CalculateEuclidean
            onCurrentHumanPose={currentHumanPose}
            onCurrentImagePose={currentImagePose}
            onSetCurrentHumanPose={setCurrentHumanPose}
            onGetNewImage={getNewImage}
            onSetIsCapturing={setIsCapturing}
            onSetIsImageStored={setIsImageStored}
            onSetCapturePose={setCapturePose}
          />
        ) : null}
        <div />

        <div className="pose-container">
          <HumanPoseEstimation
            setIsImageStored={setIsImageStored}
            isImageStored={isImageStored}
            isCapturing={isCapturing}
            setIsCapturing={setIsCapturing}
            onPoseDetected={setCurrentHumanPose}
            capturePose={capturePose}
            onSetCapturePose={setCapturePose}
          />
        </div>
        <div className="image-container">
          {console.log(currentHumanPose)}
          {/* Render the ImagePoseEstimation component */}
          {currentImage && (
            <ImagePoseEstimation
              onImagePoseDetected={setCurrentImagePose}
              imageSrc={currentImage}
            />
          )}
          {console.log(`This is the image pose ${currentImagePose}`)}
        </div>
        {/* <button onClick={handleButtonClick}>Play</button> */}
      </div>
    </div>
  );
}
export default GamePlay;
