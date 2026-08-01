import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { Target, Crosshair, Percent, Sigma } from 'lucide-react'
import PageTransition from '../components/common/PageTransition.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import StatCard from '../components/analytics/StatCard.jsx'
import ChartCard from '../components/analytics/ChartCard.jsx'
import GlassCard from '../components/ui/GlassCard.jsx'
import { modelMetrics, trainingHistory, confusionMatrix, datasetStats } from '../utils/mockData.js'

const tooltipStyle = {
  background: '#111827',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 12,
  fontSize: 12,
}

export default function Analytics() {
  return (
    <PageTransition>
      <section className="section !pt-4">
        <SectionHeading
          eyebrow="Analytics"
          title="Model performance, in full detail"
          description="Every metric behind the prediction — measured on a held-out validation set."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <StatCard label="Accuracy" value={modelMetrics.accuracy} icon={Target} accent="primary" />
          <StatCard label="Precision" value={modelMetrics.precision} icon={Crosshair} accent="secondary" />
          <StatCard label="Recall" value={modelMetrics.recall} icon={Percent} accent="accent" />
          <StatCard label="F1 Score" value={modelMetrics.f1Score} icon={Sigma} accent="success" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ChartCard title="Training vs. Validation Accuracy" description="Per epoch, across 10 training epochs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trainingHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="epoch" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} domain={[60, 100]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="trainAcc" name="Train Acc" stroke="#3B82F6" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="valAcc" name="Val Acc" stroke="#8B5CF6" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Training vs. Validation Loss" description="Lower is better — both curves converge smoothly">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trainingHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="lossFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="epoch" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="valLoss" name="Val Loss" stroke="#06B6D4" fill="url(#lossFill)" strokeWidth={2.5} />
                <Line type="monotone" dataKey="trainLoss" name="Train Loss" stroke="#EF4444" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <ConfusionMatrixCard />
          </div>
          <div className="lg:col-span-3 grid grid-cols-2 gap-4">
            {datasetStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <GlassCard className="p-6 h-full flex flex-col justify-center">
                  <p className="text-2xl font-bold font-display gradient-text">{stat.value}</p>
                  <p className="text-sm text-muted mt-1">{stat.label}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

function ConfusionMatrixCard() {
  const { labels, matrix } = confusionMatrix
  const max = Math.max(...matrix.flat())

  return (
    <GlassCard className="p-6 h-full">
      <h3 className="font-semibold mb-1">Confusion Matrix</h3>
      <p className="text-xs text-muted mb-6">Predicted vs. actual class on the validation set</p>

      <div className="grid grid-cols-[auto,1fr,1fr] gap-2 items-center">
        <div />
        {labels.map((l) => (
          <p key={l} className="text-xs text-muted text-center font-medium">{l}</p>
        ))}

        {matrix.map((row, i) => (
          <Fragment key={`row-${i}`}>
            <p className="text-xs text-muted font-medium pr-2">{labels[i]}</p>
            {row.map((value, j) => {
              const isCorrect = i === j
              const intensity = value / max
              return (
                <motion.div
                  key={`${i}-${j}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i * 2 + j) * 0.08 }}
                  className="rounded-xl aspect-square grid place-items-center font-bold text-lg"
                  style={{
                    background: isCorrect
                      ? `rgba(59,130,246,${0.15 + intensity * 0.5})`
                      : `rgba(239,68,68,${0.1 + intensity * 0.3})`,
                    border: `1px solid ${isCorrect ? 'rgba(59,130,246,0.4)' : 'rgba(239,68,68,0.3)'}`,
                  }}
                >
                  {value}
                </motion.div>
              )
            })}
          </Fragment>
        ))}
      </div>
    </GlassCard>
  )
}
