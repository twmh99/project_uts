'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditProductForm({ product }: { product: any }) {
  const router = useRouter()

  const [form, setForm] = useState({
    name: product.name || '',
    image: product.image || '',
    price: product.price?.toString() || '',
    stock: product.stock?.toString() || '',
    status: product.status || '',
    unggulan: product.unggulan?.toString() || 'false',
    kategori: product.kategori || '',
    description: product.description || '',
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const price = parseFloat(form.price)
    const stock = parseInt(form.stock)

    if (isNaN(price) || isNaN(stock)) {
      setMessage({ type: 'error', text: '⚠️ Harga dan stok harus berupa angka yang valid.' })
      setLoading(false)
      return
    }

    if (!form.description.trim()) {
      setMessage({ type: 'error', text: '⚠️ Deskripsi tidak boleh kosong.' })
      setLoading(false)
      return
    }

    const res = await fetch(`/api/products/${product.id}/edit`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: product.id,
        name: form.name.trim(),
        image: form.image.trim(),
        price,
        stock,
        status: form.status,
        unggulan: form.unggulan === 'true',
        kategori: form.kategori || null,
        description: form.description.trim(),
      }),
    })

    if (res.ok) {
      setMessage({ type: 'success', text: '✅ Perubahan berhasil disimpan!' })
      setTimeout(() => {
        router.push('/admin/products')
        router.refresh()
      }, 1000)
    } else {
      const err = await res.json()
      setMessage({
        type: 'error',
        text: err?.error || '⚠️ Gagal menyimpan perubahan. Coba lagi.',
      })
    }

    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-black/40 border border-cyan-400/20 p-8 rounded-xl backdrop-blur-md shadow-md text-white"
    >
      <h2 className="text-2xl font-bold text-cyan-400">Edit Produk</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Nama Produk"
          value={form.name}
          onChange={handleChange}
          required
          className="bg-black/60 border border-cyan-400/20 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />

        <input
          type="text"
          name="image"
          placeholder="URL Gambar"
          value={form.image}
          onChange={handleChange}
          required
          className="bg-black/60 border border-cyan-400/20 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />

        <input
          type="number"
          name="price"
          placeholder="Harga"
          value={form.price}
          onChange={handleChange}
          required
          className="bg-black/60 border border-cyan-400/20 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stok"
          value={form.stock}
          onChange={handleChange}
          required
          className="bg-black/60 border border-cyan-400/20 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          required
          className="bg-black/60 border border-cyan-400/20 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        >
          <option value="">Pilih Status</option>
          <option value="tersedia">Tersedia</option>
          <option value="habis">Habis</option>
        </select>

        <select
          name="kategori"
          value={form.kategori}
          onChange={handleChange}
          className="bg-black/60 border border-cyan-400/20 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        >
          <option value="">Pilih Kategori</option>
          <option value="Wearables">Wearables</option>
          <option value="Robotics">Robotics</option>
          <option value="Computing">Computing</option>
          <option value="Audio">Audio</option>
          <option value="Accessories">Accessories</option>
        </select>

        <select
          name="unggulan"
          value={form.unggulan}
          onChange={handleChange}
          className="bg-black/60 border border-cyan-400/20 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        >
          <option value="false">Bukan Produk Unggulan</option>
          <option value="true">Produk Unggulan</option>
        </select>

        <textarea
          name="description"
          placeholder="Deskripsi singkat"
          value={form.description}
          onChange={handleChange}
          required
          rows={3}
          className="bg-black/60 border border-cyan-400/20 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />
      </div>

      {message && (
        <p
          className={`text-sm font-medium px-4 py-2 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-600/20 text-green-300 border border-green-500'
              : 'bg-red-600/20 text-red-300 border border-red-500'
          }`}
        >
          {message.text}
        </p>
      )}

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.push('/admin/products')}
          disabled={loading}
          className="bg-gray-600 hover:bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold transition"
        >
          Batal
        </button>

        <button
          type="submit"
          disabled={loading}
          className="bg-cyan-600 hover:bg-cyan-500 text-white py-3 px-6 rounded-lg font-semibold transition"
        >
          {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>
    </form>
  )
}
