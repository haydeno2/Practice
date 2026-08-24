import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Cart } from './routes/Cart'
import { Checkout } from './routes/Checkout'
import { Home } from './routes/Home'
import { NotFound } from './routes/NotFound'
import { OrderConfirmation } from './routes/OrderConfirmation'
import { ProductDetail } from './routes/ProductDetail'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-confirmation" element={<OrderConfirmation />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
