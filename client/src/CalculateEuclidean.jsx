import { useState, useEffect } from "react";
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
  const [result, setResult] = useState([]);
  const [distance, setDistance] = useState(null);
  const [score, setScore] = useState(0);

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
  useEffect(() => {
    // Calculate and set the distance
    const newDistance = cosineDistanceMatching(
      humanPoseVector,
      imagePoseVector
    );
    setDistance(newDistance);

    // Update the score based on the distance
    if (newDistance < 0.4) {
      setScore((prevScore) => prevScore + 2);
    } else {
      setScore((prevScore) => prevScore + 1);
    }
  }, [humanPoseVector, imagePoseVector]);

  // Update the result history separately
  useEffect(() => {
    setResult((prevHistory) => [...prevHistory, { score }]);
  }, [score]);
  //this is the function that we call in the strike a new pose button
  const handleClick = () => {
    onGetNewImage();
    onSetCurrentHumanPose(null);
    onSetIsCapturing(false);
    onSetIsImageStored(null);
    onSetCapturePose(null);
    scrollToTop();
  };
  return (
    <div className="CalcEuclidean">
      <h1>Hello CodeSandbox</h1>
      <h2>Distance: {distance}</h2>
      <h2>Score: {score}</h2> {/* Display the calculated score */}
      <button onClick={handleClick}>Strike another pose!</button>
      {console.log("humanPose", onCurrentHumanPose)}
      {console.log("imagePose", onCurrentImagePose)}
      {/* Render the history */}
      <div>
        <h2>Total:</h2>
        <ul>
          {result.map((entry, index) => (
            <li key={index}>Score: {entry.score}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
