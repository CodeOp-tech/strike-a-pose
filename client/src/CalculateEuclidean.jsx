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
    pose.keypoints.forEach((keypoint) => {
      vector.push(keypoint.position.x, keypoint.position.y);
    });
    return vector;
  }
  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
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
    return parseFloat(Math.sqrt(distance).toFixed(2));
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
      <div>
        <h2>Distance: {distance}</h2>
        <h2>Score: {score}</h2> {/* Display the calculated score */}
        <h2>Total Score: {calculateTotalScore()}</h2>
        <button onClick={handleClick}>Strike another pose!</button>
        {/* Render the history */}
        <div>
          <h2>Total:</h2>
          {result.map((entry, index) => (
            <p key={index}>Score: {entry.score}</p>
          ))}
        </div>{" "}
      </div>
    </div>
  );
}
