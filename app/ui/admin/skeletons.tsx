// app/ui/admin/skeletons.tsx

// Skeleton base component
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-black/50 border border-cyan-400/20 rounded-xl p-6 animate-pulse ${className}`}>
      <div className="space-y-3">
        <div className="h-4 bg-cyan-400/20 rounded w-3/4"></div>
        <div className="h-6 bg-cyan-400/10 rounded w-1/2"></div>
        <div className="h-3 bg-cyan-400/10 rounded w-1/4"></div>
      </div>
    </div>
  );
}

// Dashboard Stats Skeleton
export function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {Array.from({ length: 4 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}

// Recent Transactions Skeleton
export function RecentTransactionsSkeleton() {
  return (
    <div className="bg-black/50 border border-cyan-400/20 rounded-xl p-6 animate-pulse">
      <div className="h-6 bg-cyan-400/20 rounded w-1/3 mb-6"></div>
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex justify-between items-center border-b border-cyan-400/10 pb-3">
            <div className="space-y-2">
              <div className="h-4 bg-cyan-400/10 rounded w-24"></div>
              <div className="h-3 bg-cyan-400/10 rounded w-32"></div>
            </div>
            <div className="text-right space-y-2">
              <div className="h-4 bg-cyan-400/10 rounded w-16"></div>
              <div className="h-3 bg-cyan-400/10 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 h-4 bg-cyan-400/10 rounded w-40"></div>
    </div>
  );
}

// Popular Products Skeleton
export function PopularProductsSkeleton() {
  return (
    <div className="bg-black/50 border border-cyan-400/20 rounded-xl p-6 animate-pulse">
      <div className="h-6 bg-cyan-400/20 rounded w-1/3 mb-6"></div>
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-4 border-b border-cyan-400/10 pb-3">
            <div className="w-16 h-16 bg-cyan-400/10 rounded-lg"></div>
            <div className="space-y-2">
              <div className="h-4 bg-cyan-400/10 rounded w-32"></div>
              <div className="h-3 bg-cyan-400/10 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 h-4 bg-cyan-400/10 rounded w-36"></div>
    </div>
  );
}

// Complete Dashboard Skeleton
export function DashboardSkeleton() {
  return (
    <div>
      <div className="h-8 bg-cyan-400/20 rounded w-48 mb-8 animate-pulse"></div>
      
      <DashboardStatsSkeleton />

      <div className="grid md:grid-cols-2 gap-8">
        <RecentTransactionsSkeleton />
        <PopularProductsSkeleton />
      </div>
    </div>
  );
}

// Products Table Skeleton
export function ProductsTableSkeleton() {
  return (
    <div className="border border-cyan-400/20 rounded-xl overflow-hidden animate-pulse bg-black/50">
      <table className="w-full">
        <thead className="bg-cyan-900/10">
          <tr>
            <th className="p-4 text-left text-cyan-400/60">Produk</th>
            <th className="p-4 text-left text-cyan-400/60">Kategori</th>
            <th className="p-4 text-left text-cyan-400/60">Harga</th>
            <th className="p-4 text-left text-cyan-400/60">Stok</th>
            <th className="p-4 text-left text-cyan-400/60">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductRowSkeleton key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProductRowSkeleton() {
  return (
    <tr className="border-t border-cyan-400/10">
      <td className="p-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-cyan-400/20 rounded-lg animate-pulse"></div>
          <div className="h-4 w-32 bg-cyan-400/20 rounded animate-pulse"></div>
        </div>
      </td>
      <td className="p-4">
        <div className="h-4 w-20 bg-cyan-400/20 rounded animate-pulse"></div>
      </td>
      <td className="p-4">
        <div className="h-4 w-16 bg-cyan-400/20 rounded animate-pulse font-mono"></div>
      </td>
      <td className="p-4">
        <div className="h-4 w-12 bg-cyan-400/20 rounded animate-pulse"></div>
      </td>
      <td className="p-4">
        <div className="flex space-x-2">
          <div className="h-8 w-12 bg-cyan-400/20 rounded-lg animate-pulse"></div>
          <div className="h-8 w-16 bg-red-400/20 rounded-lg animate-pulse"></div>
        </div>
      </td>
    </tr>
  );
}

// Transactions Table Skeleton (Updated Version)
export function TransactionsTableSkeleton() {
  return (
    <div className="border border-cyan-400/20 rounded-xl overflow-hidden animate-pulse bg-black/50">
      <table className="w-full">
        <thead className="bg-cyan-900/10">
          <tr>
            <th className="p-4 text-left text-cyan-400/60">ID</th>
            <th className="p-4 text-left text-cyan-400/60">Pelanggan</th>
            <th className="p-4 text-left text-cyan-400/60">Total</th>
            <th className="p-4 text-left text-cyan-400/60">Tanggal</th>
            <th className="p-4 text-left text-cyan-400/60">Status</th>
            <th className="p-4 text-left text-cyan-400/60">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }).map((_, i) => (
            <TransactionRowSkeleton key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TransactionRowSkeleton() {
  return (
    <tr className="border-t border-cyan-400/10">
      <td className="p-4">
        <div className="h-4 w-16 bg-cyan-400/20 rounded animate-pulse font-mono"></div>
      </td>
      <td className="p-4">
        <div className="h-4 w-32 bg-cyan-400/20 rounded animate-pulse"></div>
      </td>
      <td className="p-4">
        <div className="h-4 w-20 bg-cyan-400/20 rounded animate-pulse font-mono"></div>
      </td>
      <td className="p-4">
        <div className="h-4 w-24 bg-cyan-400/20 rounded animate-pulse"></div>
      </td>
      <td className="p-4">
        <div className="h-6 w-20 bg-cyan-400/20 rounded-full animate-pulse"></div>
      </td>
      <td className="p-4">
        <div className="h-8 w-16 bg-cyan-400/20 rounded-lg animate-pulse"></div>
      </td>
    </tr>
  );
}
