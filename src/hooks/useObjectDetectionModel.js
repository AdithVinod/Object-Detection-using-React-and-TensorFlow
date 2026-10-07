import React, { useEffect, useState, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

function useObjectDetectionModel() {
  const [model, setModel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    async function loadmodel() {
      try {
        setIsLoading(true);
        setError(null);
        await tf.ready();
        const loadedModel = await cocoSsd.load();

        setModel(loadedModel);
      } catch (error) {
        console.error("Failed to load object detection model: ",error);
        setError("Couldn't load the AI model. Check your internet connection and refresh the page.");
      }
      finally{
        setIsLoading(false);
      }
    }
    loadmodel();
  },[]);

  return {model, isLoading, error};
}

export default useObjectDetectionModel;
