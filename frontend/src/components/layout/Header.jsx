import { useState } from 'react';
import { Menu, Search, Bell, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '../ui/Avatar';
import Dropdown from '../ui/Dropdown';
import { authService } from '../../services/api';
import { useTranslation } from 'react-i18next';
import useCurrentUser from '../../hooks/useCurrentUser';

export default function Header({ title, onMenuClick }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = useCurrentUser();
  const displayName = user?.fullName || user?.name || '';

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line-soft bg-surface/90 px-4 backdrop-blur sm:px-6">
      <button
        onClick={onMenuClick}
        aria-label="Open menu"
        className="rounded-lg p-2 text-ink-700 hover:bg-surface-alt lg:hidden"
      >
        <Menu size={22} />
      </button>

      <h1 className="font-display text-lg font-semibold text-ink-900 truncate lg:text-xl">{title}</h1>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <div className="relative hidden sm:block">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            placeholder={t('common.search')}
            aria-label={t('common.search')}
            className="h-10 w-56 rounded-xl border border-line bg-surface-alt/60 pl-9 pr-3 text-sm outline-none transition-colors focus:border-brand-500 focus:bg-surface xl:w-72"
          />
        </div>
        <button
          aria-label={t('common.search')}
          className="rounded-lg p-2 text-ink-700 hover:bg-surface-alt sm:hidden"
        >
          <Search size={20} />
        </button>

        <button aria-label={t('common.notifications')} className="relative rounded-lg p-2 text-ink-700 hover:bg-surface-alt">
          <Bell size={20} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-spark-500 ring-2 ring-surface" />
        </button>

        <Dropdown
          align="right"
          trigger={
            <span className="flex items-center gap-1.5 rounded-xl py-1 pl-1 pr-1.5 hover:bg-surface-alt">
              <Avatar name={displayName} size="sm" />
              <ChevronDown size={14} className="hidden text-ink-500 sm:block" />
            </span>
          }
          items={[
            { label: t('common.profile'), icon: User, onClick: () => navigate('/profile') },
            { label: t('nav.settings'), icon: Settings, onClick: () => navigate('/profile') },
            { divider: true },
            { label: t('common.logout'), icon: LogOut, danger: true, onClick: () => { authService.logout(); navigate('/login', { replace: true }); } },
          ]}
        />
      </div>
    </header>
  );
}
