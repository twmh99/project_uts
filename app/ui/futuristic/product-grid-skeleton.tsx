export default function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className="h-64 w-full rounded-xl bg-cyan-900/10 animate-pulse border border-cyan-400/20"
        >
          <div className="h-2/3 bg-cyan-700/20 rounded-t-xl" />
          <div className="p-4 space-y-2">
            <div className="h-4 bg-cyan-700/20 rounded w-3/4" />
            <div className="h-3 bg-cyan-700/20 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}
