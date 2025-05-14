import { ParticleBackground } from '@/app/ui/futuristic/particles';
import { HolographicButton } from '@/app/ui/futuristic/button';
import Image from 'next/image';
import { products } from '@/app/data/products';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const {id} = params;
  const product = products.find(p => p.id.toString() === id);

  if (!product) {
    return <div>Produk tidak ditemukan</div>;
  }

  return (
    <div className="min-h-screen">
      <ParticleBackground />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="relative h-96 bg-black/50 border border-cyan-400/20 rounded-xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-8"
              />
            </div>

            <div>
              <h1 className="text-4xl font-bold mb-4 text-cyan-400">{product.name}</h1>
              <p className="text-2xl font-mono mb-6">${product.price}</p>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2 text-cyan-300">Deskripsi</h3>
                <p className="text-cyan-100">{product.description}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2 text-cyan-300">Spesifikasi</h3>
                <ul className="text-cyan-100 space-y-2">
                  <li>• Teknologi mutakhir dengan integrasi AI</li>
                  <li>• Desain ergonomis dan futuristik</li>
                  <li>• Garansi 1 tahun</li>
                  <li>• Bahan ramah lingkungan</li>
                </ul>
              </div>

              <div className="flex space-x-4">
                <div className="border border-cyan-400/30 rounded-lg overflow-hidden flex items-center">
                  <button className="px-3 py-1 bg-cyan-900/20 hover:bg-cyan-800/30">
                    -
                  </button>
                  <span className="px-3 py-1">1</span>
                  <button className="px-3 py-1 bg-cyan-900/20 hover:bg-cyan-800/30">
                    +
                  </button>
                </div>

                <HolographicButton className="flex-1">
                  Tambah ke Keranjang
                </HolographicButton>
              </div>
            </div>
          </div>

          <section className="mt-20">
            <h3 className="text-2xl font-bold mb-6 text-cyan-400">Produk Terkait</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products
                .filter(p => p.id !== product.id)
                .slice(0, 4)
                .map(product => (
                  <div key={product.id} className="bg-black/50 border border-cyan-400/20 rounded-xl p-4 hover:shadow-cyan-500/20 hover:shadow-lg transition-all">
                    <div className="relative h-40 mb-4">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h4 className="text-lg font-bold text-cyan-300">{product.name}</h4>
                    <p className="text-cyan-400">${product.price}</p>
                  </div>
                ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}