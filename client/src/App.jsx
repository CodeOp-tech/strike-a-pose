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
