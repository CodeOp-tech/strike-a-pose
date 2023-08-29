//1 Install dependencies DONE
//2 Import dependencies DONE
//3 Set up web cam and canvas DONE
//4 define referencies to those DONE
//5 load pose net DOne
//6 detect function Done
//7 drawing utilities from tensor flow
//8 draw function

import { useState, useEffect, useCallback } from "react";
import "./App.css";
import React, { useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities";

function HumanPoseEstimation() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturePose, setCapturePose] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false); // State for capturing delay

  const capture = useCallback(() => {
    setIsCapturing(true);
    setTimeout(async () => {
      const capturedPose = await detect(); // Call the detect function directly
      setCapturePose(capturedPose);
      setIsCapturing(false);
      console.log("Last pose:", capturedPose); // Log the last pose data object
    }, 3000);
  }, []);

  // const capture = async () => {
  //   const capturedPose = await webcamRef.current.getScreenshot();
  //   setCapturePose(capturedPose);
  // };

  //Load posenet
  const runPosenet = async () => {
    const net = await posenet.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.5,
    });
    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async () => {
    try {
      const net = await posenet.load({
        inputResolution: { width: 640, height: 480 },
        scale: 0.5,
      });

      if (
        webcamRef.current &&
        webcamRef.current.video &&
        webcamRef.current.video.readyState === 4
      ) {
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        const pose = await net.estimateSinglePose(video);

        console.log(`This is a human pose ${pose}`);

        drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
        return pose;
      }
    } catch (error) {
      console.error("Error in detect function:", error);
    }
  };
  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose["keypoints"], 0.6, ctx);
    drawSkeleton(pose["keypoints"], 0.7, ctx);
  };

  runPosenet();

  return (
    <div>
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: 640,
          height: 480,
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
      <div className="container">
        {capturePose ? (
          <img src={capturePose} alt="captured-pose" />
        ) : (
          <Webcam height={600} width={600} ref={webcamRef} />
        )}
        <div className="btn-container">
          <button onClick={capture} disabled={isCapturing}>
            {isCapturing ? "Capturing..." : "Capture with 3s Delay"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default HumanPoseEstimation;
