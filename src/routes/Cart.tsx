import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { EmptyState } from '../components/EmptyState'

export function Cart() {
  const { items, subtotal, setQuantity, removeItem } = useCart()

  if (items.length === 0) {
    return (
      <EmptyState title="Your cart is empty">
        <Link
          to="/"
          className="mt-4 inline-block text-sm font-medium text-brand-600 hover:underline"
        >
          Continue shopping
        </Link>
      </EmptyState>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-neutral-900">Your cart</h1>

      <ul className="flex flex-col divide-y divide-neutral-200 border-y border-neutral-200">
        {items.map((item) => (
          <li key={item.product.id} className="flex items-center gap-4 py-4">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="h-20 w-20 rounded-md object-cover"
            />
            <div className="flex-1">
              <Link
                to={`/products/${item.product.id}`}
                className="font-medium text-neutral-900 hover:underline"
              >
                {item.product.name}
              </Link>
              <p className="text-sm text-neutral-500">${item.product.price.toFixed(2)} each</p>
            </div>
            <input
              type="number"
              min={1}
              max={item.product.stock}
              value={item.quantity}
              onChange={(e) => setQuantity(item.product.id, Number(e.target.value))}
              aria-label={`Quantity for ${item.product.name}`}
              className="w-16 rounded-md border border-neutral-300 px-2 py-1 text-sm"
            />
            <span className="w-20 text-right font-medium text-neutral-900">
              ${(item.product.price * item.quantity).toFixed(2)}
            </span>
            <button
              type="button"
              onClick={() => removeItem(item.product.id)}
              aria-label={`Remove ${item.product.name}`}
              className="text-sm text-neutral-400 hover:text-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between">
        <span className="text-sm text-neutral-500">Subtotal</span>
        <span className="text-xl font-semibold text-neutral-900">${subtotal.toFixed(2)}</span>
      </div>

      <Link
        to="/checkout"
        className="self-end rounded-md bg-brand-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
      >
        Proceed to checkout
      </Link>
    </div>
  )
}
