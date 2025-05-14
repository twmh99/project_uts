import Link from 'next/link';
import { products } from '@/app/data/products';

export default function AdminProductsPage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-cyan-400">Kelola Produk</h2>
                <Link
                    href="/admin/products/new"
                    className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-colors"
                >
                   + Tambah Produk test
                </Link>
            </div>

            <div className="border border-cyan-400/20 rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-cyan-900/10">
                        <tr>
                            <th className="p-4 text-left">Produk</th>
                            <th className="p-4 text-left">Kategori</th>
                            <th className="p-4 text-left">Harga</th>
                            <th className="p-4 text-left">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border-t border-cyan-400/10 hover:bg-cyan-900/10">
                                <td className="p-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-cyan-900/10 rounded-lg overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium">{product.name}</p>
                                            <p className="text-sm text-cyan-400 line-clamp-1">{product.description}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 capitalize">{product.category}</td>
                                <td className="p-4 font-mono">${product.price}</td>
                                <td className="p-4">
                                    <div className="flex space-x-2">
                                        <Link
                                            href={`/admin/products/${product.id}/edit`}
                                            className="px-3 py-1 bg-cyan-900/20 border border-cyan-400/30 rounded-lg hover:bg-cyan-800/30"
                                        >
                                            Edit
                                        </Link>
                                        <button className="px-3 py-1 bg-red-900/20 border border-red-400/30 rounded-lg hover:bg-red-800/30">
                                            Hapus
                                        </button>
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