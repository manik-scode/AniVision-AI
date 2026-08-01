import { useCallback, useState } from "react";
import { usePredictionContext } from "../context/PredictionContext";
import { predictImage } from "../services/api";

export function usePrediction() {
  const { addPrediction } = usePredictionContext();

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const selectFile = useCallback((selected) => {
    setFile(selected);
    setPreviewUrl(selected ? URL.createObjectURL(selected) : null);
    setResult(null);
    setStatus("idle");
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setStatus("idle");
    setError(null);
  }, []);

  const runPrediction = useCallback(async () => {
    if (!file) return;

    setStatus("scanning");
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const data = await predictImage(formData);

      setResult(data);
      setStatus("done");

      addPrediction({
        label: data.label,
        confidence: data.confidence,
        predictionTimeMs: data.predictionTimeMs,
        fileName: file.name,
        imageUrl: previewUrl,
        timestamp: Date.now(),
      });
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        err.message ||
        "Prediction failed. Please try again."
      );

      setStatus("error");
    }
  }, [file, previewUrl, addPrediction]);

  return {
    file,
    previewUrl,
    status,
    result,
    error,
    selectFile,
    runPrediction,
    reset,
  };
}