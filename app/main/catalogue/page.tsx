'use client'
import { useState, useEffect } from 'react'
import ProductGrid from '@/app/ui/futuristic/product-grid'
import { ParticleBackground } from '@/app/ui/futuristic/particles'
import { FilterPanel } from '@/app/ui/futuristic/filters'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

export default function CataloguePage() {
  const [products, setProducts] = useState<any[]>([])
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState<URLSearchParams>(new URLSearchParams())
  const [loading, setLoading] = useState(false)

  const fetchAll = async () => {
    setLoading(true)
    const params = new URLSearchParams(filters)
    if (q) params.set('q', q); else params.delete('q')
    params.set('page', page.toString())

    try {
      const res = await fetch(`/api/products?${params.toString()}`)
      const data = await res.json()
      if (data.success) {
        setProducts(data.products)
        setTotal(data.total)
        setTotalPages(data.totalPages)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [filters, q, page])

  const generatePagination = (currentPage: number, totalPages: number) => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    if (currentPage <= 3) return [1, 2, 3, '...', totalPages - 1, totalPages]
    if (currentPage >= totalPages - 2) return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
  }

  return (
    <div className="min-h-screen">
      <ParticleBackground />
      <main className="container mx-auto px-8 py-24">
        <h2 className="text-4xl font-bold mb-8 neon-text">KATALOG PRODUK</h2>

        <div className="flex gap-6 items-start">
          {/* Sidebar Filter */}
          <div className="w-1/4">
            <FilterPanel onFilter={(ps) => { setPage(1); setFilters(ps) }} />
          </div>

          {/* Konten Utama */}
          <div className="w-3/4">
            <div className="flex justify-between items-center mb-4">
              {/* Search Bar */}
              <div className="relative flex flex-1 flex-shrink-0 max-w-md">
                <input
                  className="peer block w-full rounded-lg border border-cyan-400/30 bg-cyan-900/10 py-[9px] pl-10 text-sm text-cyan-100 outline-2 placeholder:text-cyan-400/60 focus:border-cyan-400 focus:outline-none"
                  placeholder="Cari produk..."
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && setPage(1)}
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-cyan-400/60 peer-focus:text-cyan-400" />
              </div>

              <p className="text-cyan-400 text-sm ml-4">Total Produk: {total}</p>
            </div>

            {loading ? (
              <p className="text-white text-center text-lg mt-10">Memuat...</p>
            ) : products.length === 0 ? (
              <p className="text-white text-center text-lg mt-10">Produk tidak ditemukan.</p>
            ) : (
              <ProductGrid products={products} query={q} />
            )}

            {/* Pagination */}
            <div className="mt-8 flex justify-center gap-2">
              {/* Tombol kiri */}
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className={clsx(
                  'flex h-10 w-10 items-center justify-center rounded-md border',
                  page === 1
                    ? 'pointer-events-none text-cyan-400/30 border-cyan-400/20'
                    : 'hover:bg-cyan-900/20 border-cyan-400/30 bg-cyan-900/10 text-cyan-100'
                )}
              >
                ←
              </button>

              {/* Nomor halaman */}
              {generatePagination(page, totalPages).map((p, i) =>
                p === '...' ? (
                  <div key={i} className="flex h-10 w-10 items-center justify-center text-sm text-cyan-400/60">…</div>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(Number(p))}
                    className={clsx(
                      'flex h-10 w-10 items-center justify-center text-sm border',
                      {
                        'z-10 bg-cyan-500 border-cyan-500 text-black rounded-md': page === p,
                        'hover:bg-cyan-900/20 border-cyan-400/30 bg-cyan-900/10 text-cyan-100 rounded-md': page !== p,
                      }
                    )}
                  >
                    {p}
                  </button>
                )
              )}

              {/* Tombol kanan */}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className={clsx(
                  'flex h-10 w-10 items-center justify-center rounded-md border',
                  page === totalPages
                    ? 'pointer-events-none text-cyan-400/30 border-cyan-400/20'
                    : 'hover:bg-cyan-900/20 border-cyan-400/30 bg-cyan-900/10 text-cyan-100'
                )}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
