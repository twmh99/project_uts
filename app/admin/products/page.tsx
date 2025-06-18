import Link from 'next/link';
import { Suspense } from 'react';
import { getFilteredProducts, getProducts, getProductsPages } from '@/lib/query/getProducts';
import Search from '@/app/ui/admin/search';
import Pagination from '@/app/ui/admin/pagination';
import ProductsTable from '@/app/ui/admin/products-table';
import { ProductsTableSkeleton } from '@/app/ui/admin/skeletons';

export default async function AdminProductsPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getProductsPages(query);
  const allProducts = await getProducts(); 
  const total = allProducts.length;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-cyan-400">Kelola Produk</h2>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-colors"
        >
          Tambah Produk
        </Link>
      </div>

      <div className="mb-6 flex items-center justify-between gap-2">
        <Search placeholder="Cari produk..." />
        <div className="text-sm text-cyan-400/60">
          {query && `Hasil pencarian: "${query}"`}
        </div>
        {/* Tampilkan total produk */}
        <p className="text-cyan-400 text-sm ml-4">Total Produk: {total}</p>
      </div>

      <Suspense key={query + currentPage} fallback={<ProductsTableSkeleton />}>
        <ProductsTable query={query} currentPage={currentPage} />
      </Suspense>

      <div className="mt-6 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
