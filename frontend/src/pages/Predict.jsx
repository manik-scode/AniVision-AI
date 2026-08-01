import { AnimatePresence, motion } from 'framer-motion'
import { RotateCcw, ScanLine, AlertTriangle } from 'lucide-react'
import PageTransition from '../components/common/PageTransition.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import UploadCard from '../components/prediction/UploadCard.jsx'
import ScanningAnimation from '../components/prediction/ScanningAnimation.jsx'
import ResultCard from '../components/prediction/ResultCard.jsx'
import GlassCard from '../components/ui/GlassCard.jsx'
import Button from '../components/ui/Button.jsx'
import { usePrediction } from '../hooks/usePrediction.js'

export default function Predict() {
  const { file, previewUrl, status, result, error, selectFile, runPrediction, reset } = usePrediction()

  return (
    <PageTransition>
      <section className="section !pt-4">
        <SectionHeading
          eyebrow="Predict"
          title="Upload an image to classify"
          description="The model accepts a single photo of a cat or a dog and returns a label with a confidence score."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col gap-5">
            {!previewUrl ? (
              <UploadCard onSelect={selectFile} />
            ) : (
              <GlassCard className="p-3">
                <div className="relative rounded-xl overflow-hidden aspect-square">
                  <img src={previewUrl} alt="Uploaded preview" className="w-full h-full object-cover" />
                  <AnimatePresence>
                    {status === 'scanning' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                      >
                        <ScanningAnimation />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </GlassCard>
            )}

            <div className="flex flex-wrap gap-3">
              {previewUrl && status !== 'scanning' && (
                <Button variant="primary" icon={ScanLine} onClick={runPrediction} disabled={status === 'scanning'}>
                  {status === 'done' ? 'Predict Again' : 'Run Prediction'}
                </Button>
              )}
              {previewUrl && (
                <Button variant="outline" icon={RotateCcw} onClick={reset}>
                  Upload Another Image
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {status === 'scanning' && (
                <motion.div
                  key="scanning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <GlassCard className="p-8 text-center">
                    <motion.div
                      className="w-14 h-14 mx-auto rounded-2xl bg-aurora shadow-glow grid place-items-center mb-4"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      <ScanLine className="w-6 h-6 text-white" />
                    </motion.div>
                    <p className="font-semibold">Analyzing image…</p>
                    <p className="text-sm text-muted mt-1">Running inference through the network</p>
                  </GlassCard>
                </motion.div>
              )}

              {status === 'done' && result && (
                <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <ResultCard result={result} />
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <GlassCard className="p-6 flex items-start gap-3 border-danger/40">
                    <AlertTriangle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-danger">Prediction failed</p>
                      <p className="text-sm text-muted mt-1">{error}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {status === 'idle' && !file && (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <GlassCard className="p-8 text-center text-muted">
                    <p className="text-sm">Your prediction result will appear here once you upload an image.</p>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
