import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <motion.div
      className={`flex flex-col gap-4 max-w-2xl mb-16 ${alignment}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {eyebrow && (
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary/90 px-3 py-1 rounded-full glass">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{title}</h2>
      {description && <p className="text-muted text-base md:text-lg leading-relaxed">{description}</p>}
    </motion.div>
  )
}
