'use client';

import { useEffect, useState } from 'react';
import ProductGrid from '@/app/ui/futuristic/product-grid';
import { ParticleBackground } from '@/app/ui/futuristic/particles';
import { FilterPanel } from '@/app/ui/futuristic/filters';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  kategori: string;
};

export default function CataloguePage() {
  const [products, setProducts] = useState<Product[]>([]);

  // Ambil semua produk saat pertama kali halaman dimuat
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Gagal mengambil produk:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen">
      <ParticleBackground />

      <main className="container mx-auto px-8 py-24 max-w-[1920px]">
        <h2 className="text-4xl font-bold mb-12 neon-text">
          KATALOG PRODUK
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/5">
            <FilterPanel onFilter={setProducts} />
          </div>
          <div className="md:w-4/5">
            <ProductGrid products={products} />
          </div>
        </div>
      </main>
    </div>
  );
}
