import { motion } from 'framer-motion'

/**
 * GlassCard
 * The base surface used across the app for feature tiles, stat cards, and
 * result panels. `tilt` adds a subtle 3D hover response driven by pointer
 * position — used sparingly (feature cards on Home) so it stays premium
 * rather than gimmicky.
 */
export default function GlassCard({ children, className = '', tilt = false, ...props }) {
  if (!tilt) {
    return (
      <div className={`glass rounded-2xl gradient-border ${className}`} {...props}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={`glass rounded-2xl gradient-border ${className}`}
      whileHover="hover"
      onMouseMove={(e) => {
        const card = e.currentTarget
        const rect = card.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        card.style.setProperty('--rx', `${y * -8}deg`)
        card.style.setProperty('--ry', `${x * 8}deg`)
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.setProperty('--rx', '0deg')
        e.currentTarget.style.setProperty('--ry', '0deg')
      }}
      style={{
        transform: 'perspective(800px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease-out',
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
