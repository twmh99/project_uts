import { ParticleBackground } from '@/app/ui/futuristic/particles';
import { TransactionForm } from '../transaction-form';

export default async function EditTransactionPage({ params }: { params: { id: string } }) {
  const id = await new Promise<string>((resolve) => {
    setTimeout(() => resolve(params.id), 100);
  }); 
  const transaction = {
    id: id,
    customer: 'Example Customer',
    items: ['1', '2'],
    amount: 299,
    date: '2023-10-15',
    status: 'Completed' as const
  };

  return (
    <div className="min-h-screen">
      <ParticleBackground />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto bg-black/50 border border-cyan-400/20 rounded-xl p-8 backdrop-blur-md">
          <h1 className="text-3xl font-bold mb-8 text-cyan-400">Edit Transaksi</h1>
          <TransactionForm initialData={transaction} />
        </div>
      </main>
    </div>
  );
}