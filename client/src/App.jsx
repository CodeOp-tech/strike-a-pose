import React from "react";
import "./App.css";
import HumanPoseEstimation from "./HumanPoseEstimation";
import ImagePoseEstimation from "./ImagePoseEstimation";
import { useState, useEffect } from "react";
import CalculateEuclidean from "./CalculateEuclidean";

function App() {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [currentHumanPose, setCurrentHumanPose] = useState(null);
  const [currentImagePose, setCurrentImagePose] = useState(null);
  const [isImageStored, setIsImageStored] = useState(false);

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
          imageSrc="/NeymarPose.jpg"
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
