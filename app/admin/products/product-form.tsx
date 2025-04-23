'use client';

import { useState } from 'react';
import { HolographicButton } from '@/app/ui/futuristic/button';
import { useRouter } from 'next/navigation';

type Product = {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

export function ProductForm({ initialData }: { initialData?: Product }) {
  const router = useRouter();
  const [formData, setFormData] = useState<Product>(initialData || {
    name: '',
    description: '',
    price: 0,
    category: '',
    image: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Submitting:', formData);

      await new Promise(resolve => setTimeout(resolve, 1000));

      router.push('/admin/products');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-cyan-300">Nama Produk</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-cyan-900/20 border border-cyan-400/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-cyan-300">Kategori</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-cyan-900/20 border border-cyan-400/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          >
            <option value="">Pilih Kategori</option>
            <option value="electronics">Elektronik</option>
            <option value="gadgets">Gadget</option>
            <option value="accessories">Aksesoris</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-cyan-300">Harga ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full bg-cyan-900/20 border border-cyan-400/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-cyan-300">Gambar (URL)</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full bg-cyan-900/20 border border-cyan-400/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="block text-cyan-300">Deskripsi</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full bg-cyan-900/20 border border-cyan-400/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <HolographicButton
          type="button"
          onClick={() => router.push('/admin/products')}
          variant="outline"
        >
          Batal
        </HolographicButton>
        <HolographicButton
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Menyimpan...' : 'Simpan Produk'}
        </HolographicButton>
      </div>
    </form>
  );
}