import { ParticleBackground } from '@/app/ui/futuristic/particles';
import { TransactionForm } from '../transaction-form';
import { type Metadata } from 'next';

type EditTransactionPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: EditTransactionPageProps): Promise<Metadata> {
  return {
    title: `Edit Transaksi ${params.id}`,
  };
}

export default async function EditTransactionPage({ params }: EditTransactionPageProps) {
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  const id = params.id;
  const transaction = {
    id,
    customer: 'Example Customer',
    items: ['1', '2'],
    amount: 299,
    date: '2023-10-15',
    status: 'Completed' as const,
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
