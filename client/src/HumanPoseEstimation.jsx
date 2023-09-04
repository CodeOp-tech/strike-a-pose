//1 Install dependencies DONE
//2 Import dependencies DONE
//3 Set up web cam and canvas DONE
//4 define referencies to those DONE
//5 load humanPose net DOne
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

function HumanPoseEstimation({
  onPoseDetected,
  setIsImageStored,
  isImageStored,
}) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturePose, setCapturePose] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false); // State for capturing delay
  const [poseEstimationActive, setPoseEstimationActive] = useState(true);
  const [countdown, setCountdown] = useState(null);
  const DEFAULT_VIDEO_WIDTH = 865;
  const DEFAULT_VIDEO_HEIGHT = 485;

  // const [mirrored, setMirrored] = useState(false); // state for mirroring the webcam

  const capture = useCallback(async () => {
    setPoseEstimationActive(false);
    setIsCapturing(true);
    setCountdown(3); // Start the countdown
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    setTimeout(async () => {
      clearInterval(timer); // Stop the countdown timer
      const capturedScreenshot = webcamRef.current.getScreenshot();
      setCapturePose(capturedScreenshot);
      const net = await posenet.load({
        inputResolution: { width: 640, height: 480 },
        scale: 0.5,
      });
      const humanPose = await detect(net, capturedScreenshot);
      setIsImageStored(true);
      onPoseDetected(humanPose);
      setIsCapturing(false);
    }, 3000);
  }, []);

  // const capture = async () => {
  //   const capturedPose = await webcamRef.current.getScreenshot();
  //   setCapturePose(capturedPose);
  // };

  //Load posenet
  const runPosenet = async () => {
    const net = await posenet.load({
      inputResolution: { width: 320, height: 240 }, // Adjusted to be smaller
      scale: 0.5,
    });

    const intervalId = setInterval(() => {
      // Check if pose estimation should continue
      if (!isImageStored && poseEstimationActive) {
        detect(net);
      }
    }, 100);

    // Clear interval when component unmounts or when capture starts
    return () => clearInterval(intervalId);
  };

  const detect = async (net) => {
    if (!poseEstimationActive) {
      return;
    }
    try {
      if (
        !isImageStored &&
        webcamRef.current &&
        webcamRef.current.video &&
        webcamRef.current.video.readyState === 4
      ) {
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        const humanPose = await net.estimateSinglePose(video);

        console.log(`This is a human humanPose ${humanPose}`);

        drawCanvas(humanPose, video, videoWidth, videoHeight, canvasRef);
        return humanPose;
      }
    } catch (error) {
      console.error("Error in detect function:", error);
    }
  };

  const drawCanvas = (humanPose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(humanPose["keypoints"], 0.6, ctx);
    drawSkeleton(humanPose["keypoints"], 0.7, ctx);
  };
  useEffect(() => {
    runPosenet();
  }, []);

  return (
    <div className="hp-container">
      <div className="webcam-container">
        <Webcam
          ref={webcamRef}
          videoConstraints={{
            width: DEFAULT_VIDEO_WIDTH,
            height: DEFAULT_VIDEO_HEIGHT,
          }}
          style={{
            position: "absolute",
            top: "50%",
            left: "63%",
            transform: "translate(-63%, -50%)",
            zIndex: 9,
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: "50%", // Adjust vertical positioning
            left: "63%", // Adjust horizontal positioning
            transform: "translate(-63%, -50%)", // Center the element
            zIndex: 9,
          }}
        />
      </div>
      <div className="capture-container">
        {capturePose ? (
          <div className="captured-image">
            <img src={capturePose} alt="captured-humanPose" />
          </div>
        ) : null}
        <div className="btn-container">
          <button
            onClick={capture}
            disabled={isCapturing}
            style={{
              position: "relative",
              top: "270px",
              right: "75px",
              backgroundColor: "gray",
            }}
          >
            {isCapturing ? "Capturing..." : "Capture with 3s Delay"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default HumanPoseEstimation;
