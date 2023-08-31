import React from "react";
import "./App.css";
import HumanPoseEstimation from "./HumanPoseEstimation";
import ImagePoseEstimation from "./ImagePoseEstimation";
import { useState, useEffect } from "react";
import CalculateEuclidean from "./CalculateEuclidean";
import Neymarpose2 from "./assets/Neymarpose2.jpg";
import BabyImage from "./assets/BabyImage.jpg";

const images = [
  { id: 1, image: Neymarpose2 },
  { id: 2, image: BabyImage },
];

function App() {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [currentHumanPose, setCurrentHumanPose] = useState(null);
  const [currentImagePose, setCurrentImagePose] = useState(null);
  const [isImageStored, setIsImageStored] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const [allImages, setAllImages] = useState(images);

  useEffect(() => {
    getNewImage();
  }, []);

  const getNewImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImage(images[randomIndex].image);
  };

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

  return (
    <div>
      <h1>Strike a Pose</h1>
      <HumanPoseEstimation
        setIsImageStored={setIsImageStored}
        isImageStored={isImageStored}
        onPoseDetected={setCurrentHumanPose}
      />
      <div>
        {console.log(currentHumanPose)}
        {/* Render the ImagePoseEstimation component */}
        <ImagePoseEstimation
          onImagePoseDetected={setCurrentImagePose}
          imageSrc={currentImage}
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
export default App;

//create an array of images , a separate compononet
//in this componet  a state the array of images and another state the current image in the app.jsx
// in this component you need a function to select a random image from the array
