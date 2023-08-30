import { useState } from "react";
import reactLogo from "./assets/react.svg";
import HumanPoseEstimation from "./HumanPoseEstimation";
import ImagePoseEstimation from "./ImagePoseEstimation";
import "./App.css";
import cosineSimilarity from "compute-cosine-similarity";

// we need to take the pose of the humanposeestimation comp and the pose of the imageposeestimation component and compare
//this 2

export default function CalculateEuclidean({
  onCurrentHumanPose,
  onCurrentImagePose,
}) {
  function poseToVector(pose) {
    let vector = [];
    console.log(pose.keypoints);
    pose.keypoints.forEach((keypoint) => {
      vector.push(keypoint.position.x, keypoint.position.y);
    });
    console.log(vector);
    return vector;
  }
  function cosineDistanceMatching(poseVector1, poseVector2) {
    let cosSimilarity = cosineSimilarity(poseVector1, poseVector2);
    let distance = 2 * (1 - cosSimilarity);
    return Math.sqrt(distance);
  }
  const humanPoseVector = poseToVector(onCurrentHumanPose);
  const imagePoseVector = poseToVector(onCurrentImagePose);
  console.log(humanPoseVector);
  console.log(imagePoseVector);
  const distance = cosineDistanceMatching(humanPoseVector, imagePoseVector);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Distance: {distance}</h2>
      {console.log("humanPose", onCurrentHumanPose)}
      {console.log("imagePose", onCurrentImagePose)}
    </div>
  );
}
