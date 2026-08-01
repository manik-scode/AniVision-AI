import { motion } from 'framer-motion'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'

const variants = {
  primary: 'text-white bg-aurora shadow-glow hover:shadow-[0_0_36px_4px_rgba(59,130,246,0.5)]',
  ghost: 'text-text glass hover:border-primary/50',
  outline: 'text-text border border-white/15 hover:border-primary/60 hover:bg-white/5',
  danger: 'text-white bg-danger/90 hover:bg-danger',
}

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
  ...props
}) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </motion.button>
  )
}
