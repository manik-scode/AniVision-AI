import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PawPrint, Menu, X } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/predict', label: 'Predict' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/about', label: 'About Model' },
  { to: '/history', label: 'History' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`container-px max-w-7xl mx-auto flex items-center justify-between rounded-2xl transition-all duration-300 ${
          scrolled ? 'glass-strong shadow-card px-5 py-3' : 'px-2 py-2'
        }`}
      >
        <NavLink to="/" className="flex items-center gap-2 font-display font-bold text-lg" onClick={() => setOpen(false)}>
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-aurora shadow-glow">
            <PawPrint className="w-5 h-5 text-white" strokeWidth={2.5} />
          </span>
          <span>AniVision <span className="gradient-text">AI</span></span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  isActive ? 'text-text' : 'text-muted hover:text-text'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-0 -z-10 rounded-full bg-white/5 border border-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <NavLink to="/predict" className="btn-glow">
            Try It Now
          </NavLink>
        </div>

        <button
          className="md:hidden p-2 rounded-lg text-text"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden container-px mt-2"
          >
            <div className="glass-strong rounded-2xl p-3 flex flex-col gap-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-medium ${
                      isActive ? 'bg-white/10 text-text' : 'text-muted'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <NavLink to="/predict" onClick={() => setOpen(false)} className="btn-glow mt-2 justify-center">
                Try It Now
              </NavLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
