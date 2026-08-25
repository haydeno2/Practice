interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}
import { useEffect, useState } from 'react'
import './Pagination.css'

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  const [draft, setDraft] = useState(String(page))

  useEffect(() => {
    setDraft(String(page))
  }, [page])

  if (totalPages <= 1) return null

  const isInRange = (value: number) => Number.isInteger(value) && value >= 1 && value <= totalPages

  const commit = () => {
    const value = Number(draft)
    if (isInRange(value)) {
      onPageChange(value)
    } else {
      setDraft(String(page))
    }
  }

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>
      <span className="text-sm text-neutral-500">
        Page <input
          type="number"
          inputMode="numeric"
          min="1"
          max={totalPages}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              commit()
              e.currentTarget.blur()
            }
          }}
          className="page-input border border-neutral-300 bg-transparent text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        /> of {totalPages}
      </span>
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  )
}
