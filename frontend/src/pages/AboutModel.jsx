import { motion } from 'framer-motion'
import { Database, Network, Settings2, Rocket, ArrowRight } from 'lucide-react'
import PageTransition from '../components/common/PageTransition.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import GlassCard from '../components/ui/GlassCard.jsx'
import { modelPipeline, trainingDetails, futureImprovements, datasetStats } from '../utils/mockData.js'

export default function AboutModel() {
  return (
    <PageTransition>
      <section className="section !pt-4">
        <SectionHeading
          eyebrow="About the Model"
          title="What's under the hood"
          description="A transparent look at the dataset, architecture, and training process behind AniVision AI."
        />

        {/* Dataset */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          <GlassCard className="p-8">
            <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 grid place-items-center mb-5">
              <Database className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Dataset</h3>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Trained on a balanced set of labeled cat and dog images, split
              into training and validation sets to measure real generalization,
              not memorization.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {datasetStats.map((s) => (
                <div key={s.label} className="glass rounded-xl p-4">
                  <p className="text-lg font-bold gradient-text">{s.value}</p>
                  <p className="text-xs text-muted mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-8">
            <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 grid place-items-center mb-5">
              <Settings2 className="w-5 h-5 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Training Configuration</h3>
            <p className="text-muted text-sm leading-relaxed mb-6">
              The exact hyperparameters used for the current production model.
            </p>
            <dl className="grid grid-cols-2 gap-y-4 text-sm">
              {trainingDetails.map((d) => (
                <div key={d.label}>
                  <dt className="text-muted">{d.label}</dt>
                  <dd className="font-semibold mt-0.5">{d.value}</dd>
                </div>
              ))}
            </dl>
          </GlassCard>
        </div>

        {/* Pipeline */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 grid place-items-center">
              <Network className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-xl font-semibold">Model Pipeline</h3>
          </div>

          <div className="flex flex-col md:flex-row items-stretch gap-3">
            {modelPipeline.map((stage, i) => (
              <motion.div
                key={stage.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-3 flex-1"
              >
                <GlassCard className="p-5 flex-1">
                  <p className="text-xs uppercase tracking-wide text-primary font-semibold mb-1">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <p className="font-semibold text-sm mb-1">{stage.step}</p>
                  <p className="text-xs text-muted leading-relaxed">{stage.detail}</p>
                </GlassCard>
                {i < modelPipeline.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-muted shrink-0 hidden md:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Future Improvements */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 grid place-items-center">
              <Rocket className="w-5 h-5 text-success" />
            </div>
            <h3 className="text-xl font-semibold">Future Improvements</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {futureImprovements.map((text, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <GlassCard className="p-5 text-sm text-muted leading-relaxed">{text}</GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
