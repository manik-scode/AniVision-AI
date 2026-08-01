import { motion } from 'framer-motion'
import { Cat, Dog, Trash2 } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'
import { formatConfidence, formatRelativeTime } from '../../utils/formatters.js'

export default function PredictionCard({ entry, onDelete }) {
  const isDog = entry.label === 'Dog'
  const Icon = isDog ? Dog : Cat

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35 }}
    >
      <GlassCard className="p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-aurora grid place-items-center shrink-0 shadow-glow">
          <Icon className="w-6 h-6 text-white" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold truncate">{entry.fileName}</p>
            <span className="text-xs text-muted whitespace-nowrap">
              {formatRelativeTime(entry.timestamp)}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
              {entry.label}
            </span>
            <span className="text-xs text-muted">{formatConfidence(entry.confidence)} confidence</span>
          </div>
        </div>

        <button
          onClick={() => onDelete(entry.id)}
          className="p-2 rounded-lg text-muted hover:text-danger hover:bg-danger/10 transition-colors shrink-0"
          aria-label={`Delete prediction for ${entry.fileName}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </GlassCard>
    </motion.div>
  )
}
