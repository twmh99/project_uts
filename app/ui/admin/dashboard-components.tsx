// app/ui/admin/dashboard-components.tsx
import { Suspense } from 'react';
import { Card } from '@/app/ui/admin/card';
import { getProducts } from '@/lib/query/getProducts';
import { getUsers } from '@/lib/query/getUsers';
import { getRecentTransactions } from '@/lib/query/getTransactions';
import { format } from 'date-fns';
import {
  DashboardStatsSkeleton,
  RecentTransactionsSkeleton,
  PopularProductsSkeleton
} from '@/app/ui/admin/skeletons';
import { delay } from '@/lib/utils/delay';

// Stats Cards Component
async function StatsCards() {
  await delay(10000); // Delay 10 detik
  const products = await getProducts();
  const transactions = await getRecentTransactions();
  const users = await getUsers();

  const totalProducts = products.length;
  const totalTransactions = transactions.length;
  const totalIncome = transactions.reduce((sum, tx) => sum + Number(tx.amount), 0);

  const stats = [
    { title: 'Total Produk', value: `${totalProducts}`, change: '+5%', trend: 'up' },
    { title: 'Total Transaksi', value: `${totalTransactions}`, change: '+12%', trend: 'up' },
    { title: 'Pendapatan', value: `$${totalIncome.toLocaleString()}`, change: '+8%', trend: 'up' },
    { title: 'Pengguna', value: users.length.toString(), change: '+0%', trend: 'up' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <Card key={index}>
          <h3 className="text-lg text-cyan-300 mb-1">{stat.title}</h3>
          <p className="text-2xl font-bold mb-2">{stat.value}</p>
          <p className={`text-sm ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
            {stat.change} dari bulan lalu
          </p>
        </Card>
      ))}
    </div>
  );
}

// Recent Transactions Component
async function RecentTransactions() {
  await delay(10000); // Delay 10 detik
  const transactions = await getRecentTransactions();

  return (
    <div className="bg-black/50 border border-cyan-400/20 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-6 text-cyan-400">Transaksi Terbaru</h3>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex justify-between items-center border-b border-cyan-400/10 pb-3">
            <div>
              <p className="font-medium">{transaction.id}</p>
              <p className="text-sm text-cyan-300">{transaction.customer}</p>
            </div>
            <div className="text-right">
              <p className="font-mono">${Number(transaction.amount).toFixed(2)}</p>
              <p className="text-sm text-cyan-300">
                {format(new Date(transaction.transaction_date), 'yyyy-MM-dd')}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-6 text-cyan-400 hover:text-cyan-300">
        Lihat Semua Transaksi →
      </button>
    </div>
  );
}

// Popular Products Component
async function PopularProducts() {
  await delay(10000); // Delay 10 detik
  const products = await getProducts();

  return (
    <div className="bg-black/50 border border-cyan-400/20 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-6 text-cyan-400">Produk Terpopuler</h3>
      <div className="space-y-4">
        {products.slice(0, 5).map((product) => (
          <div key={product.id} className="flex items-center space-x-4 border-b border-cyan-400/10 pb-3">
            <div className="w-16 h-16 bg-cyan-900/10 rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-cyan-300">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-6 text-cyan-400 hover:text-cyan-300">
        Lihat Semua Produk →
      </button>
    </div>
  );
}

// Dashboard Component with Suspense
export function DashboardWithSuspense() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-cyan-400">Dashboard Admin</h2>

      <Suspense fallback={<DashboardStatsSkeleton />}>
        <StatsCards />
      </Suspense>

      <div className="grid md:grid-cols-2 gap-8">
        <Suspense fallback={<RecentTransactionsSkeleton />}>
          <RecentTransactions />
        </Suspense>

        <Suspense fallback={<PopularProductsSkeleton />}>
          <PopularProducts />
        </Suspense>
      </div>
    </div>
  );
}
