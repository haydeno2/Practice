import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useProduct } from '../api/products'
import { ApiError } from '../api/client'
import { useCart } from '../context/CartContext'

export function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const { data: product, isPending, isError, error, refetch } = useProduct(id)

  if (isPending) {
    return (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-lg bg-neutral-200" />
        <div className="flex flex-col gap-3">
          <div className="h-4 w-20 animate-pulse rounded bg-neutral-200" />
          <div className="h-7 w-2/3 animate-pulse rounded bg-neutral-200" />
          <div className="h-20 w-full animate-pulse rounded bg-neutral-200" />
        </div>
      </div>
    )
  }

  if (isError) {
    const notFound = error instanceof ApiError && error.status === 404

    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <p className="font-medium text-neutral-900">
          {notFound ? 'Product not found.' : "Couldn't load this product."}
        </p>
        {!notFound && <p className="text-sm text-neutral-500">{error.message}</p>}
        <div className="flex gap-2">
          {!notFound && (
            <button
              type="button"
              onClick={() => refetch()}
              className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
            >
              Retry
            </button>
          )}
          <Link
            to="/"
            className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700"
          >
            Back to shop
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      <div className="aspect-square overflow-hidden rounded-lg bg-neutral-100">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-brand-600">
            {product.category}
          </span>
          <h1 className="text-2xl font-semibold text-neutral-900">{product.name}</h1>
        </div>
        <p className="text-sm text-neutral-600">{product.description}</p>
        <div className="flex items-center gap-4">
          <span className="text-xl font-semibold text-neutral-900">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-neutral-500">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="quantity" className="text-sm text-neutral-600">
            Qty
          </label>
          <input
            id="quantity"
            type="number"
            min={1}
            max={Math.max(product.stock, 1)}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="w-16 rounded-md border border-neutral-300 px-2 py-1 text-sm"
          />
        </div>
        <button
          type="button"
          disabled={product.stock === 0}
          onClick={() => {
            addItem(product, quantity)
            navigate('/cart')
          }}
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-neutral-300"
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}
