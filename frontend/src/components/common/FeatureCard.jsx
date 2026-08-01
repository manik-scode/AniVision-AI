import { motion } from 'framer-motion'
import GlassCard from '../ui/GlassCard.jsx'

export default function FeatureCard({ icon: Icon, title, description, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassCard tilt className="p-7 h-full">
        <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 grid place-items-center mb-5">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted leading-relaxed">{description}</p>
      </GlassCard>
    </motion.div>
  )
}
