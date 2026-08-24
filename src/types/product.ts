export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  rating: number
  stock: number
}

export interface ProductListResponse {
  items: Product[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
