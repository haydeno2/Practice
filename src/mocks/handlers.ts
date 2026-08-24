import { delay, http, HttpResponse } from 'msw'
import type { Order } from '../types/cart'
import type { ProductListResponse } from '../types/product'
import { PRODUCTS } from './data/products'

const PAGE_SIZE_DEFAULT = 8

/** Simulated network latency, in milliseconds. */
const LATENCY = { min: 300, max: 900 }

/** Fraction of requests that fail, to exercise retry/error UI. */
const FAILURE_RATE = 0.08

function randomLatency() {
  return LATENCY.min + Math.random() * (LATENCY.max - LATENCY.min)
}

export const handlers = [
  http.get('/api/products', async ({ request }) => {
    await delay(randomLatency())

    const url = new URL(request.url)
    const search = url.searchParams.get('search')?.trim().toLowerCase() ?? ''
    const category = url.searchParams.get('category') ?? ''
    const sort = url.searchParams.get('sort') ?? 'featured'
    const page = Number(url.searchParams.get('page') ?? '1')
    const pageSize = Number(url.searchParams.get('pageSize') ?? PAGE_SIZE_DEFAULT)

    let items = PRODUCTS.filter((product) => {
      const matchesSearch = search === '' || product.name.toLowerCase().includes(search)
      const matchesCategory = category === '' || product.category === category
      return matchesSearch && matchesCategory
    })

    if (sort === 'price-asc') items = [...items].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') items = [...items].sort((a, b) => b.price - a.price)
    if (sort === 'rating') items = [...items].sort((a, b) => b.rating - a.rating)

    const total = items.length
    const totalPages = Math.max(1, Math.ceil(total / pageSize))
    const start = (page - 1) * pageSize
    const pageItems = items.slice(start, start + pageSize)

    const body: ProductListResponse = { items: pageItems, total, page, pageSize, totalPages }
    return HttpResponse.json(body)
  }),

  http.get('/api/products/:id', async ({ params }) => {
    await delay(randomLatency())

    const product = PRODUCTS.find((p) => p.id === params.id)
    if (!product) {
      return HttpResponse.json({ message: 'Product not found' }, { status: 404 })
    }
    return HttpResponse.json(product)
  }),

  http.post('/api/orders', async ({ request }) => {
    await delay(randomLatency() + 400)

    if (Math.random() < FAILURE_RATE) {
      return HttpResponse.json(
        { message: 'Payment processor timed out. Please try again.' },
        { status: 502 },
      )
    }

    const payload = (await request.json()) as Pick<Order, 'items' | 'total'>
    const order: Order = {
      orderId: `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      items: payload.items,
      total: payload.total,
      status: 'confirmed',
    }
    return HttpResponse.json(order, { status: 201 })
  }),
]
