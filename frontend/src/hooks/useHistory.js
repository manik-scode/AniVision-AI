import { useMemo, useState } from 'react'
import { usePredictionContext } from '../context/PredictionContext.jsx'

const PAGE_SIZE = 6

/**
 * useHistory
 * Provides search, class filtering, and pagination on top of the shared
 * prediction history from PredictionContext, for the History page.
 */
export function useHistory() {
  const { history, deletePrediction } = usePredictionContext()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all') // all | Cat | Dog
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return history.filter((item) => {
      const matchesQuery = item.fileName.toLowerCase().includes(query.toLowerCase())
      const matchesFilter = filter === 'all' || item.label === filter
      return matchesQuery && matchesFilter
    })
  }, [history, query, filter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const clampedPage = Math.min(page, totalPages)
  const paginated = filtered.slice((clampedPage - 1) * PAGE_SIZE, clampedPage * PAGE_SIZE)

  function updateQuery(value) {
    setQuery(value)
    setPage(1)
  }

  function updateFilter(value) {
    setFilter(value)
    setPage(1)
  }

  return {
    items: paginated,
    total: filtered.length,
    page: clampedPage,
    totalPages,
    setPage,
    query,
    setQuery: updateQuery,
    filter,
    setFilter: updateFilter,
    deletePrediction,
  }
}
