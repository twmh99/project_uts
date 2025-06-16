'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCart } from '../../context/cart-context'
import { Notification } from 'components/notification'

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  kategori?: string;
  unggulan?: boolean;
};

export function HolographicCard({ product, query }: { product: Product, query?: string }) {
  const [isHovered, setIsHovered] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const { addToCart } = useCart()
  const router = useRouter()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation() // cegah trigger navigasi ke detail
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.kategori ?? 'Uncategorized',
    })
    setShowNotification(true)
  }

  const highlight = (text: string) => {
    if (!query) return text
    const regex = new RegExp(`(${query})`, 'gi')
    const parts = text.split(regex)

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-300 text-black px-1 rounded">{part}</mark>
      ) : (
        <span key={i}>{part}</span>
      )
    )
  }

  const handleClick = () => {
    router.push(`/main/catalogue/${product.id}`)
  }

  return (
    <div
      className={`relative holographic-card cursor-pointer overflow-hidden rounded-xl transition-shadow ${
        isHovered ? 'shadow-lg shadow-cyan-500/30' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Background effect - jangan halangi klik */}
      <div
        className={`absolute inset-0 z-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 transition-opacity duration-300 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-50'
        }`}
      />

      {/* Konten utama */}
      <div className="relative p-6 z-10">
        <div className="h-48 relative mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-500 hover:scale-110"
          />
        </div>

        <h3 className="text-xl font-bold mb-2">{highlight(product.name)}</h3>
        <p className="text-cyan-300 mb-4 line-clamp-2">{product.description}</p>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-mono">${product.price}</span>

          {/* Tombol dengan onClick terpisah */}
          <button
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:shadow-cyan-400/50 hover:shadow-lg transition-all"
            onClick={handleAddToCart}
          >
            Masukkan Keranjang
          </button>
        </div>
      </div>

      <Notification
        message={`${product.name} telah dimasukkan ke keranjang`}
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </div>
  )
}
