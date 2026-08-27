export default function Skeleton({ className = '' }) {
  return <div className={`animate-pulse rounded-lg bg-surface-alt ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-line-soft bg-surface p-5 shadow-[var(--shadow-card)]">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="mt-3 h-3 w-2/3" />
      <Skeleton className="mt-4 h-2 w-full" />
      <div className="mt-4 flex gap-3">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 4, className = 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4' }) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
