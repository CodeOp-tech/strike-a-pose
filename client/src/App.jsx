import React from "react";
import "./App.css";
import HumanPoseEstimation from "./HumanPoseEstimation";
import ImagePoseEstimation from "./ImagePoseEstimation";
import { useState, useEffect } from "react";
import CalculateEuclidean from "./CalculateEuclidean";
import Neymarpose2 from "./assets/Neymarpose2.jpg";
import BabyImage from "./assets/BabyImage.jpg";

// the images array, i will delete that when we have ready the back end
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
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturePose, setCapturePose] = useState(null);

  const [allImages, setAllImages] = useState(images); // create a state that is the images array

  // call the function inside the use effect
  useEffect(() => {
    getNewImage();
  }, []);

  // function to get a new random image from the array
  const getNewImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImage(images[randomIndex].image);
    // setCurrentImagePose(null);
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
        isCapturing={isCapturing}
        setIsCapturing={setIsCapturing}
        onPoseDetected={setCurrentHumanPose}
        capturePose={capturePose}
        onSetCapturePose={setCapturePose}
      />
      <div>
        {console.log(`This is the human pose`, currentHumanPose)}
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
    </div>
  );
}
export default App;

//create an array of images , a separate compononet
//in this componet  a state the array of images and another state the current image in the app.jsx
// in this component you need a function to select a random image from the array
