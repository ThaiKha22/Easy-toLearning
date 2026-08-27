import { forwardRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';

const Input = forwardRef(function Input(
  { label, error, success, hint, type = 'text', icon: Icon, className = '', id, ...props },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  const isPassword = type === 'password';
  const resolvedType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-ink-700">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
        )}
        <input
          ref={ref}
          id={inputId}
          type={resolvedType}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={`h-11 w-full rounded-xl border bg-surface px-3.5 text-sm text-ink-900 placeholder:text-ink-300
            transition-colors duration-150 outline-none
            ${Icon ? 'pl-10' : ''} ${isPassword ? 'pr-10' : ''}
            ${error ? 'border-danger focus:border-danger' : success ? 'border-success' : 'border-line focus:border-brand-500'}
          `}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-300 hover:text-ink-500"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
        {!isPassword && error && (
          <AlertCircle size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-danger" />
        )}
        {!isPassword && success && !error && (
          <CheckCircle2 size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-success" />
        )}
      </div>
      {error && (
        <p id={`${inputId}-error`} className="mt-1.5 flex items-center gap-1 text-xs text-danger">
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-ink-500">
          {hint}
        </p>
      )}
    </div>
  );
});

export default Input;
