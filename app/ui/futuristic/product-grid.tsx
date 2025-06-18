'use client'
import { HolographicCard } from './holographic-card'

type Product = {
  id: number
  name: string
  price: number
  image: string
  kategori: string
  description: string
  unggulan?: boolean
}

export default function ProductGrid({
  products,
  query,
}: {
  products: Product[]
  query?: string
}) {
  const sanitizeImageUrl = (url: string): string => {
    if (!url) return '/images/default.jpg' // fallback jika kosong
    if (url.startsWith('http') || url.startsWith('https')) return url
    if (url.startsWith('/')) return url
    return `/images/${url}` 
  }

  const safeProducts = products.map((p) => ({
    ...p,
    image: sanitizeImageUrl(p.image),
  }))

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {safeProducts.map((product) => (
        <HolographicCard key={product.id} product={product} query={query} />
      ))}
    </div>
  )
}
