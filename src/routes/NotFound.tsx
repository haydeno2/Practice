import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="flex flex-col items-center gap-3 py-24 text-center">
      <p className="text-lg font-semibold text-neutral-900">Page not found</p>
      <Link to="/" className="text-sm font-medium text-brand-600 hover:underline">
        Back to shop
      </Link>
    </div>
  )
}
