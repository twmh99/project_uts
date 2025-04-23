import { ProductGrid } from 'app/ui/futuristic/product-grid';
import { ParticleBackground } from 'app/ui/futuristic/particles';
import { FilterPanel } from 'app/ui/futuristic/filters';
import { products } from 'app/data/products';

export default function CataloguePage() {
  return (
    <div className="min-h-screen">
      <ParticleBackground />
      
      <main className="container mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold mb-12 neon-text">
          KATALOG PRODUK
        </h2>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <FilterPanel />
          </div>
          <div className="md:w-3/4">
            <ProductGrid products={products} />
          </div>
        </div>
      </main>
    </div>
  );
}