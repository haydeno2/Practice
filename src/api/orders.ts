import { useMutation } from '@tanstack/react-query'
import type { CartItem, Order } from '../types/cart'
import { apiFetch } from './client'

export interface PlaceOrderPayload {
  items: CartItem[]
  total: number
}

export function useCreateOrder() {
  return useMutation({
    mutationFn: (payload: PlaceOrderPayload) =>
      apiFetch<Order>('/api/orders', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    retry: 1,
  })
}
