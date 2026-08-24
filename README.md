# Aperture — Mock Storefront

A mock e-commerce storefront, built as a standalone portfolio piece to demonstrate front-end handling of async data, client state, and error/loading UX — not a real store, no real payments.

## Stack

- **React 19 + TypeScript + Vite 7** — app shell and build tooling
- **React Router 7** — client-side routing (product list, detail, cart, checkout, confirmation)
- **TanStack Query 5** — data fetching, caching, retries, pagination
- **Mock Service Worker (MSW)** — intercepts real `fetch` calls with a simulated backend (latency, pagination, search/filter, and randomized failures), so the network layer behaves like a real API integration
- **React Context + `useReducer`** — cart state, persisted to `localStorage`
- **Tailwind CSS v4** — styling

## Features demonstrated

- Search, category filter, and sort against a paginated mock API, with debounced input and URL-synced filter state
- Loading skeletons, empty states, and retryable error states for every data-dependent view
- A simulated ~8% order-failure rate at checkout to exercise mutation error handling
- Cart state with `localStorage` persistence across reloads
- A React error boundary around routed content

## Getting started

```bash
npm install
npm run dev
```

Because MSW _is_ the backend for this app, it starts in every environment (dev and the production build) — there's nothing to configure.

## Scripts

| Script                 | Description                         |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | Start the dev server with HMR       |
| `npm run build`        | Type-check and build for production |
| `npm run preview`      | Preview the production build        |
| `npm run lint`         | Lint with ESLint                    |
| `npm run format`       | Format with Prettier                |
| `npm run format:check` | Check formatting without writing    |
| `npm test`             | Run tests in watch mode             |
| `npm run test:run`     | Run tests once                      |
