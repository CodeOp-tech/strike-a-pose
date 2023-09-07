import { useState, useEffect } from "react";
import HumanPoseEstimation from "./HumanPoseEstimation";
import ImagePoseEstimation from "./ImagePoseEstimation";
import "./styling/App.css";
import cosineSimilarity from "compute-cosine-similarity";
import "./styling/CalculateEuclidean.css";

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

  let times = 0;

  useEffect(() => {
    times++;
    console.log("use effect being called ", times);
    console.log("humanpose changed", onCurrentHumanPose);
    // Calculate and set the distance
    const humanPoseVector = poseToVector(onCurrentHumanPose);
    const imagePoseVector = poseToVector(onCurrentImagePose);
    const newDistance = cosineDistanceMatching(
      humanPoseVector,
      imagePoseVector
    );
    setDistance(newDistance);
    let newScore;
    if (newDistance < 0.4) {
      newScore = 0 + 2;
    } else {
      newScore = 0 + 1;
    }

    setResult((prevScore) => [...prevScore, { score: newScore }]);
    setScore(newScore);
  }, [onCurrentHumanPose]);

  // Function to calculate cosine distance
  function cosineDistanceMatching(poseVector1, poseVector2) {
    let cosSimilarity = cosineSimilarity(poseVector1, poseVector2);
    let distance = 2 * (1 - cosSimilarity);
    return Math.sqrt(distance);
  }

  // Function to calculate the total score
  function calculateTotalScore() {
    return result.reduce((total, entry) => total + entry.score, 0);
  }
  //this is the function that we call in the strike a new pose button
  const handleClick = () => {
    onGetNewImage();
    //onSetCurrentHumanPose(null);
    onSetIsCapturing(false);
    onSetIsImageStored(null);
    onSetCapturePose(null);
    scrollToTop();
  };
  return (
    <div className="calc-euclidean">
      <h1>Hello!</h1>
      <h2>Distance: {distance}</h2>
      <h2>Score: {score}</h2> {/* Display the calculated score */}
      <h2>Total Score: {calculateTotalScore()}</h2>
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
