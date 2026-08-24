export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white">
      <div className="aspect-square animate-pulse bg-neutral-200" />
      <div className="flex flex-col gap-2 p-4">
        <div className="h-3 w-16 animate-pulse rounded bg-neutral-200" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-200" />
        <div className="mt-2 flex items-center justify-between">
          <div className="h-4 w-12 animate-pulse rounded bg-neutral-200" />
          <div className="h-7 w-20 animate-pulse rounded bg-neutral-200" />
        </div>
      </div>
    </div>
  )
}
