import React from "react";
import "./App.css";
import HumanPoseEstimation from "./HumanPoseEstimation";
import ImagePoseEstimation from "./ImagePoseEstimation";
import { useState, useEffect } from "react";

function App() {
  const [isTimerActive, setIsTimerActive] = useState(false);

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
      <HumanPoseEstimation />
      <div>
        {/* Render the ImagePoseEstimation component */}
        <ImagePoseEstimation imageSrc="/NeymarPose.jpg" />
      </div>
      {/* <button onClick={handleButtonClick}>Play</button> */}
    </div>
  );
}
export default App;
