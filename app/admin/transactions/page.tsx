import Link from 'next/link';
import { Suspense } from 'react';
import { getFilteredTransactions, getTransactionsPages } from '@/lib/query/getTransactions';
import Search from '@/app/ui/admin/search';
import Pagination from '@/app/ui/admin/pagination';
import TransactionsTable from '@/app/ui/admin/transactions-table';
import { TransactionsTableSkeleton } from '@/app/ui/admin/skeletons';

export default async function AdminTransactionsPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getTransactionsPages(query);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-cyan-400">Daftar Transaksi</h2>
        <Link
          href="/admin/transactions/new"
          className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-colors"
        >
          Tambah Transaksi
        </Link>
      </div>

      <div className="mb-6 flex items-center justify-between gap-2">
        <Search placeholder="Cari transaksi..." />
        <div className="text-sm text-cyan-400/60">
          {query && `Hasil pencarian: "${query}"`}
        </div>
      </div>

      <Suspense key={query + currentPage} fallback={<TransactionsTableSkeleton />}>
        <TransactionsTable query={query} currentPage={currentPage} />
      </Suspense>

      <div className="mt-6 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}