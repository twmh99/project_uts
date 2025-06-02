'use client';

import { HolographicCard } from './holographic-card';

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  unggulan?: boolean;
};

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-1 max-w-7xl mx-auto">
      {products.map((product) => (
        <HolographicCard key={product.id} product={product} />
      ))}
    </div>
  );
}
