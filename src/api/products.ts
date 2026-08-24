import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { Product, ProductListResponse } from '../types/product'
import { apiFetch } from './client'

export interface ProductFilters {
  search: string
  category: string
  sort: string
  page: number
  pageSize: number
}

function toSearchParams(filters: ProductFilters): string {
  const params = new URLSearchParams()
  if (filters.search) params.set('search', filters.search)
  if (filters.category) params.set('category', filters.category)
  if (filters.sort) params.set('sort', filters.sort)
  params.set('page', String(filters.page))
  params.set('pageSize', String(filters.pageSize))
  return params.toString()
}

export function useProducts(filters: ProductFilters) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => apiFetch<ProductListResponse>(`/api/products?${toSearchParams(filters)}`),
    placeholderData: keepPreviousData,
  })
}

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => apiFetch<Product>(`/api/products/${id}`),
    enabled: Boolean(id),
  })
}
