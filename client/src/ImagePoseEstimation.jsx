import React, { useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import { drawKeypoints, drawSkeleton } from "./utilities";

const ImagePoseEstimation = ({ imageSrc, onImagePoseDetected }) => {
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

        const imagePose = await net.estimateSinglePose(inputImage);
        onImagePoseDetected(imagePose);
        console.log(
          "This is the image imagePose" + JSON.stringify(imagePose, null, 2)
        );

        drawCanvas(imagePose, ctx, canvas.width, canvas.height);
      };
    }

    function drawCanvas(imagePose, ctx, canvasWidth, canvasHeight) {
      // Clear canvas
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Draw imagePose keypoints
      drawKeypoints(imagePose.keypoints, 0.6, ctx);

      // Draw imagePose skeleton
      drawSkeleton(imagePose.keypoints, 0.7, ctx);
    }

    // Call the imagePose estimation function
    runPoseEstimation();
  }, [imageSrc]);

  return (
    <div>
      <img src={imageSrc} alt="imagePose Image" style={{ maxWidth: "100%" }} />
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ImagePoseEstimation;

//passing props to stop detecting

// create a state in in app
//once you get the image captured you update the state in the app
//form the app you pass the state to thehuman pose that will create a condition based on the value of the state
