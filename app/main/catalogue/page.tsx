// app/main/catalogue/page.tsx
import ProductGrid from '@/app/ui/futuristic/product-grid';
import {ParticleBackground} from '@/app/ui/futuristic/particles';
import {FilterPanel} from '@/app/ui/futuristic/filters';
import { getProducts } from '@/lib/query/getProducts';

export default async function CataloguePage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen">
      <ParticleBackground />
      
      <main className="container mx-auto px-8 py-24 max-w-[1920px]">
        <h2 className="text-4xl font-bold mb-12 neon-text">
          KATALOG PRODUK
        </h2>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/5">
            <FilterPanel />
          </div>
          <div className="md:w-4/5">
            <ProductGrid products={products} />
          </div>
        </div>
      </main>
    </div>
  );
}
