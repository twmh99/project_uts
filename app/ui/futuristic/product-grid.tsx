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

export default function ProductGrid({ products, query }: { products: Product[], query?: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <HolographicCard key={product.id} product={product} query={query} />
      ))}
    </div>
  )
}


// 'use client'
// import Link from 'next/link'
// import { HolographicCard } from './holographic-card'

// type Product = {
//   id: number
//   name: string
//   price: number
//   image: string
//   kategori: string
//   description: string
//   unggulan?: boolean
// }

// export default function ProductGrid({ products, query }: { products: Product[], query?: string }) {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {products.map(product => (
//         <Link
//           key={product.id}
//           href={`/main/catalogue/${product.id}`}
//           className="block"
//         >
//           <HolographicCard product={product} query={query} />
//         </Link>
//       ))}
//     </div>
//   )
// }
