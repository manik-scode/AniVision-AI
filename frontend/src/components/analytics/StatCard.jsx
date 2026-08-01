import GlassCard from '../ui/GlassCard.jsx'
import AnimatedCounter from './AnimatedCounter.jsx'

export default function StatCard({ label, value, suffix = '%', icon: Icon, accent = 'primary' }) {
  const ring = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    success: 'text-success',
  }[accent]

  return (
    <GlassCard className="p-6 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted font-medium">{label}</p>
        {Icon && <Icon className={`w-5 h-5 ${ring}`} />}
      </div>
      <p className={`text-4xl font-bold font-display ${ring}`}>
        <AnimatedCounter value={value} suffix={suffix} />
      </p>
    </GlassCard>
  )
}
