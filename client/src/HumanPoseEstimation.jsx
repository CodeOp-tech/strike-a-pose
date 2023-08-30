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
import "./HumanPoseEstimation.css";

function HumanPoseEstimation({ onPoseDetected }) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturePose, setCapturePose] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false); // State for capturing delay

  const capture = useCallback(async () => {
    setIsCapturing(true);
    setTimeout(async () => {
      const capturedScreenshot = webcamRef.current.getScreenshot(); // Take the screenshot

      // Set the captured screenshot as capturePose
      setCapturePose(capturedScreenshot);

      // Load posenet and perform humanPose detection on the captured screenshot
      const net = await posenet.load({
        inputResolution: { width: 640, height: 480 },
        scale: 0.5,
      });
      const humanPose = await detect(net, capturedScreenshot);
      console.log("Last humanPose:", humanPose);
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
    if (isCapturing) {
      const net = await posenet.load({
        inputResolution: { width: 640, height: 480 },
        scale: 0.5,
      });
      setInterval(() => {
        detect(net);
      }, 100);
    }
  };

  const detect = async (net) => {
    try {
      if (
        !isCapturing &&
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

  runPosenet();

  return (
    <div className="app-container">
      <div className="webcam-container">
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
      </div>
      <div className="capture-container">
        {capturePose ? (
          <div className="captured-image">
            <img src={capturePose} alt="captured-humanPose" />
          </div>
        ) : null}
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
