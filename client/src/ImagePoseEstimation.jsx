import React, { useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import { drawKeypoints, drawSkeleton } from "./utilities";
import "./styling/HumanPoseEstimation.css";

const ImagePoseEstimation = ({ imageSrc, onImagePoseDetected }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (imageSrc) {
      async function runPoseEstimation() {
        const net = await posenet.load();

        const inputImage = new Image();
        inputImage.src = imageSrc;

        // Convert the onload callback to an async function
        inputImage.onload = async () => {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          canvas.width = inputImage.width;
          canvas.height = inputImage.height;

          const imagePose = await net.estimateSinglePose(inputImage);
          onImagePoseDetected(imagePose);

          drawCanvas(imagePose, ctx, canvas.width, canvas.height);
        };
      }

      function drawCanvas(imagePose, ctx, canvasWidth, canvasHeight) {
        // Clear canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Draw imagePose keypoints
        drawKeypoints(imagePose.keypoints, 0.6, ctx);
        console.log(imagePose.keypoints);

        // Draw imagePose skeleton
        drawSkeleton(imagePose.keypoints, 0.7, ctx);
      }

      // Call the imagePose estimation function
      runPoseEstimation();
    }
  }, [imageSrc]);

  return (
    <div className="pose-img">
      <img
        src={imageSrc}
        alt="imagePose Image"
        style={{
          width: "70%",
          objectFit: "contain",
          position: "relative",
          left: "0",
        }}
      />
      {/* image points */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default ImagePoseEstimation;
