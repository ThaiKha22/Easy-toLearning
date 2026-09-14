import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ProgressBar } from '../ui/Progress';
import { formatRelativeTime } from '../../utils/format';

export default function ContinueLearning({ subjects }) {
  const { t } = useTranslation();
  return (
    <Card padding="p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-base font-semibold text-ink-900">{t('dashboard.continueLearning')}</h2>
        <Link to="/subjects" className="text-sm font-medium text-brand-600 hover:underline">{t('dashboard.viewAll')}</Link>
      </div>
      <div className="mt-4 space-y-3">
        {subjects.slice(0, 3).map((s) => (
          <div key={s.id} className="rounded-xl border border-line-soft p-3.5 transition-colors hover:border-brand-300 sm:p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink-900">{s.name}</p>
                <p className="text-xs text-ink-500">Last studied {formatRelativeTime(s.lastStudied)}</p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-ink-900">{s.progress}%</span>
            </div>
            <ProgressBar value={s.progress} className="mt-2.5" />
            <div className="mt-3 flex justify-end">
              <Link to={`/subjects/${s.id}`}>
                <Button size="sm" variant="secondary" icon={ArrowRight} iconPosition="right">Continue</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
