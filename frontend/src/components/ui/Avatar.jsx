const sizes = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-14 w-14 text-lg', xl: 'h-20 w-20 text-2xl' };

export default function Avatar({ name, initials, src, size = 'md', className = '' }) {
  const label = initials || name?.split(' ').map((n) => n[0]).slice(0, 2).join('') || '?';
  if (src) {
    return <img src={src} alt={name} className={`rounded-full object-cover ${sizes[size]} ${className}`} />;
  }
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-violet-500 font-display font-semibold text-white ${sizes[size]} ${className}`}
      aria-label={name}
    >
      {label}
    </div>
  );
}
