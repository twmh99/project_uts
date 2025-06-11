'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../../context/cart-context';
import { Notification } from 'components/notification';

type Product = {
  id: number; name: string; image: string;
  price: number; description: string; 
  unggulan?: boolean;
};

export function HolographicCard({ product }: { product: any }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    setShowNotification(true);
  };
  
  return (
    <div 
      className={`holographic-card ${isHovered ? 'shadow-lg shadow-cyan-500/30' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-50'}`} />
      
      <div className="relative p-6 z-10">
        <div className="h-48 relative mb-4">
          <Image 
            src={product.image} 
            alt={product.name}
            fill
            className="object-contain transition-transform duration-500 hover:scale-110"
          />
        </div>
        
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-cyan-300 mb-4">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-2xl font-mono">${product.price}</span>
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
  );
}