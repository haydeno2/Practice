import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { CartProvider, useCart } from './CartContext'
import type { Product } from '../types/product'

const product: Product = {
  id: '1',
  name: 'Test Widget',
  description: 'A widget for testing.',
  price: 10,
  category: 'Test',
  image: 'https://example.com/widget.png',
  rating: 4.5,
  stock: 5,
}

beforeEach(() => {
  window.localStorage.clear()
})

describe('CartContext', () => {
  it('adds an item and computes totals', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider })

    act(() => result.current.addItem(product, 2))

    expect(result.current.items).toHaveLength(1)
    expect(result.current.itemCount).toBe(2)
    expect(result.current.subtotal).toBe(20)
  })

  it('merges quantities when adding the same product twice', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider })

    act(() => result.current.addItem(product, 1))
    act(() => result.current.addItem(product, 3))

    expect(result.current.items).toHaveLength(1)
    expect(result.current.itemCount).toBe(4)
  })

  it('removes an item when quantity is set to zero', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider })

    act(() => result.current.addItem(product, 1))
    act(() => result.current.setQuantity(product.id, 0))

    expect(result.current.items).toHaveLength(0)
  })

  it('clears the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider })

    act(() => result.current.addItem(product, 1))
    act(() => result.current.clear())

    expect(result.current.items).toHaveLength(0)
    expect(result.current.subtotal).toBe(0)
  })
})
