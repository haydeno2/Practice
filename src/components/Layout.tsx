import { Link, Outlet } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { ErrorBoundary } from './ErrorBoundary'

export function Layout() {
  const { itemCount } = useCart()

  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-neutral-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-lg font-semibold tracking-tight text-neutral-900">
            Aperture
          </Link>
          <Link
            to="/cart"
            className="relative rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:border-brand-500 hover:text-brand-600"
          >
            Cart
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-xs font-semibold text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <footer className="border-t border-neutral-200 py-6 text-center text-xs text-neutral-400">
        Mock storefront for portfolio demonstration purposes — no real payments are processed.
      </footer>
    </div>
  )
}
