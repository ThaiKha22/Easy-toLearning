import { Link } from 'react-router-dom';
import { FileText, Layers, ListChecks, ArrowRight } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ProgressBar } from '../ui/Progress';
import { formatRelativeTime } from '../../utils/format';
import { useTranslation } from 'react-i18next';

const colorMap = {
  brand: 'text-brand-600 bg-brand-50',
  violet: 'text-violet-600 bg-[#EFEDFC]',
  spark: 'text-spark-600 bg-spark-50',
  success: 'text-success bg-success-50',
};

export default function SubjectCard({ subject }) {
  const { t } = useTranslation();
  return (
    <Card hover padding="p-5" className="flex flex-col">
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ${colorMap[subject.color]}`}>
          {subject.name.slice(0, 1)}
        </div>
        <span className="font-display text-lg font-bold text-ink-900">{subject.progress}%</span>
      </div>
      <h3 className="mt-3 font-display text-base font-semibold text-ink-900">{subject.name}</h3>
      <p className="mt-1 line-clamp-2 flex-1 text-sm text-ink-500">{subject.description}</p>

      <ProgressBar value={subject.progress} className="mt-4" />

      <div className="mt-4 flex items-center gap-4 text-xs text-ink-500">
        <span className="flex items-center gap-1"><FileText size={13} /> {subject.documents}</span>
        <span className="flex items-center gap-1"><Layers size={13} /> {subject.flashcards}</span>
        <span className="flex items-center gap-1"><ListChecks size={13} /> {subject.quizzes}</span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-line-soft pt-3.5">
        <span className="text-xs text-ink-500">{t('subject.studied')} {formatRelativeTime(subject.lastStudied)}</span>
        <Link to={`/subjects/${subject.id}`}>
          <Button size="sm" variant="secondary" icon={ArrowRight} iconPosition="right">{t('subject.continue')}</Button>
        </Link>
      </div>
    </Card>
  );
}
