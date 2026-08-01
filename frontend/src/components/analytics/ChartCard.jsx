import { motion } from 'framer-motion'
import GlassCard from '../ui/GlassCard.jsx'

export default function ChartCard({ title, description, children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard className={`p-6 ${className}`}>
        <div className="mb-4">
          <h3 className="font-semibold text-text">{title}</h3>
          {description && <p className="text-xs text-muted mt-1">{description}</p>}
        </div>
        <div className="w-full h-72">{children}</div>
      </GlassCard>
    </motion.div>
  )
}
