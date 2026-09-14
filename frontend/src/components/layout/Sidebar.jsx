import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import { primaryNav, secondaryNav } from './navConfig';
import Avatar from '../ui/Avatar';
import useCurrentUser from '../../hooks/useCurrentUser';

function NavItem({ to, label, icon: Icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
          isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-500 hover:bg-surface-alt hover:text-ink-900'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon size={18} className={isActive ? 'text-brand-600' : 'text-ink-300 group-hover:text-ink-500'} />
          {label}
        </>
      )}
    </NavLink>
  );
}

export default function Sidebar() {
  const { t } = useTranslation();
  const user = useCurrentUser();
  const displayName = user?.fullName || user?.name || '';
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-line-soft bg-surface lg:flex">
      <div className="flex h-16 items-center gap-2 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-500 text-white">
          <Sparkles size={17} />
        </div>
        <span className="font-display text-[15px] font-bold tracking-tight text-ink-900">AI StudyHub</span>
      </div>

      <nav className="thin-scroll flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {primaryNav.map((item) => (
          <NavItem key={item.to} {...item} label={t(item.labelKey)} />
        ))}
      </nav>

      <div className="space-y-1 border-t border-line-soft px-3 py-3">
        {secondaryNav.map((item) => (
          <NavItem key={item.to} {...item} label={t(item.labelKey)} />
        ))}
        <NavLink to="/profile" className="mt-2 flex items-center gap-2.5 rounded-xl px-2 py-2 hover:bg-surface-alt">
          <Avatar name={displayName} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink-900">{displayName}</p>
            <p className="truncate text-xs text-ink-500">{user?.email || ''}</p>
          </div>
        </NavLink>
      </div>
    </aside>
  );
}
