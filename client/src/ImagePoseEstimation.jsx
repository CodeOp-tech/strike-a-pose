import React, { useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import { drawKeypoints, drawSkeleton } from "./utilities";

const ImagePoseEstimation = ({ imageSrc }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
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

        const pose = await net.estimateSinglePose(inputImage);

        drawCanvas(pose, ctx, canvas.width, canvas.height);
      };
    }

    function drawCanvas(pose, ctx, canvasWidth, canvasHeight) {
      // Clear canvas
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Draw pose keypoints
      drawKeypoints(pose.keypoints, 0.6, ctx);

      // Draw pose skeleton
      drawSkeleton(pose.keypoints, 0.7, ctx);
    }

    // Call the pose estimation function
    runPoseEstimation();
  }, [imageSrc]);

  return (
    <div>
      <img src={imageSrc} alt="Pose Image" style={{ maxWidth: "100%" }} />
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ImagePoseEstimation;
