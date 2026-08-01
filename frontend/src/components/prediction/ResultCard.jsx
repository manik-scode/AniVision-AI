import { motion } from 'framer-motion'
import { Cat, Dog, Zap, Gauge } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'
import { formatConfidence, formatMs } from '../../utils/formatters.js'

export default function ResultCard({ result }) {
  const isDog = result.label === 'Dog'
  const Icon = isDog ? Dog : Cat

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassCard className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-aurora grid place-items-center shadow-glow shrink-0">
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Prediction</p>
            <p className="text-2xl font-bold font-display">{result.label}</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted">Confidence</span>
            <span className="font-semibold text-text">{formatConfidence(result.confidence)}</span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-aurora rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${result.confidence}%` }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="glass rounded-xl p-4 flex items-center gap-3">
            <Zap className="w-4 h-4 text-accent" />
            <div>
              <p className="text-xs text-muted">Inference Time</p>
              <p className="text-sm font-semibold">{formatMs(result.predictionTimeMs)}</p>
            </div>
          </div>
          <div className="glass rounded-xl p-4 flex items-center gap-3">
            <Gauge className="w-4 h-4 text-success" />
            <div>
              <p className="text-xs text-muted">Model</p>
              <p className="text-sm font-semibold">AniVision v1.0</p>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}
