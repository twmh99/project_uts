import Link from 'next/link';
import { getFilteredProducts } from '@/lib/query/getProducts';
import DeleteButton from '@/components/DeleteButton';

export default async function ProductsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const products = await getFilteredProducts(query, currentPage);

  return (
    <div className="border border-cyan-400/20 rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-cyan-900/10">
          <tr>
            <th className="p-4 text-left">Produk</th>
            <th className="p-4 text-left">Kategori</th>
            <th className="p-4 text-left">Harga</th>
            <th className="p-4 text-left">Stok</th>
            <th className="p-4 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-8 text-center text-cyan-400/60">
                {query ? `Tidak ada produk yang ditemukan untuk "${query}"` : 'Belum ada produk'}
              </td>
            </tr>
          ) : (
            products.map((product) => (
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
                    </div>
                  </div>
                </td>
                <td className="p-4 capitalize">{product.kategori}</td>
                <td className="p-4 font-mono">${parseFloat(product.price).toFixed(2)}</td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="px-3 py-1 bg-cyan-900/20 border border-cyan-400/30 rounded-lg hover:bg-cyan-800/30"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={product.id} />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}