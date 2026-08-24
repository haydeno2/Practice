import type { Product } from './product'

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  orderId: string
  items: CartItem[]
  total: number
  status: 'confirmed'
}
