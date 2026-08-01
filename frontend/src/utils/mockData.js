/**
 * utils/mockData.js
 * -----------------------------------------------------------------------
 * Front-end demo data ONLY. Once services/api.js#getAnalytics() is wired
 * to the real FastAPI backend, replace usages of this file with the live
 * response. Kept isolated here so it's obvious what's fake vs. real.
 * -----------------------------------------------------------------------
 */

export const modelMetrics = {
  accuracy: 97.8,
  precision: 96.9,
  recall: 98.2,
  f1Score: 97.5,
}

export const trainingHistory = [
  { epoch: 1, trainAcc: 68.2, valAcc: 65.4, trainLoss: 0.61, valLoss: 0.66 },
  { epoch: 2, trainAcc: 78.5, valAcc: 74.1, trainLoss: 0.47, valLoss: 0.53 },
  { epoch: 3, trainAcc: 85.1, valAcc: 81.6, trainLoss: 0.36, valLoss: 0.42 },
  { epoch: 4, trainAcc: 89.4, valAcc: 86.0, trainLoss: 0.28, valLoss: 0.34 },
  { epoch: 5, trainAcc: 92.0, valAcc: 89.3, trainLoss: 0.22, valLoss: 0.28 },
  { epoch: 6, trainAcc: 94.1, valAcc: 91.8, trainLoss: 0.17, valLoss: 0.23 },
  { epoch: 7, trainAcc: 95.6, valAcc: 93.7, trainLoss: 0.13, valLoss: 0.19 },
  { epoch: 8, trainAcc: 96.5, valAcc: 95.0, trainLoss: 0.11, valLoss: 0.16 },
  { epoch: 9, trainAcc: 97.3, valAcc: 96.2, trainLoss: 0.09, valLoss: 0.14 },
  { epoch: 10, trainAcc: 97.8, valAcc: 97.1, trainLoss: 0.07, valLoss: 0.12 },
]

export const confusionMatrix = {
  labels: ['Cat', 'Dog'],
  matrix: [
    [482, 18],
    [12, 488],
  ],
}

export const datasetStats = [
  { label: 'Total Images', value: '25,000' },
  { label: 'Cat Images', value: '12,500' },
  { label: 'Dog Images', value: '12,500' },
  { label: 'Train / Val Split', value: '80 / 20' },
]

export const modelPipeline = [
  { step: 'Input', detail: '224×224 RGB image, normalized' },
  { step: 'Augmentation', detail: 'Random flip, rotation, zoom, brightness' },
  { step: 'Backbone', detail: 'Convolutional feature extractor (transfer-learned)' },
  { step: 'Head', detail: 'Global average pooling → dense → dropout' },
  { step: 'Output', detail: 'Sigmoid, binary class probability' },
]

export const trainingDetails = [
  { label: 'Epochs', value: '10' },
  { label: 'Optimizer', value: 'Adam' },
  { label: 'Loss Function', value: 'Binary Crossentropy' },
  { label: 'Learning Rate', value: '1e-4' },
  { label: 'Batch Size', value: '32' },
  { label: 'Final Accuracy', value: '97.8%' },
]

export const futureImprovements = [
  'Expand the dataset with more breed diversity to reduce edge-case misclassification.',
  'Add a confidence threshold that flags uncertain predictions for human review.',
  'Distill the model into a smaller architecture for on-device inference.',
  'Introduce Grad-CAM visualizations so predictions are interpretable, not just accurate.',
]
