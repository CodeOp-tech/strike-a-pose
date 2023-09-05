import React from "react";
import "./App.css";
import Homepage from "./Homepage";
import GamePlay from "./GamePlay";
// import GameOver from "./GameOver";
import "./styling/App.css";
import HumanPoseEstimation from "./HumanPoseEstimation";
import ImagePoseEstimation from "./ImagePoseEstimation";
import { useState, useEffect } from "react";
import CalculateEuclidean from "./CalculateEuclidean";
import axios from "axios";
import { all } from "@tensorflow/tfjs";
import Registration from "./authetication/Registration";
import Login from "./authetication/Login";
import { Routes, Route, Link } from "react-router-dom"; // Import Routes and Route

// the images array, i will delete that when we have ready the back end
// const images = [
//   { id: 1, image: Neymarpose2 },
//   { id: 2, image: BabyImage },
// ];

function App() {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [currentHumanPose, setCurrentHumanPose] = useState(null);
  const [currentImagePose, setCurrentImagePose] = useState(null);
  const [isImageStored, setIsImageStored] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturePose, setCapturePose] = useState(null);

  const [allImages, setAllImages] = useState([]); // create a state that is the images array

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

export default function App() {
  return (
<>

      <div className="routes">
        <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/gameplay" element={<GamePlay />} />
          <Route path="/login" element={<Login />} />{" "}
          {/* Render the Login component for the root URL */}
          <Route path="/register" element={<Registration />} />{" "}
          {/* Render the Registration component */}
        </Routes>
      </div>
      <h1>Strike a Pose</h1>
      <HumanPoseEstimation
        setIsImageStored={setIsImageStored}
        isImageStored={isImageStored}
        isCapturing={isCapturing}
        setIsCapturing={setIsCapturing}
        onPoseDetected={setCurrentHumanPose}
        capturePose={capturePose}
        onSetCapturePose={setCapturePose}
      />
      <div>
        {console.log(`This is the human pose`, currentHumanPose)}
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
        ) : (
          <div />
        )}
      </div>
    </>
  );
}
export default App;

//create an array of images , a separate compononet
//in this componet  a state the array of images and another state the current image in the app.jsx
// in this component you need a function to select a random image from the array
