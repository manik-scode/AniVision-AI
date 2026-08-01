import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ScanEye,
  Gauge,
  ShieldCheck,
  LineChart,
  UploadCloud,
  Cpu,
  BadgeCheck,
  ArrowRight,
  Github,
  Linkedin,
} from 'lucide-react'
import PageTransition from '../components/common/PageTransition.jsx'
import Hero from '../components/common/Hero.jsx'
import FeatureCard from '../components/common/FeatureCard.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import GlassCard from '../components/ui/GlassCard.jsx'
import Button from '../components/ui/Button.jsx'

const features = [
  {
    icon: ScanEye,
    title: 'Real-time Classification',
    description: 'Upload any image and get a Cat or Dog prediction in under two seconds.',
  },
  {
    icon: Gauge,
    title: 'Confidence Scoring',
    description: 'Every prediction ships with a calibrated confidence percentage, not a guess.',
  },
  {
    icon: LineChart,
    title: 'Transparent Analytics',
    description: 'Accuracy, precision, recall, and F1 score — all visualized, all public.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy First',
    description: 'Images are processed for inference only and never used to retrain without consent.',
  },
]

const steps = [
  { icon: UploadCloud, title: 'Upload', description: 'Drag and drop a photo or select one from your device.' },
  { icon: Cpu, title: 'Analyze', description: 'The model runs inference through its trained neural network.' },
  { icon: BadgeCheck, title: 'Result', description: 'Get an instant label with a confidence score attached.' },
]

const stack = ['React 19', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Recharts', 'Axios', 'FastAPI (backend)']

export default function Home() {
  return (
    <PageTransition>
      <Hero />

      {/* Features */}
      <section className="section">
        <SectionHeading
          eyebrow="Why AniVision"
          title="Built like a product, not a notebook"
          description="Every layer of this app — from the upload flow to the metrics dashboard — is designed to feel like something you'd actually ship."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <SectionHeading
          eyebrow="How It Works"
          title="Three steps to a prediction"
          description="No configuration, no setup — just a photo and a result."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard className="p-8 h-full relative">
                <span className="absolute -top-4 -left-2 text-6xl font-bold font-display text-white/5 select-none">
                  {`0${i + 1}`}
                </span>
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-aurora shadow-glow grid place-items-center mb-5">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{step.description}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section">
        <SectionHeading eyebrow="Technology" title="Powered by a modern, production stack" />
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {stack.map((tech) => (
            <span
              key={tech}
              className="px-5 py-2.5 rounded-full glass text-sm font-medium text-muted hover:text-text hover:border-primary/40 transition-colors"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </section>

      {/* Developer Section */}
      <section className="section">
        <GlassCard className="p-10 md:p-14 grid grid-cols-1 md:grid-cols-[auto,1fr] gap-8 items-center">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-aurora shadow-glow grid place-items-center text-3xl font-bold shrink-0 mx-auto md:mx-0">
            AI
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-primary font-semibold mb-2">Built By</p>
            <h3 className="text-2xl font-bold mb-3">An engineer who ships end-to-end products</h3>
            <p className="text-muted leading-relaxed mb-5">
              AniVision AI pairs a clean, componentized React front end with a
              deep learning classifier — from the upload interaction down to
              the confusion matrix. Every part of the pipeline is designed to
              be portfolio-ready and production-shaped.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 grid place-items-center rounded-full glass hover:text-primary transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 grid place-items-center rounded-full glass hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* CTA */}
      <section className="section !pb-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl gradient-border glass-strong p-12 md:p-20 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-aurora opacity-10 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to see it classify?</h2>
            <p className="text-muted max-w-lg mx-auto mb-8">
              Upload a photo and watch the model work — no sign-up required.
            </p>
            <NavLink to="/predict">
              <Button variant="primary" size="lg" icon={ArrowRight}>
                Start Predicting
              </Button>
            </NavLink>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  )
}
