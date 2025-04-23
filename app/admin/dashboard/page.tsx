import { Card } from '@/app/ui/admin/card';
import { products } from '@/app/data/products';

export default function AdminDashboardPage() {
  const stats = [
    { title: 'Total Produk', value: '24', change: '+5%', trend: 'up' },
    { title: 'Total Transaksi', value: '156', change: '+12%', trend: 'up' },
    { title: 'Pendapatan', value: '$12,345', change: '+8%', trend: 'up' },
    { title: 'Pengguna', value: '89', change: '-2%', trend: 'down' },
  ];

  const recentTransactions = [
    { id: '#FT-1001', customer: 'Yosia', amount: '$299', date: '2023-10-15', status: 'Completed' },
    { id: '#FT-1000', customer: 'Aldo', amount: '$199', date: '2023-10-14', status: 'Completed' },
    { id: '#FT-0999', customer: 'Dicky', amount: '$599', date: '2023-10-13', status: 'Processing' },
    { id: '#FT-0998', customer: 'Andre', amount: '$249', date: '2023-10-12', status: 'Completed' },
    { id: '#FT-0997', customer: 'Ambro', amount: '$129', date: '2023-10-11', status: 'Completed' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-cyan-400">Dashboard Admin</h2>

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

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-black/50 border border-cyan-400/20 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-6 text-cyan-400">Transaksi Terbaru</h3>

          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex justify-between items-center border-b border-cyan-400/10 pb-3">
                <div>
                  <p className="font-medium">{transaction.id}</p>
                  <p className="text-sm text-cyan-300">{transaction.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono">{transaction.amount}</p>
                  <p className="text-sm text-cyan-300">{transaction.date}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-6 text-cyan-400 hover:text-cyan-300">
            Lihat Semua Transaksi →
          </button>
        </div>

        <div className="bg-black/50 border border-cyan-400/20 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-6 text-cyan-400">Produk Terpopuler</h3>

          <div className="space-y-4">
            {products.slice(0, 4).map((product) => (
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
      </div>
    </div>
  );
}