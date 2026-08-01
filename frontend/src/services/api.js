import axios from 'axios'

/**
 * services/api.js
 * -----------------------------------------------------------------------
 * Single source of truth for every network call this app makes. No
 * component should ever import axios directly or hardcode an endpoint —
 * that keeps the base URL, headers, and error handling in one place, and
 * means swapping in the real FastAPI backend later only touches this file.
 * -----------------------------------------------------------------------
 */

const apiClient = axios.create({
  // TODO:
  // Replace with your deployed FastAPI base URL, e.g. "https://api.anivision.ai"
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: 15000,
})

/**
 * predictImage
 * Sends an uploaded image to the classification endpoint and returns the
 * predicted class (Cat / Dog) with a confidence score.
 *
 * @param {FormData} formData - must contain the image under the "file" key
 * @returns {Promise<{ label: string, confidence: number, predictionTimeMs: number }>}
 */
export async function predictImage(formData) {
  try {
    const { data } = await apiClient.post("/predict/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error("Prediction Error:", error);

    throw (
      error.response?.data || {
        detail: "Something went wrong while predicting.",
      }
    );
  }
}
/**
 * getHistory
 * Fetches saved predictions for the History page.
 * @returns {Promise<Array>}
 */
export async function getHistory() {
  // TODO:
  // Connect FastAPI endpoint here.
  // const { data } = await apiClient.get('/history')
  // return data
  throw new Error('getHistory() is a placeholder — connect it to your FastAPI /history endpoint')
}

/**
 * deletePrediction
 * Removes a single prediction record by id.
 * @param {string} id
 */
export async function deletePrediction(id) {
  // TODO:
  // Connect FastAPI endpoint here.
  // await apiClient.delete(`/history/${id}`)
  throw new Error(
    'deletePrediction() is a placeholder — connect it to your FastAPI DELETE /history/:id endpoint',
  )
}

/**
 * getAnalytics
 * Fetches model performance metrics (accuracy, precision, recall, F1,
 * training/validation curves, confusion matrix, dataset stats).
 * @returns {Promise<Object>}
 */
export async function getAnalytics() {
  // TODO:
  // Connect FastAPI endpoint here.
  // const { data } = await apiClient.get('/analytics')
  // return data
  throw new Error('getAnalytics() is a placeholder — connect it to your FastAPI /analytics endpoint')
}

export default apiClient
