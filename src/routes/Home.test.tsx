import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { CartProvider } from '../context/CartContext'
import { Home } from './Home'

function renderHome() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </CartProvider>
    </QueryClientProvider>,
  )
}

describe('Home', () => {
  it('loads and displays products from the mock API', async () => {
    renderHome()

    expect(await screen.findByText(/wireless earbuds/i, {}, { timeout: 3000 })).toBeInTheDocument()
  })

  it('filters products by search term', async () => {
    const user = userEvent.setup()
    renderHome()

    const search = await screen.findByPlaceholderText(/search products/i)
    await user.type(search, 'Espresso')

    expect(await screen.findByText(/espresso maker/i, {}, { timeout: 3000 })).toBeInTheDocument()
    expect(screen.queryByText(/wireless earbuds/i)).not.toBeInTheDocument()
  })
})
