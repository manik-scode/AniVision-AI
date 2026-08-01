import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

export default function AnimatedCounter({ value, suffix = '', decimals = 1 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: 1600, bounce: 0 })

  useEffect(() => {
    if (isInView) motionValue.set(value)
  }, [isInView, value, motionValue])

  useEffect(() => {
    return spring.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${latest.toFixed(decimals)}${suffix}`
      }
    })
  }, [spring, suffix, decimals])

  return (
    <motion.span ref={ref} className="tabular-nums">
      0{suffix}
    </motion.span>
  )
}
