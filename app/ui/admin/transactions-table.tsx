import Link from 'next/link';
import { getFilteredTransactions } from '@/lib/query/getTransactions';

export default async function TransactionsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const transactions = await getFilteredTransactions(query, currentPage);

  return (
    <div className="border border-cyan-400/20 rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-cyan-900/10">
          <tr>
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Pelanggan</th>
            <th className="p-4 text-left">Total</th>
            <th className="p-4 text-left">Tanggal</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-8 text-center text-cyan-400/60">
                {query ? `Tidak ada transaksi yang ditemukan untuk "${query}"` : 'Belum ada transaksi'}
              </td>
            </tr>
          ) : (
            transactions.map((transaction) => (
              <tr key={transaction.id} className="border-t border-cyan-400/10 hover:bg-cyan-900/10">
                <td className="p-4 font-mono">{transaction.id}</td>
                <td className="p-4">{transaction.customer}</td>
                <td className="p-4 font-mono">${parseFloat(transaction.amount).toFixed(2)}</td>
                <td className="p-4">{new Date(transaction.transaction_date).toLocaleDateString()}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    transaction.status === 'Completed'
                      ? 'bg-green-900/30 text-green-400'
                      : transaction.status === 'Pending'
                      ? 'bg-yellow-900/30 text-yellow-400'
                      : 'bg-red-900/30 text-red-400'
                  }`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="p-4">
                  <Link
                    href={`/admin/transactions/${transaction.id}/edit`}
                    className="px-3 py-1 bg-cyan-900/20 border border-cyan-400/30 rounded-lg hover:bg-cyan-800/30"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}