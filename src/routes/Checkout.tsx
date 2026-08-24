import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useCreateOrder } from '../api/orders'
import { useCart } from '../context/CartContext'

export function Checkout() {
  const { items, subtotal, clear } = useCart()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const { mutate, isPending, isError, error } = useCreateOrder()

  if (items.length === 0) {
    return <Navigate to="/cart" replace />
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    mutate(
      { items, total: subtotal },
      {
        onSuccess: (order) => {
          clear()
          navigate('/order-confirmation', { state: { order } })
        },
      },
    )
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6">
      <h1 className="text-2xl font-semibold text-neutral-900">Checkout</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-neutral-700">
            Full name
          </label>
          <input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-neutral-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="address" className="text-sm font-medium text-neutral-700">
            Shipping address
          </label>
          <textarea
            id="address"
            required
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between border-t border-neutral-200 pt-4">
          <span className="text-sm text-neutral-500">Total</span>
          <span className="text-xl font-semibold text-neutral-900">${subtotal.toFixed(2)}</span>
        </div>

        {isError && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {error.message} Please try again.
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-neutral-300"
        >
          {isPending ? 'Placing order…' : 'Place order'}
        </button>
        <p className="text-center text-xs text-neutral-400">
          This is a mock checkout — no real payment is processed, and failures are simulated.
        </p>
      </form>
    </div>
  )
}
