import { HolographicCard } from './holographic-card';

export function ProductGrid({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <HolographicCard key={product.id} product={product} />
      ))}
    </div>
  );
}