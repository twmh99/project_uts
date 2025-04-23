import Link from 'next/link';

export default function AdminTransactionsPage() {
    const transactions = [
        { id: '#FT-1001', customer: 'Yosia', amount: 299, date: '2023-10-15', status: 'Completed', items: ['Headset Quantum X9'] },
        { id: '#FT-1000', customer: 'Aldo', amount: 199, date: '2023-10-14', status: 'Completed', items: ['Jaket Pintar Neon'] },
        { id: '#FT-0999', customer: 'Dicky', amount: 599, date: '2023-10-13', status: 'Processing', items: ['Drone Pendamping AI'] },
        { id: '#FT-0998', customer: 'Andre', amount: 249, date: '2023-10-12', status: 'Completed', items: ['Holo-Watch Pro'] },
        { id: '#FT-0997', customer: 'Ambro', amount: 129, date: '2023-10-11', status: 'Completed', items: ['Ransel Pengisi Daya Tenaga Surya'] },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-cyan-400">Daftar Transaksi</h2>
                <Link
                    href="/admin/transactions/new"
                    className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-colors">
                    Tambah Transaksi
                </Link>
            </div>

            <div className="border border-cyan-400/20 rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-cyan-900/10">
                        <tr>
                            <th className="p-4 text-left">ID</th>
                            <th className="p-4 text-left">Pelanggan</th>
                            <th className="p-4 text-left">Produk</th>
                            <th className="p-4 text-left">Total</th>
                            <th className="p-4 text-left">Tanggal</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-left">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id} className="border-t border-cyan-400/10 hover:bg-cyan-900/10">
                                <td className="p-4 font-mono">{transaction.id}</td>
                                <td className="p-4">{transaction.customer}</td>
                                <td className="p-4">
                                    <div className="line-clamp-1">{transaction.items.join(', ')}</div>
                                </td>
                                <td className="p-4 font-mono">${transaction.amount}</td>
                                <td className="p-4">{transaction.date}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${transaction.status === 'Completed'
                                        ? 'bg-green-900/30 text-green-400'
                                        : 'bg-yellow-900/30 text-yellow-400'
                                        }`}>
                                        {transaction.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex space-x-2">
                                        <Link
                                            href={`/admin/transactions/${transaction.id}/edit`}
                                            className="px-3 py-1 bg-cyan-900/20 border border-cyan-400/30 rounded-lg hover:bg-cyan-800/30"
                                        >
                                            Detail
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}