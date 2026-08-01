import React, { createContext, useContext, useState, useEffect } from 'react';

const PredictionContext = createContext();

export const PredictionProvider = ({ children }) => {
  // 1. App start hote hi localStorage se history load karein
  const [history, setHistory] = useState(() => {
    try {
      const savedHistory = localStorage.getItem('ani_prediction_history');
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (error) {
      console.error("Failed to load history from localStorage", error);
      return [];
    }
  });

  // 2. Jab bhi history update ho, use localStorage mein save kar dein
  useEffect(() => {
    try {
      localStorage.setItem('ani_prediction_history', JSON.stringify(history));
    } catch (error) {
      console.error("Failed to save history to localStorage", error);
    }
  }, [history]);

  // 3. Nayi prediction add karne ka function
  const addPrediction = (newPrediction) => {
    setHistory((prevHistory) => [newPrediction, ...prevHistory]);
  };

  // 4. Single prediction delete karne ka function
  const deletePrediction = (id) => {
    setHistory((prevHistory) => prevHistory.filter((item) => item.id !== id));
  };

  // 5. Saari history clear karne ka function
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('ani_prediction_history');
  };

  return (
    <PredictionContext.Provider
      value={{
        history,
        addPrediction,
        deletePrediction,
        clearHistory,
      }}
    >
      {children}
    </PredictionContext.Provider>
  );
};

// Custom hook for using prediction context easily
export const usePredictionContext = () => {
  const context = useContext(PredictionContext);
  if (!context) {
    throw new Error('usePredictionContext must be used within a PredictionProvider');
  }
  return context;
};