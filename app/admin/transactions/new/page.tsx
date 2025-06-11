// app/admin/transactions/new/page.tsx
import { ParticleBackground } from '@/app/ui/futuristic/particles';
import { TransactionForm } from '../transaction-form';
import { getProducts } from '@/lib/query/getProducts';

export default async function NewTransactionPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen">
      <ParticleBackground />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto bg-black/50 border border-cyan-400/20 rounded-xl p-8 backdrop-blur-md">
          <h1 className="text-3xl font-bold mb-8 text-cyan-400">Tambah Transaksi Baru</h1>
          <TransactionForm products={products} />
        </div>
      </main>
    </div>
  );
}