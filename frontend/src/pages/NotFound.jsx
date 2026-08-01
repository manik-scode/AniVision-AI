import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Compass, Home } from 'lucide-react'
import PageTransition from '../components/common/PageTransition.jsx'
import Button from '../components/ui/Button.jsx'

export default function NotFound() {
  return (
    <PageTransition>
      <section className="section flex flex-col items-center text-center !py-32">
        <motion.div
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-20 h-20 rounded-3xl bg-aurora shadow-glow grid place-items-center mb-8"
        >
          <Compass className="w-10 h-10 text-white" />
        </motion.div>
        <p className="text-8xl font-bold font-display gradient-text mb-4">404</p>
        <h1 className="text-2xl font-semibold mb-3">This page wandered off</h1>
        <p className="text-muted max-w-md mb-8">
          Even a well-trained model can't classify a page that doesn't exist.
          Let's get you back on track.
        </p>
        <NavLink to="/">
          <Button variant="primary" icon={Home}>
            Back to Home
          </Button>
        </NavLink>
      </section>
    </PageTransition>
  )
}
