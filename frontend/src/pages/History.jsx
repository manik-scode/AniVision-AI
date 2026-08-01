import { AnimatePresence, motion } from 'framer-motion'
import { Search, ChevronLeft, ChevronRight, Inbox } from 'lucide-react'
import PageTransition from '../components/common/PageTransition.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import PredictionCard from '../components/prediction/PredictionCard.jsx'
import GlassCard from '../components/ui/GlassCard.jsx'
import { useHistory } from '../hooks/useHistory.js'

const filters = ['all', 'Cat', 'Dog']

export default function History() {
  const { items, total, page, totalPages, setPage, query, setQuery, filter, setFilter, deletePrediction } =
    useHistory()

  return (
    <PageTransition>
      <section className="section !pt-4">
        <SectionHeading
          eyebrow="History"
          title="Your past predictions"
          description="Every image you've classified, searchable and filterable in one place."
        />

        <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-3xl mx-auto">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-muted absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by file name…"
              className="w-full glass rounded-full pl-11 pr-4 py-3 text-sm text-text placeholder:text-muted outline-none focus-visible:border-primary/50"
            />
          </div>
          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === f ? 'bg-aurora text-white shadow-glow' : 'glass text-muted hover:text-text'
                }`}
              >
                {f === 'all' ? 'All' : f}
              </button>
            ))}
          </div>
        </div>

        {items.length === 0 ? (
          <GlassCard className="p-16 text-center max-w-lg mx-auto">
            <Inbox className="w-10 h-10 text-muted mx-auto mb-4" />
            <p className="font-semibold mb-1">No predictions found</p>
            <p className="text-sm text-muted">Try a different search term or filter.</p>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <AnimatePresence mode="popLayout">
              {items.map((entry) => (
                <PredictionCard key={entry.id} entry={entry} onDelete={deletePrediction} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="p-2 rounded-full glass disabled:opacity-40 hover:text-primary transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-muted">
              Page {page} of {totalPages} · {total} results
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-full glass disabled:opacity-40 hover:text-primary transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>
    </PageTransition>
  )
}
