import { HolographicCard } from './ui/futuristic/holographic-card';
import { ParticleBackground } from './ui/futuristic/particles';
import { products } from './data/products';

export default function Home() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen">
      <ParticleBackground />
      
      <main className="container mx-auto px-4 py-16 pt-24">
        <section className="mb-20">
          <h1 className="text-6xl font-bold mb-4 neon-text">
            FUTURE<span className="text-white">TECH</span>
          </h1>
          <p className="text-2xl mb-8 text-cyan-200 max-w-2xl">
            Rasakan masa depan hari ini dengan produk teknologi mutakhir kami
          </p>
          <a 
            href="/catalogue" 
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:shadow-cyan-400/50 hover:shadow-lg transition-all text-lg inline-block"
          >
            Jelajahi Sekarang
          </a>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-cyan-400">Produk Unggulan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <HolographicCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
