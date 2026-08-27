import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-[var(--shadow-glow-brand)] disabled:shadow-none',
  secondary: 'bg-surface text-ink-900 border border-line hover:border-ink-300 hover:bg-surface-alt',
  ghost: 'text-ink-700 hover:bg-surface-alt',
  danger: 'bg-danger text-white hover:bg-[#C93A32]',
  spark: 'bg-spark-500 text-ink-900 hover:bg-spark-600',
};

const sizes = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  children,
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center rounded-xl font-medium transition-all duration-150
        active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100
        ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="animate-spin" size={size === 'lg' ? 20 : 16} />
      ) : (
        Icon && iconPosition === 'left' && <Icon size={size === 'lg' ? 20 : 16} />
      )}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon size={size === 'lg' ? 20 : 16} />}
    </button>
  );
}
