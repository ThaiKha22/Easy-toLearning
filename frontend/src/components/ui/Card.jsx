export default function Card({ children, className = '', hover = false, padding = 'p-5', as: Tag = 'div', ...props }) {
  return (
    <Tag
      className={`rounded-2xl border border-line-soft bg-surface shadow-[var(--shadow-card)]
        ${hover ? 'transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5' : ''}
        ${padding} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
