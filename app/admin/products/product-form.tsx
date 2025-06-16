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

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!form.name.trim()) newErrors.name = 'Nama produk wajib diisi.'
    if (!form.image.trim()) newErrors.image = 'URL gambar wajib diisi.'
    const price = parseFloat(form.price)
    if (isNaN(price)) newErrors.price = 'Harga harus berupa angka.'
    else if (price < 0) newErrors.price = 'Harga tidak boleh negatif.'
    const stock = parseInt(form.stock)
    if (isNaN(stock)) newErrors.stock = 'Stok harus berupa angka.'
    else if (stock < 0) newErrors.stock = 'Stok tidak boleh negatif.'
    if (!form.status) newErrors.status = 'Status harus dipilih.'
    if (!form.unggulan) newErrors.unggulan = 'Unggulan harus dipilih.'
    if (!form.description.trim()) newErrors.description = 'Deskripsi wajib diisi.'
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setLoading(false)
      return
    }

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
          unggulan: form.unggulan,
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
      setErrors({})
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : typeof err === 'string'
          ? err
          : '⚠️ Terjadi kesalahan. Silakan coba lagi.'

      console.error('API Error:', errorMessage)
      setMessage({ type: 'error', text: errorMessage })
    } finally {
      setLoading(false)
    }
  }

  const inputClass = (field: string) =>
    `bg-black/60 border ${
      errors[field] ? 'border-red-500' : 'border-cyan-400/20'
    } p-3 rounded-lg w-full focus:outline-none focus:ring-2 ${
      errors[field] ? 'focus:ring-red-400' : 'focus:ring-cyan-400'
    } transition`

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-black/40 border border-cyan-400/20 p-8 rounded-xl backdrop-blur-md shadow-md text-white"
    >
      <h2 className="text-2xl font-bold text-cyan-400">Tambah Produk Baru</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Nama Produk"
            value={form.name}
            onChange={handleChange}
            className={inputClass('name')}
          />
          {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name}</p>}
        </div>

        <div>
          <input
            type="text"
            name="image"
            placeholder="URL Gambar"
            value={form.image}
            onChange={handleChange}
            className={inputClass('image')}
          />
          {errors.image && <p className="text-sm text-red-400 mt-1">{errors.image}</p>}
        </div>

        <div>
          <input
            type="number"
            name="price"
            placeholder="Harga"
            value={form.price}
            onChange={handleChange}
            className={inputClass('price')}
          />
          {errors.price && <p className="text-sm text-red-400 mt-1">{errors.price}</p>}
        </div>

        <div>
          <input
            type="number"
            name="stock"
            placeholder="Stok"
            value={form.stock}
            onChange={handleChange}
            className={inputClass('stock')}
          />
          {errors.stock && <p className="text-sm text-red-400 mt-1">{errors.stock}</p>}
        </div>

        <div>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className={inputClass('status')}
          >
            <option value="">Pilih Status</option>
            <option value="tersedia">Tersedia</option>
            <option value="habis">Habis</option>
          </select>
          {errors.status && <p className="text-sm text-red-400 mt-1">{errors.status}</p>}
        </div>

        <div>
          <select
            name="kategori"
            value={form.kategori}
            onChange={handleChange}
            className="bg-black/60 border border-cyan-400/20 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          >
            <option value="">Pilih Kategori</option>
            <option value="Wearables">Wearables</option>
            <option value="Robotics">Robotics</option>
            <option value="Computing">Computing</option>
            <option value="Audio">Audio</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <select
            name="unggulan"
            value={form.unggulan}
            onChange={handleChange}
            className={inputClass('unggulan')}
          >
            <option value="">Pilih Produk Unggulan</option>
            <option value="y">Produk Unggulan</option>
            <option value="x">Bukan Produk Unggulan</option>
          </select>
          {errors.unggulan && <p className="text-sm text-red-400 mt-1">{errors.unggulan}</p>}
        </div>
      </div>

      <textarea
        name="description"
        placeholder="Deskripsi Produk"
        value={form.description}
        onChange={handleChange}
        className={inputClass('description') + ' w-full min-h-[100px]'}
      />
      {errors.description && <p className="text-sm text-red-400 mt-1">{errors.description}</p>}

      {message && (
        <p
          className={`text-sm font-medium px-4 py-2 rounded-lg mt-2 ${
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