import { motion } from 'framer-motion'

export default function Loader({ label = 'Loading' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10" role="status" aria-live="polite">
      <div className="relative w-14 h-14">
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-white/10"
        />
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-t-primary border-r-secondary border-b-transparent border-l-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <p className="text-sm text-muted">{label}</p>
    </div>
  )
}
