import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react'
import type { CartItem } from '../types/cart'
import type { Product } from '../types/product'

const STORAGE_KEY = 'storefront-cart'

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; quantity: number }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'SET_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((item) => item.product.id === action.product.id)
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + action.quantity }
              : item,
          ),
        }
      }
      return { items: [...state.items, { product: action.product, quantity: action.quantity }] }
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter((item) => item.product.id !== action.productId) }
    case 'SET_QUANTITY':
      if (action.quantity <= 0) {
        return { items: state.items.filter((item) => item.product.id !== action.productId) }
      }
      return {
        items: state.items.map((item) =>
          item.product.id === action.productId ? { ...item, quantity: action.quantity } : item,
        ),
      }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

function loadInitialState(): CartState {
  if (typeof window === 'undefined') return { items: [] }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { items: [] }
    const parsed = JSON.parse(raw) as CartState
    return { items: parsed.items ?? [] }
  } catch {
    return { items: [] }
  }
}

interface CartContextValue {
  items: CartItem[]
  itemCount: number
  subtotal: number
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  setQuantity: (productId: string, quantity: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const value = useMemo<CartContextValue>(() => {
    const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = state.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0)

    return {
      items: state.items,
      itemCount,
      subtotal,
      addItem: (product, quantity = 1) => dispatch({ type: 'ADD_ITEM', product, quantity }),
      removeItem: (productId) => dispatch({ type: 'REMOVE_ITEM', productId }),
      setQuantity: (productId, quantity) => dispatch({ type: 'SET_QUANTITY', productId, quantity }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }
  }, [state])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components -- context + hook colocated intentionally
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
