import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import type { Product } from '../types/product'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem(product, 1)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1200)
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white">
      <Link to={`/products/${product.id}`} className="aspect-square overflow-hidden bg-neutral-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-brand-600">
          {product.category}
        </span>
        <Link
          to={`/products/${product.id}`}
          className="font-medium text-neutral-900 hover:underline"
        >
          {product.name}
        </Link>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-sm font-semibold text-neutral-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="rounded-md bg-brand-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-neutral-300"
          >
            {product.stock === 0 ? 'Out of stock' : added ? 'Added ✓' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
