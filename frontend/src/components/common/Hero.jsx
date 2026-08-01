import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { ArrowRight, Sparkles, Cat, Dog } from 'lucide-react'
import Button from '../ui/Button.jsx'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  return (
    <section className="relative container-px max-w-7xl mx-auto pt-8 pb-24 md:pt-16 md:pb-32">
      <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center text-center">
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase glass px-4 py-2 rounded-full text-primary mb-8"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Deep Learning · Real-time Classification
        </motion.span>

        <motion.h1 variants={item} className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] max-w-4xl">
          Cat or dog?
          <br />
          <span className="gradient-text">Your model just knows.</span>
        </motion.h1>

        <motion.p variants={item} className="mt-6 text-lg text-muted max-w-xl leading-relaxed">
          Upload any photo and watch a convolutional neural network classify
          it in real time — with confidence scores, inference timing, and a
          full performance breakdown behind the scenes.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <NavLink to="/predict">
            <Button variant="primary" size="lg" icon={ArrowRight}>
              Try a Prediction
            </Button>
          </NavLink>
          <NavLink to="/about">
            <Button variant="outline" size="lg">
              Explore the Model
            </Button>
          </NavLink>
        </motion.div>

        <motion.div variants={item} className="relative mt-20 w-full max-w-3xl">
          <FloatingPreview />
        </motion.div>
      </motion.div>
    </section>
  )
}

function FloatingPreview() {
  return (
    <div className="relative h-64 md:h-80">
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 md:w-64 aspect-square rounded-3xl glass-strong shadow-card grid place-items-center"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-28 h-28 rounded-2xl bg-aurora shadow-glow grid place-items-center">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
        <span className="absolute bottom-5 text-xs text-muted">Analyzing image…</span>
      </motion.div>

      <motion.div
        className="absolute left-[8%] top-[10%] w-24 h-24 rounded-2xl glass shadow-card grid place-items-center rotate-[-8deg]"
        animate={{ y: [0, -10, 0], rotate: [-8, -4, -8] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Cat className="w-9 h-9 text-primary" />
        <span className="absolute -bottom-3 text-[10px] font-semibold bg-card px-2 py-0.5 rounded-full border border-white/10">98.4%</span>
      </motion.div>

      <motion.div
        className="absolute right-[10%] bottom-[8%] w-24 h-24 rounded-2xl glass shadow-card grid place-items-center rotate-[7deg]"
        animate={{ y: [0, 10, 0], rotate: [7, 3, 7] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <Dog className="w-9 h-9 text-secondary" />
        <span className="absolute -bottom-3 text-[10px] font-semibold bg-card px-2 py-0.5 rounded-full border border-white/10">96.1%</span>
      </motion.div>
    </div>
  )
}
