import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ListChecks } from 'lucide-react';
import { quizService } from '../services/api';
import QuizCard from '../components/quizzes/QuizCard';
import { SkeletonGrid } from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';

export default function Quizzes() {
  const { t } = useTranslation();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  function load() {
    setLoading(true);
    setError(false);
    quizService.listQuizzes().then(setQuizzes).catch(() => setError(true)).finally(() => setLoading(false));
  }
  useEffect(load, []);

  if (loading) return <SkeletonGrid />;
  if (error) return <ErrorState onRetry={load} />;
  if (quizzes.length === 0) {
    return <EmptyState icon={ListChecks} title={t('content.noQuizzes')} description={t('content.noQuizzesDescription')} />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {quizzes.map((q) => <QuizCard key={q.id} quiz={q} />)}
    </div>
  );
}
