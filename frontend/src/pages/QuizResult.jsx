import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sparkles, RotateCcw, ArrowRight, ChevronLeft } from 'lucide-react';
import { quizService } from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { MasteryRing } from '../components/ui/Progress';
import Skeleton from '../components/ui/Skeleton';
import ErrorState from '../components/ui/ErrorState';

export default function QuizResult() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  function load() {
    setLoading(true);
    setError(false);
    quizService.getResult(id).then(setResult).catch(() => setError(true)).finally(() => setLoading(false));
  }
  useEffect(load, [id]);

  if (loading) return <Skeleton className="h-96 rounded-2xl" />;
  if (error || !result) return <ErrorState onRetry={load} />;

  const scoreColor = result.score >= 80 ? 'success' : result.score >= 60 ? 'spark' : 'danger';

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Link to="/quizzes" className="flex items-center gap-1 text-sm font-medium text-ink-500 hover:text-ink-900">
        <ChevronLeft size={16} /> {t('quizResult.backToQuizzes')}
      </Link>

      <Card padding="p-6 sm:p-8" className="flex flex-col items-center text-center">
        <p className="text-sm font-medium text-ink-500">{result.quizTitle}</p>
        <MasteryRing value={result.score} size={128} strokeWidth={11} color={scoreColor} className="mt-4" />
        <p className="mt-4 text-sm text-ink-500">
          {result.correct} {t('quizResult.correct')} · {result.incorrect} {t('quizResult.incorrect')} · {result.timeTakenMinutes} {t('quizResult.minutes')}
        </p>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card padding="p-5">
          <h3 className="font-display text-sm font-semibold text-success">{t('quizResult.strongTopics')}</h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {result.strongTopics.map((t) => <Badge key={t} variant="success">{t}</Badge>)}
          </div>
        </Card>
        <Card padding="p-5">
          <h3 className="font-display text-sm font-semibold text-danger">{t('quizResult.needsImprovement')}</h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {result.weakTopics.map((t) => <Badge key={t} variant="danger">{t}</Badge>)}
          </div>
        </Card>
      </div>

      <div className="ai-edge p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-500 text-white">
            <Sparkles size={16} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">{t('quizResult.aiAnalysis')}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-800">{result.aiAnalysis}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Link to="/subjects/sub-networks"><Button variant="secondary" fullWidth>{t('quizResult.reviewWeakTopics')}</Button></Link>
        <Link to={`/quizzes/${result.quizId}`}><Button variant="secondary" fullWidth icon={RotateCcw}>{t('quizResult.generateSimilar')}</Button></Link>
        <Link to={result.subjectId ? `/subjects/${result.subjectId}` : '/subjects'}><Button fullWidth icon={ArrowRight} iconPosition="right">{t('quizResult.backToSubject')}</Button></Link>
      </div>
    </div>
  );
}
