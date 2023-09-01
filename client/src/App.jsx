import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import GamePlay from "./GamePlay";
// import GameOver from "./GameOver";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/gameplay" element={<GamePlay />} />
        {/* <Route path="/gameover" element={<GameOver />} /> */}
      </Routes>
    </div>
  );
}
