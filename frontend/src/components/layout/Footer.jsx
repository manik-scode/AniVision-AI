import { NavLink } from 'react-router-dom'
import { PawPrint, Github, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 mt-20">
      <div className="section !py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-display font-bold text-lg mb-3">
              <span className="grid place-items-center w-9 h-9 rounded-xl bg-aurora shadow-glow">
                <PawPrint className="w-5 h-5 text-white" strokeWidth={2.5} />
              </span>
              AniVision <span className="gradient-text">AI</span>
            </div>
            <p className="text-muted text-sm max-w-sm leading-relaxed">
              A deep learning app that tells cats and dogs apart in real time.
              Built to show what a production-grade computer vision product
              looks like end to end.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold mb-4 text-text">Product</p>
            <ul className="space-y-3 text-sm text-muted">
              <li><NavLink to="/predict" className="hover:text-text transition-colors">Predict</NavLink></li>
              <li><NavLink to="/analytics" className="hover:text-text transition-colors">Analytics</NavLink></li>
              <li><NavLink to="/about" className="hover:text-text transition-colors">About the Model</NavLink></li>
              <li><NavLink to="/history" className="hover:text-text transition-colors">History</NavLink></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold mb-4 text-text">Connect</p>
            <div className="flex gap-3">
              {[Github, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 grid place-items-center rounded-full glass text-muted hover:text-text hover:border-primary/50 transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© {new Date().getFullYear()} AniVision AI. All rights reserved.</p>
          <p>Built with React, Tailwind CSS & Framer Motion.</p>
        </div>
      </div>
    </footer>
  )
}
