//1 Install dependencies DONE
//2 Import dependencies DONE
//3 Set up web cam and canvas DONE
//4 define referencies to those DONE
//5 load humanPose net DOne
//6 detect function Done
//7 drawing utilities from tensor flow
//8 draw function

import { useState, useEffect, useCallback } from "react";
import "./styling/App.css";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities";
import "./styling/HumanPoseEstimation.css";

function HumanPoseEstimation({
  onPoseDetected,
  setIsImageStored,
  isImageStored,
  isCapturing,
  setIsCapturing,
  capturePose,
  onSetCapturePose,
}) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [poseEstimationActive, setPoseEstimationActive] = useState(true);
  const [countdown, setCountdown] = useState(null);
  const DEFAULT_VIDEO_WIDTH = 600;
  const DEFAULT_VIDEO_HEIGHT = 400;
  const intervalRef = useRef(null);
  const [netState, setNetState] = useState(null);

  const detect = useCallback(
    async (net) => {
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
    },
    [isImageStored]
  );

  const capture = useCallback(async () => {
    setIsCapturing(true);
    setCountdown(3); // Start the countdown
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    setTimeout(async () => {
      const capturedScreenshot = webcamRef.current.getScreenshot(); // Take the screenshot
      // Set the captured screenshot as capturePose
      onSetCapturePose(capturedScreenshot);
      //we didnt need to load detect here one more time

      // Load posenet and perform humanPose detection on the captured screenshot
      // const net = await posenet.load({
      //   inputResolution: { width: 640, height: 480 },
      //   scale: 0.5,
      // });
      const humanPose = await detect(netState, capturedScreenshot);
      setIsImageStored(true);
      onPoseDetected(humanPose);
      setIsCapturing(false);
    }, 3000);
  }, [detect, onPoseDetected, setIsImageStored, netState]);

  const drawCanvas = (humanPose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(humanPose["keypoints"], 0.6, ctx);
    drawSkeleton(humanPose["keypoints"], 0.7, ctx);
  };

  // Load
  useEffect(() => {
    const runPoseNet = async () => {
      const net = await posenet.load({
        inputResolution: { width: 640, height: 480 },
        scale: 0.5,
      });
      setNetState(net);
    };
    runPoseNet();
  }, []);

  // Detect
  useEffect(() => {
    if (!netState) {
      return;
    }
    intervalRef.current = setInterval(() => {
      // Check if pose estimation should continue
      if (!isImageStored) {
        detect(netState);
      } else {
        clearInterval(intervalRef.current);
      }
    }, 100);

    return () => clearInterval(intervalRef.current);
  }, [netState, isImageStored, detect]);

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
