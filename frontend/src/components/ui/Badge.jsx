const styles = {
  neutral: 'bg-surface-alt text-ink-700',
  brand: 'bg-brand-50 text-brand-700',
  spark: 'bg-spark-50 text-spark-600',
  success: 'bg-success-50 text-success',
  danger: 'bg-danger-50 text-danger',
  violet: 'bg-[#EFEDFC] text-violet-600',
};

export default function Badge({ children, variant = 'neutral', icon: Icon, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${styles[variant]} ${className}`}
    >
      {Icon && <Icon size={12} />}
      {children}
    </span>
  );
}
