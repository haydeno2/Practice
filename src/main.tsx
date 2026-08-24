import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { CartProvider } from './context/CartContext.tsx'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
      // All requests are intercepted client-side by MSW — there's no real
      // network call, so the browser's online/offline detection (which some
      // sandboxed/embedded environments misreport) shouldn't gate retries.
      networkMode: 'always',
    },
    mutations: {
      networkMode: 'always',
    },
  },
})

async function enableMocking() {
  // This app has no real backend — MSW *is* the backend, in every environment.
  const { worker } = await import('./mocks/browser')
  return worker.start({ onUnhandledRequest: 'bypass' })
}

function renderApp() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>,
  )
}

// Render regardless of whether the mock worker registered — a failure here
// (e.g. service workers unsupported/blocked) should degrade to visible API
// errors in the UI, not a blank page.
enableMocking()
  .catch((err) => console.error('MSW failed to start:', err))
  .finally(renderApp)
