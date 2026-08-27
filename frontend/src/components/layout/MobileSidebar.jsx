import { NavLink } from 'react-router-dom';
import { Sparkles, X } from 'lucide-react';
import { primaryNav, secondaryNav } from './navConfig';
import Avatar from '../ui/Avatar';
import { currentUser } from '../../data/mockData';

export default function MobileSidebar({ open, onClose }) {
  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-ink-900/40 backdrop-blur-[2px] transition-opacity duration-200 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`absolute left-0 top-0 flex h-full w-[80%] max-w-xs flex-col bg-surface shadow-2xl transition-transform duration-200 ease-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-500 text-white">
              <Sparkles size={17} />
            </div>
            <span className="font-display text-[15px] font-bold tracking-tight text-ink-900">AI StudyHub</span>
          </div>
          <button onClick={onClose} aria-label="Close menu" className="rounded-lg p-2 text-ink-500 hover:bg-surface-alt">
            <X size={20} />
          </button>
        </div>

        <nav className="thin-scroll flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {primaryNav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium ${
                  isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-700 hover:bg-surface-alt'
                }`
              }
            >
              <Icon size={19} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="space-y-1 border-t border-line-soft px-3 py-3">
          {secondaryNav.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} onClick={onClose} className="flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium text-ink-700 hover:bg-surface-alt">
              <Icon size={19} />
              {label}
            </NavLink>
          ))}
          <NavLink to="/profile" onClick={onClose} className="mt-2 flex items-center gap-2.5 rounded-xl px-2 py-2 hover:bg-surface-alt">
            <Avatar name={currentUser.name} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink-900">{currentUser.name}</p>
              <p className="truncate text-xs text-ink-500">{currentUser.email}</p>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
