import { CATEGORY_LIST } from '../mocks/data/products'

interface FiltersProps {
  search: string
  category: string
  sort: string
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onSortChange: (value: string) => void
}

export function Filters({
  search,
  category,
  sort,
  onSearchChange,
  onCategoryChange,
  onSortChange,
}: FiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <input
        type="search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search products…"
        aria-label="Search products"
        className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none sm:w-64"
      />
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        aria-label="Filter by category"
        className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
      >
        <option value="">All categories</option>
        {CATEGORY_LIST.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        aria-label="Sort products"
        className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
      >
        <option value="featured">Featured</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Top Rated</option>
      </select>
    </div>
  )
}
