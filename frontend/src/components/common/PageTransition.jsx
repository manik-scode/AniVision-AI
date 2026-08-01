import { motion } from 'framer-motion'

const variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3, ease: 'easeIn' } },
}

export default function PageTransition({ children }) {
  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={variants}>
      {children}
    </motion.div>
  )
}
