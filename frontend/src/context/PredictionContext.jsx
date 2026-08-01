import { createContext, useContext, useMemo, useState, useCallback } from 'react'

const PredictionContext = createContext(null)

/**
 * PredictionProvider
 * Holds the in-memory prediction history so the Predict page can push new
 * results and the History page can read/search/delete them without prop
 * drilling. Swap the seed data for real persisted results once the FastAPI
 * backend is connected (see services/api.js).
 */
export function PredictionProvider({ children }) {
  const [history, setHistory] = useState(seedHistory)

  const addPrediction = useCallback((entry) => {
    setHistory((prev) => [{ id: crypto.randomUUID(), ...entry }, ...prev])
  }, [])

  const deletePrediction = useCallback((id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const value = useMemo(
    () => ({ history, addPrediction, deletePrediction }),
    [history, addPrediction, deletePrediction],
  )

  return <PredictionContext.Provider value={value}>{children}</PredictionContext.Provider>
}

export function usePredictionContext() {
  const ctx = useContext(PredictionContext)
  if (!ctx) {
    throw new Error('usePredictionContext must be used within a PredictionProvider')
  }
  return ctx
}

function seedHistory() {
  return [
    {
      id: crypto.randomUUID(),
      label: 'Dog',
      confidence: 98.4,
      imageUrl: null,
      fileName: 'golden_retriever.jpg',
      timestamp: Date.now() - 1000 * 60 * 42,
      predictionTimeMs: 214,
    },
    {
      id: crypto.randomUUID(),
      label: 'Cat',
      confidence: 96.1,
      imageUrl: null,
      fileName: 'tabby_cat.jpg',
      timestamp: Date.now() - 1000 * 60 * 60 * 5,
      predictionTimeMs: 187,
    },
    {
      id: crypto.randomUUID(),
      label: 'Cat',
      confidence: 91.7,
      imageUrl: null,
      fileName: 'sphynx.jpg',
      timestamp: Date.now() - 1000 * 60 * 60 * 26,
      predictionTimeMs: 202,
    },
  ]
}
