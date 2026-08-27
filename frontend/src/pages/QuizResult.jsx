import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, RotateCcw, ArrowRight, ChevronLeft } from 'lucide-react';
import { quizService } from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { MasteryRing } from '../components/ui/Progress';
import Skeleton from '../components/ui/Skeleton';
import ErrorState from '../components/ui/ErrorState';

export default function QuizResult() {
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
        <ChevronLeft size={16} /> Quizzes
      </Link>

      <Card padding="p-6 sm:p-8" className="flex flex-col items-center text-center">
        <p className="text-sm font-medium text-ink-500">{result.quizTitle}</p>
        <MasteryRing value={result.score} size={128} strokeWidth={11} color={scoreColor} className="mt-4" />
        <p className="mt-4 text-sm text-ink-500">
          {result.correct} correct · {result.incorrect} incorrect · {result.timeTakenMinutes} min
        </p>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card padding="p-5">
          <h3 className="font-display text-sm font-semibold text-success">Strong Topics</h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {result.strongTopics.map((t) => <Badge key={t} variant="success">{t}</Badge>)}
          </div>
        </Card>
        <Card padding="p-5">
          <h3 className="font-display text-sm font-semibold text-danger">Needs Improvement</h3>
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
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">AI Analysis</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-800">{result.aiAnalysis}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Link to="/subjects/sub-networks"><Button variant="secondary" fullWidth>Review Weak Topics</Button></Link>
        <Link to={`/quizzes/${result.quizId}`}><Button variant="secondary" fullWidth icon={RotateCcw}>Generate Similar Quiz</Button></Link>
        <Link to="/subjects/sub-networks"><Button fullWidth icon={ArrowRight} iconPosition="right">Back to Subject</Button></Link>
      </div>
    </div>
  );
}
