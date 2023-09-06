import { useState } from "react";
import HumanPoseEstimation from "./HumanPoseEstimation";
import ImagePoseEstimation from "./ImagePoseEstimation";
import "./styling/App.css";
import cosineSimilarity from "compute-cosine-similarity";

export default function CalculateEuclidean({
  onCurrentHumanPose,
  onCurrentImagePose,
  onSetCurrentHumanPose,
  onGetNewImage,
  onSetIsCapturing,
  onSetIsImageStored,
  onSetCapturePose,
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
  function scrollToTop() {
    window.scrollTo(0, 0);
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
  let score = ""; // Initialize the score
  if (distance < 0.4) {
    score = "Good Result";
  } else if (distance >= 0.4) {
    score = "Bad Result";
  }
  console.log(score);
  console.log(distance);

  //this is the function that we call in the strike a new pose button
  const handleClick = () => {
    onGetNewImage();
    onSetCurrentHumanPose(null);
    onSetIsCapturing(false);
    onSetIsImageStored(null);
    onSetCapturePose(null);
    scrollToTop();
    score = "";
  };
  return (
    <div className="calc-euclidean">
      <h1>Hello CodeSandbox</h1>
      <h2>Distance: {distance}</h2>
      <h2>Score: {score}</h2> {/* Display the calculated score */}
      <button onClick={handleClick}>Strike another pose!</button>
      {console.log("humanPose", onCurrentHumanPose)}
      {console.log("imagePose", onCurrentImagePose)}
    </div>
  );
}
