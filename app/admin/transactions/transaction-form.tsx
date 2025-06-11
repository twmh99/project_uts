'use client';

import { useState } from 'react';
import { HolographicButton } from '@/app/ui/futuristic/button';
import { useRouter } from 'next/navigation';

type Product = {
  id: number;
  name: string;
  price: number;
};

type Transaction = {
  customer: string;
  items: string[];
  amount: number;
  date: string;
  status: 'Completed' | 'Processing' | 'Cancelled';
};

type TransactionFormProps = {
  initialData?: Transaction;
  products: Product[];
};

export function TransactionForm({ initialData, products }: TransactionFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Transaction>(
    initialData || {
      customer: '',
      items: [],
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
    }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prev) => ({
      ...prev,
      items: selectedOptions,
      amount: selectedOptions.reduce((sum, itemId) => {
        const product = products.find((p) => p.id.toString() === itemId);
        return sum + (product?.price || 0);
      }, 0),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/transactions/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/admin/transactions');
      } else {
        alert('Gagal menyimpan transaksi: ' + (data.error || ''));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saat menyimpan transaksi');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-cyan-300">Pelanggan</label>
          <input
            type="text"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            className="w-full bg-cyan-900/20 border border-cyan-400/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-cyan-300">Tanggal</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full bg-cyan-900/20 border border-cyan-400/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="block text-cyan-300">Produk</label>
          <select
            multiple
            name="items"
            value={formData.items}
            onChange={handleItemChange}
            className="w-full bg-cyan-900/20 border border-cyan-400/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 h-32"
            required
          >
            {products.map(product => (
              <option key={product.id} value={product.id.toString()}>
                {product.name} - ${product.price}
              </option>
            ))}
          </select>
          <p className="text-sm text-cyan-400">Gunakan Ctrl/Cmd untuk memilih multiple produk</p>
        </div>

        <div className="space-y-2">
          <label className="block text-cyan-300">Total</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full bg-cyan-900/20 border border-cyan-400/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
            readOnly
          />
        </div>

        <div className="space-y-2">
          <label className="block text-cyan-300">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-cyan-900/20 border border-cyan-400/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          >
            <option className="bg-cyan-900 text-white" value="Processing">Processing</option>
            <option className="bg-cyan-900 text-white" value="Completed">Completed</option>
            <option className="bg-cyan-900 text-white" value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <HolographicButton
          type="button"
          onClick={() => router.push('/admin/transactions')}
          variant="outline"
        >
          Batal
        </HolographicButton>
        <HolographicButton
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Menyimpan...' : 'Simpan Transaksi'}
        </HolographicButton>
      </div>
    </form>
  );
}