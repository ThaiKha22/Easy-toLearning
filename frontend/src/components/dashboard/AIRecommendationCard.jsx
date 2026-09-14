import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';

export default function AIRecommendationCard({ topic = 'Congestion Control', minutes = 20, subjectId = 'sub-networks' }) {
  const { t } = useTranslation();
  return (
    <div className="ai-edge p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-500 text-white shadow-[var(--shadow-glow-brand)]">
          <Sparkles size={18} />
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">{t('dashboard.recommendation')}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-800 sm:text-base">
            {t('dashboard.recommendationPrefix')}{' '}
            <span className="font-semibold text-ink-900">{topic}</span>{' '}
            {t('dashboard.recommendationSuffix', { minutes })}
          </p>
          <Link to={`/subjects/${subjectId}`}>
            <Button size="sm" className="mt-4" icon={ArrowRight} iconPosition="right">
              {t('dashboard.startSession')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
