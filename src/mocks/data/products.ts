import type { Product } from '../../types/product'

const CATEGORIES = ['Audio', 'Wearables', 'Home', 'Bags', 'Accessories'] as const

const NAMES: Record<(typeof CATEGORIES)[number], string[]> = {
  Audio: [
    'Wireless Earbuds',
    'Studio Headphones',
    'Bluetooth Speaker',
    'Vinyl Turntable',
    'Soundbar',
  ],
  Wearables: ['Fitness Tracker', 'Smart Watch', 'Sleep Ring', 'Heart Rate Band', 'AR Glasses'],
  Home: ['Ceramic Diffuser', 'Desk Lamp', 'Espresso Maker', 'Air Purifier', 'Smart Thermostat'],
  Bags: ['Canvas Tote', 'Leather Backpack', 'Travel Duffel', 'Laptop Sleeve', 'Crossbody Bag'],
  Accessories: ['Sunglasses', 'Wool Scarf', 'Wallet', 'Phone Case', 'Notebook Set'],
}

function seededRandom(seed: number) {
  let value = seed
  return () => {
    value = (value * 9301 + 49297) % 233280
    return value / 233280
  }
}

function buildCatalog(): Product[] {
  const products: Product[] = []
  let id = 1

  for (const category of CATEGORIES) {
    for (const name of NAMES[category]) {
      const rand = seededRandom(id * 97)
      products.push({
        id: String(id),
        name,
        category,
        description: `${name} — a carefully designed ${category.toLowerCase()} piece, built for everyday use with premium materials and a two-year warranty.`,
        price: Math.round((20 + rand() * 180) * 100) / 100,
        image: `https://picsum.photos/seed/storefront-${id}/600/600`,
        rating: Math.round((3 + rand() * 2) * 10) / 10,
        stock: Math.floor(rand() * 40),
      })
      id += 1
    }
  }

  return products
}

export const PRODUCTS: Product[] = buildCatalog()
export const CATEGORY_LIST: string[] = [...CATEGORIES]
