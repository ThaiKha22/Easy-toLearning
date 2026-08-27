export function ProgressBar({ value, max = 100, color = 'brand', className = '', trackClassName = '' }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const colorMap = {
    brand: 'bg-brand-500',
    spark: 'bg-spark-500',
    success: 'bg-success',
    violet: 'bg-violet-500',
    danger: 'bg-danger',
  };
  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-surface-alt ${trackClassName} ${className}`}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full rounded-full ${colorMap[color]} transition-[width] duration-500 ease-out`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// The signature visual motif for AI StudyHub: a mastery ring used for progress,
// quiz scores, and topic mastery throughout the product.
export function MasteryRing({ value, size = 64, strokeWidth = 6, color = 'brand', label, sublabel }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, value) / 100) * circumference;
  const colorMap = {
    brand: 'var(--color-brand-500)',
    spark: 'var(--color-spark-500)',
    success: 'var(--color-success)',
    violet: 'var(--color-violet-500)',
    danger: 'var(--color-danger)',
  };
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="var(--color-line)" strokeWidth={strokeWidth} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colorMap[color]}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.7s ease-out' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center leading-none">
        <span className="font-display font-semibold text-ink-900" style={{ fontSize: size * 0.26 }}>
          {label !== undefined ? label : `${Math.round(value)}%`}
        </span>
        {sublabel && <span className="mt-0.5 text-[10px] text-ink-500">{sublabel}</span>}
      </div>
    </div>
  );
}
