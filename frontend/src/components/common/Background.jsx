import { motion } from 'framer-motion'

/**
 * Background
 * Fixed, decorative layer: subtle grid, two ambient gradient blobs, and a
 * handful of slow-floating particles. Pointer-events disabled so it never
 * blocks interaction. aria-hidden since it carries no content.
 */
export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-grid-glow" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <motion.div
        className="absolute -top-32 -left-32 w-[32rem] h-[32rem] rounded-full bg-primary/20 blur-[120px]"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 w-[36rem] h-[36rem] rounded-full bg-secondary/20 blur-[130px]"
        animate={{ opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 w-[28rem] h-[28rem] rounded-full bg-accent/10 blur-[110px]"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: 0.35,
          }}
          animate={{ y: [0, -24, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}
    </div>
  )
}

const particles = [
  { id: 1, top: '15%', left: '8%', size: 6, color: '#3B82F6', duration: 7, delay: 0 },
  { id: 2, top: '28%', left: '82%', size: 4, color: '#8B5CF6', duration: 9, delay: 1 },
  { id: 3, top: '62%', left: '18%', size: 5, color: '#06B6D4', duration: 8, delay: 0.5 },
  { id: 4, top: '75%', left: '70%', size: 3, color: '#3B82F6', duration: 6, delay: 1.5 },
  { id: 5, top: '45%', left: '50%', size: 4, color: '#8B5CF6', duration: 10, delay: 0.8 },
  { id: 6, top: '8%', left: '60%', size: 3, color: '#06B6D4', duration: 7.5, delay: 2 },
]
