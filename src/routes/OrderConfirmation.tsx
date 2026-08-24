import { Link, Navigate, useLocation } from 'react-router-dom'
import type { Order } from '../types/cart'

export function OrderConfirmation() {
  const location = useLocation()
  const order = (location.state as { order?: Order } | null)?.order

  if (!order) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">
        ✓
      </div>
      <h1 className="text-2xl font-semibold text-neutral-900">Order confirmed</h1>
      <p className="text-sm text-neutral-500">
        Order <span className="font-mono font-medium text-neutral-700">{order.orderId}</span> has
        been placed.
      </p>
      <p className="text-lg font-semibold text-neutral-900">${order.total.toFixed(2)}</p>
      <Link
        to="/"
        className="mt-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
      >
        Continue shopping
      </Link>
    </div>
  )
}
