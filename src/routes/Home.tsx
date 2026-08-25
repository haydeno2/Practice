import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '../api/products'
import { EmptyState } from '../components/EmptyState'
import { Filters } from '../components/Filters'
import { Pagination } from '../components/Pagination'
import { ProductCard } from '../components/ProductCard'
import { ProductCardSkeleton } from '../components/ProductCardSkeleton'
import { useDebouncedValue } from '../hooks/useDebouncedValue'

const PAGE_SIZE = 8

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchInput, setSearchInput] = useState(searchParams.get('search') ?? '')
  const debouncedSearch = useDebouncedValue(searchInput, 300)

  const category = searchParams.get('category') ?? ''
  const sort = searchParams.get('sort') ?? 'featured'
  const page = Number(searchParams.get('page') ?? '1')

  const filters = useMemo(
    () => ({ search: debouncedSearch, category, sort, page, pageSize: PAGE_SIZE }),
    [debouncedSearch, category, sort, page],
  )

  const { data, isPending, isError, error, isFetching, refetch } = useProducts(filters)

  // Page changes can grow or shrink the product grid (e.g. a 1-item last page
  // vs. a full page), which shifts everything below it — including the
  // pagination bar itself. Anchor on the pagination bar's on-screen position
  // instead of the raw scroll offset, so it stays put under the cursor
  // through the URL update and the refetch.
  const paginationRef = useRef<HTMLDivElement>(null)
  const anchorTop = useRef<number | null>(null)

  useLayoutEffect(() => {
    if (anchorTop.current !== null && paginationRef.current) {
      const delta = paginationRef.current.getBoundingClientRect().top - anchorTop.current
      if (delta !== 0) window.scrollBy(0, delta)
      if (!isFetching) anchorTop.current = null
    }
  })

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    next.delete('page')
    setSearchParams(next)
  }

  function handleSearchChange(value: string) {
    setSearchInput(value)
    updateParam('search', value)
  }

  function handlePageChange(nextPage: number) {
    if (paginationRef.current) {
      anchorTop.current = paginationRef.current.getBoundingClientRect().top
    }
    const next = new URLSearchParams(searchParams)
    next.set('page', String(nextPage))
    setSearchParams(next)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Shop everything</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Search, filter, and sort a mock catalog served over a simulated network.
        </p>
      </div>

      <Filters
        search={searchInput}
        category={category}
        sort={sort}
        onSearchChange={handleSearchChange}
        onCategoryChange={(value) => updateParam('category', value)}
        onSortChange={(value) => updateParam('sort', value)}
      />

      {isPending && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <p className="font-medium text-neutral-900">Couldn't load products.</p>
          <p className="text-sm text-neutral-500">{(error as Error).message}</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            Retry
          </button>
        </div>
      )}

      {data && data.items.length === 0 && (
        <EmptyState
          title="No products match your filters"
          description="Try a different search or category."
        />
      )}

      {data && data.items.length > 0 && (
        <div
          className={
            isFetching
              ? 'grid grid-cols-2 gap-4 opacity-60 transition-opacity sm:grid-cols-3 lg:grid-cols-4'
              : 'grid grid-cols-2 gap-4 transition-opacity sm:grid-cols-3 lg:grid-cols-4'
          }
        >
          {data.items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {data && (
        <div ref={paginationRef}>
          <Pagination page={data.page} totalPages={data.totalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  )
}
