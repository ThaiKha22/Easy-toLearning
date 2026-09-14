export default function TabBar({ tabs, active, onChange }) {
  return (
    <div className="thin-scroll -mx-1 flex gap-1 overflow-x-auto border-b border-line-soft px-1">
      {tabs.map((tab) => (
        <button
          key={typeof tab === 'string' ? tab : tab.value}
          onClick={() => onChange(typeof tab === 'string' ? tab : tab.value)}
          className={`shrink-0 border-b-2 px-3.5 py-2.5 text-sm font-medium transition-colors ${
            active === (typeof tab === 'string' ? tab : tab.value) ? 'border-brand-600 text-brand-700' : 'border-transparent text-ink-500 hover:text-ink-900'
          }`}
        >
          {typeof tab === 'string' ? tab : tab.label}
        </button>
      ))}
    </div>
  );
}
