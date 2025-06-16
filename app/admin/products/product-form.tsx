'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ProductForm() {
  const [form, setForm] = useState({
    name: '',
    image: '',
    price: '',
    stock: '',
    status: '',
    unggulan: '',
    kategori: '',
    description: '',
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
          unggulan: form.unggulan || null,
          kategori: form.kategori || null,
          description: form.description || '',
        }),
      })

      let data: any = {}
      try {
        data = await res.json()
      } catch {
        throw new Error('Respon dari server bukan JSON yang valid.')
      }

      if (!res.ok) {
        throw new Error(data.message || '⚠️ Gagal menyimpan produk. Coba lagi nanti.')
      }

      setMessage({ type: 'success', text: 'Produk berhasil ditambahkan ke etalase!' })
      setForm({
        name: '',
        image: '',
        price: '',
        stock: '',
        status: '',
        unggulan: '',
        kategori: '',
        description: '',
      })
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : typeof err === 'string'
          ? err
          : '⚠️ Terjadi kesalahan. Silakan coba lagi.'

      console.error('API Error:', errorMessage)
      setMessage({
        type: 'error',
        text: errorMessage,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-black/40 border border-cyan-400/20 p-8 rounded-xl backdrop-blur-md shadow-md text-white"
    >
      <h2 className="text-2xl font-bold text-cyan-400">Form Produk</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Nama Produk"
          value={form.name}
          onChange={handleChange}
          required
          className="bg-black/60 border border-cyan-400/20 p-3 rounded-lg"
        />

        <input
          type="text"
          name="image"
          placeholder="URL Gambar"
          value={form.image}
          onChange={handleChange}
          required
          className="bg-black/60 border border-cyan-400/20 p-3 rounded-lg"
        />

        <input
          type="number"
          name="price"
          placeholder="Harga"
          value={form.price}
          onChange={handleChange}
          required
          className="bg-black/60 border border-cyan-400/20 p-3 rounded-lg"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stok"
          value={form.stock}
          onChange={handleChange}
          required
          className="bg-black/60 border border-cyan-400/20 p-3 rounded-lg"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          required
          className="bg-black/60 border border-cyan-400/20 p-3 rounded-lg"
        >
          <option value="">Pilih Status</option>
          <option value="tersedia">Tersedia</option>
          <option value="habis">Habis</option>
        </select>

        <select
          name="kategori"
          value={form.kategori}
          onChange={handleChange}
          className="bg-black/60 border border-cyan-400/20 p-3 rounded-lg"
        >
          <option value="">Pilih Kategori</option>
          <option value="Wearables">Wearables</option>
          <option value="Robotics">Robotics</option>
          <option value="Computing">Computing</option>
          <option value="Audio">Audio</option>
          <option value="Accessories">Accessories</option>
        </select>

        <input
          type="text"
          name="unggulan"
          placeholder="Unggulan (opsional)"
          value={form.unggulan}
          onChange={handleChange}
          className="bg-black/60 border border-cyan-400/20 p-3 rounded-lg"
        />
      </div>

      <textarea
        name="description"
        placeholder="Deskripsi Produk"
        value={form.description}
        onChange={handleChange}
        className="bg-black/60 border border-cyan-400/20 p-3 rounded-lg w-full min-h-[100px]"
      />

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
        <Link
          href="/admin/products"
          className="bg-gray-600 hover:bg-gray-500 text-white py-3 px-6 rounded-lg font-medium transition"
        >
          Batal
        </Link>

        <button
          type="submit"
          disabled={loading}
          className="bg-cyan-600 hover:bg-cyan-500 text-white py-3 px-6 rounded-lg font-semibold transition"
        >
          {loading ? 'Menyimpan...' : 'Simpan Produk'}
        </button>
      </div>
    </form>
  )
}
