import React from "react";
import Homepage from "./Homepage";
import GamePlay from "./GamePlay";
// import GameOver from "./GameOver";
import "./styling/App.css";
import HumanPoseEstimation from "./HumanPoseEstimation";
import ImagePoseEstimation from "./ImagePoseEstimation";

import CalculateEuclidean from "./CalculateEuclidean";

import Registration from "./authetication/Registration";
import Login from "./authetication/Login";
import { Routes, Route, Link } from "react-router-dom";

// the images array, i will delete that when we have ready the back end
// const images = [
//   { id: 1, image: Neymarpose2 },
//   { id: 2, image: BabyImage },
// ];

function App() {
  return (
    <div>
      <div className="routes">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/gameplay" element={<GamePlay />} />
          <Route path="/login" element={<Login />} />{" "}
          {/* Render the Login component for the root URL */}
          <Route path="/register" element={<Registration />} />{" "}
          {/* Render the Registration component */}
        </Routes>
      </div>
    </div>
  );
}
export default App;

//create an array of images , a separate compononet
//in this componet  a state the array of images and another state the current image in the app.jsx
// in this component you need a function to select a random image from the array
