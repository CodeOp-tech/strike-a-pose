import { useState } from "react";
import reactLogo from "./assets/react.svg";
import HumanPoseEstimation from "./HumanPoseEstimation";
import ImagePoseEstimation from "./ImagePoseEstimation";
import "./App.css";
import cosineSimilarity from "compute-cosine-similarity";

// test
// const keypoints = [
//   {
//     score: 0.9984681606292725,
//     part: "nose",
//     position: {
//       x: 52.81703621660492,
//       y: 265.77710823804574,
//     },
//   },
//   {
//     score: 0.9995760321617126,
//     part: "leftEye",
//     position: {
//       x: 60.97437247099259,
//       y: 255.36572367138774,
//     },
//   },
//   {
//     score: 0.9966634511947632,
//     part: "rightEye",
//     position: {
//       x: 39.77608381679017,
//       y: 247.53208342807955,
//     },
//   },
//   {
//     score: 0.9893418550491333,
//     part: "leftEar",
//     position: {
//       x: 78.27723558161077,
//       y: 272.3111336246102,
//     },
//   },
//   {
//     score: 0.9949092268943787,
//     part: "rightEar",
//     position: {
//       x: 16.913675912270868,
//       y: 249.17541884582903,
//     },
//   },
//   {
//     score: 0.9197858572006226,
//     part: "leftShoulder",
//     position: {
//       x: 69.32908175702028,
//       y: 313.59085685745845,
//     },
//   },
//   {
//     score: 0.9695993065834045,
//     part: "rightShoulder",
//     position: {
//       x: -4.370045773510628,
//       y: 311.57034701468297,
//     },
//   },
//   {
//     score: 0.9052721261978149,
//     part: "leftElbow",
//     position: {
//       x: 143.36872928042123,
//       y: 274.09413169178794,
//     },
//   },
//   {
//     score: 0.2568128705024719,
//     part: "rightElbow",
//     position: {
//       x: 486.31715581123245,
//       y: 237.50467978495323,
//     },
//   },
//   {
//     score: 0.6204021573066711,
//     part: "leftWrist",
//     position: {
//       x: 216.51458597406398,
//       y: 216.91677291774948,
//     },
//   },
//   {
//     score: 0.8187093138694763,
//     part: "rightWrist",
//     position: {
//       x: 29.80935892709146,
//       y: 343.8999662974272,
//     },
//   },
//   {
//     score: 0.1376447081565857,
//     part: "leftHip",
//     position: {
//       x: 64.98754540025351,
//       y: 423.13296883121103,
//     },
//   },
//   {
//     score: 0.09729085862636566,
//     part: "rightHip",
//     position: {
//       x: -1.9228205926332758,
//       y: 422.0989596868503,
//     },
//   },
//   {
//     score: 0.17095378041267395,
//     part: "leftKnee",
//     position: {
//       x: 86.08431192716459,
//       y: 357.30453522933993,
//     },
//   },
//   {
//     score: 0.08323641866445541,
//     part: "rightKnee",
//     position: {
//       x: 82.54768550117005,
//       y: 366.37749114799897,
//     },
//   },
//   {
//     score: 0.09980639815330505,
//     part: "leftAnkle",
//     position: {
//       x: 81.96260877778862,
//       y: 446.06200664306135,
//     },
//   },
//   {
//     score: 0.04973027482628822,
//     part: "rightAnkle",
//     position: {
//       x: 99.52415811476209,
//       y: 447.6828669113826,
//     },
//   },
// ];
// const data = {
//   score: 0.7395447473425198,
//   keypoints: [
//     {
//       score: 0.9989792108535767,
//       part: "nose",
//       position: {
//         x: 294.13866000045596,
//         y: 124.42334934338521,
//       },
//     },
//     {
//       score: 0.9993754029273987,
//       part: "leftEye",
//       position: {
//         x: 309.44099277837734,
//         y: 109.9177946691847,
//       },
//     },
//     {
//       score: 0.9983668923377991,
//       part: "rightEye",
//       position: {
//         x: 279.17596079310556,
//         y: 106.90178897130349,
//       },
//     },
//     {
//       score: 0.9611309766769409,
//       part: "leftEar",
//       position: {
//         x: 334.416069297939,
//         y: 109.93543584801344,
//       },
//     },
//     {
//       score: 0.8439347147941589,
//       part: "rightEar",
//       position: {
//         x: 259.9158631558548,
//         y: 110.39525108485833,
//       },
//     },
//     {
//       score: 0.9914633631706238,
//       part: "leftShoulder",
//       position: {
//         x: 356.8467100863327,
//         y: 168.75510486647312,
//       },
//     },
//     {
//       score: 0.9835211634635925,
//       part: "rightShoulder",
//       position: {
//         x: 242.760025677514,
//         y: 184.5574951171875,
//       },
//     },
//     {
//       score: 0.9633651375770569,
//       part: "leftElbow",
//       position: {
//         x: 487.70243413902904,
//         y: 207.30040838931785,
//       },
//     },
//     {
//       score: 0.9605314135551453,
//       part: "rightElbow",
//       position: {
//         x: 122.78756452627219,
//         y: 237.7421428517145,
//       },
//     },
//     {
//       score: 0.951704740524292,
//       part: "leftWrist",
//       position: {
//         x: 392.7552478359831,
//         y: 119.99512276853568,
//       },
//     },
//     {
//       score: 0.9743151664733887,
//       part: "rightWrist",
//       position: {
//         x: 194.526789921267,
//         y: 135.74962203326393,
//       },
//     },
//     {
//       score: 0.9256702661514282,
//       part: "leftHip",
//       position: {
//         x: 376.64763430584264,
//         y: 378.60264997074114,
//       },
//     },
//     {
//       score: 0.9422579407691956,
//       part: "rightHip",
//       position: {
//         x: 288.1615524588856,
//         y: 386.66519556899016,
//       },
//     },
//     {
//       score: 0.019467497244477272,
//       part: "leftKnee",
//       position: {
//         x: 453.92933292611565,
//         y: 452.08737099495374,
//       },
//     },
//     {
//       score: 0.029500899836421013,
//       part: "rightKnee",
//       position: {
//         x: 299.15198870113386,
//         y: 525.182605312956,
//       },
//     },
//     {
//       score: 0.013318915851414204,
//       part: "leftAnkle",
//       position: {
//         x: 357.16708552141597,
//         y: 436.376693072486,
//       },
//     },
//     {
//       score: 0.01535700261592865,
//       part: "rightAnkle",
//       position: {
//         x: 330.05530070145306,
//         y: 431.9477942796997,
//       },
//     },
//   ],
// };
export default function App() {
  function poseToVector(pose) {
    let vector = [];
    pose.forEach((keypoint) => {
      vector.push(keypoint.position.x, keypoint.position.y);
    });
    return vector;
  }
  function cosineDistanceMatching(poseVector1, poseVector2) {
    let cosSimilarity = cosineSimilarity(poseVector1, poseVector2);
    let distance = 2 * (1 - cosSimilarity);
    return Math.sqrt(distance);
  }
  const poseVector1 = poseToVector(keypoints);
  const dataVector = poseToVector(data.keypoints);
  const distance = cosineDistanceMatching(poseVector1, dataVector);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Distance: {distance}</h2>
    </div>
  );
}
