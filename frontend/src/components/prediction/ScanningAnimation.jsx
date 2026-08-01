import { motion } from 'framer-motion'

export default function ScanningAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
      <div className="absolute inset-0 bg-background/30" />
      <motion.div
        className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-primary/40 to-transparent"
        animate={{ y: ['-100%', '250%'] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-primary rounded-tl-lg" />
      <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-primary rounded-tr-lg" />
      <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-primary rounded-bl-lg" />
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-primary rounded-br-lg" />
    </div>
  )
}
