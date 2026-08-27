import { useEffect, useRef, useState } from 'react';

export default function Dropdown({ trigger, items, align = 'right' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((v) => !v)} aria-haspopup="menu" aria-expanded={open}>
        {trigger}
      </button>
      {open && (
        <div
          role="menu"
          className={`absolute top-full z-40 mt-2 min-w-[180px] overflow-hidden rounded-xl border border-line-soft bg-surface py-1 shadow-[var(--shadow-card-hover)] ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {items.map((item, i) =>
            item.divider ? (
              <div key={i} className="my-1 h-px bg-line-soft" />
            ) : (
              <button
                key={i}
                role="menuitem"
                onClick={() => {
                  item.onClick?.();
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3.5 py-2 text-left text-sm hover:bg-surface-alt ${
                  item.danger ? 'text-danger' : 'text-ink-700'
                }`}
              >
                {item.icon && <item.icon size={16} />}
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
