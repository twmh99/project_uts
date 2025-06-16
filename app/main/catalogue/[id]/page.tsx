import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import Image from 'next/image'
import Link from 'next/link'
import { ParticleBackground } from '@/app/ui/futuristic/particles'

interface Product {
  id: number
  name: string
  price: number
  image: string
  kategori: string
  status: string
  stock: number
  description?: string | null
}

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params
  const id = Number(resolvedParams?.id)

  if (!id || isNaN(id)) return notFound()

  const res = await db.query('SELECT * FROM products WHERE id = $1', [id])
  const product = res.rows[0]

  if (!product) return notFound()

  return (
    <div className="min-h-screen relative text-white">
      <ParticleBackground />
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        <div className="bg-black/60 border border-cyan-500/20 rounded-2xl shadow-xl p-10 backdrop-blur-sm">
          {/* Tombol kembali */}
          <Link href="/main/catalogue" className="inline-block mb-8 text-cyan-400 hover:text-cyan-300 hover:underline transition">
            ← Kembali ke Katalog
          </Link>

          <div className="flex flex-col md:flex-row gap-10">
            {/* Gambar Produk */}
            <div className="w-full md:w-1/2">
              <div className="relative w-full h-80 md:h-full border border-cyan-500/30 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Informasi Produk */}
            <div className="w-full md:w-1/2 space-y-5">
              <h1 className="text-4xl font-bold text-cyan-300 neon-text">
                {product.name}
              </h1>
              <p className="text-2xl font-semibold text-cyan-400">
                ${product.price.toLocaleString('id-ID')}
              </p>

              <div className="text-cyan-100 space-y-2">
                <p><span className="font-semibold">Kategori:</span> {product.kategori}</p>
                <p><span className="font-semibold">Status:</span> {product.status}</p>
                <p><span className="font-semibold">Stok:</span> {product.stock}</p>
              </div>

              {product.description && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-cyan-200 mb-2">Deskripsi</h2>
                  <p className="text-cyan-100 whitespace-pre-line text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}