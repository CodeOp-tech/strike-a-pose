import React from "react";
import "./App.css";
import PoseEstimation from "./PoseEstimation";
import ImagePoseEstimation from "./ImagePoseEstimation";

function App() {
  return (
    <div>
      <h1>Strike a Pose</h1>
      <PoseEstimation />
      <div>
        {/* Render the ImagePoseEstimation component */}
        <ImagePoseEstimation imageSrc="/NeymarPose.jpg" />
      </div>
    </div>
  );
}
export default App;
