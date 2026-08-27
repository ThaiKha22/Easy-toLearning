import { Link } from 'react-router-dom';
import { Clock, ListChecks, ArrowRight } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const diffVariant = { Easy: 'success', Medium: 'spark', Hard: 'danger' };

export default function QuizCard({ quiz }) {
  return (
    <Card hover padding="p-5" className="flex flex-col">
      <div className="flex items-start justify-between">
        <Badge variant={diffVariant[quiz.difficulty]}>{quiz.difficulty}</Badge>
        {quiz.lastScore != null && (
          <span className={`text-sm font-semibold ${quiz.lastScore >= 70 ? 'text-success' : 'text-spark-600'}`}>{quiz.lastScore}%</span>
        )}
      </div>
      <h3 className="mt-3 font-display text-base font-semibold text-ink-900">{quiz.title}</h3>
      <div className="mt-2 flex items-center gap-4 text-xs text-ink-500">
        <span className="flex items-center gap-1"><ListChecks size={13} /> {quiz.questionCount} questions</span>
        <span className="flex items-center gap-1"><Clock size={13} /> {quiz.estimatedMinutes} min</span>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-line-soft pt-3.5">
        <span className="text-xs text-ink-500">{quiz.attempts} attempt{quiz.attempts === 1 ? '' : 's'}</span>
        <Link to={`/quizzes/${quiz.id}`}>
          <Button size="sm" icon={ArrowRight} iconPosition="right">{quiz.attempts ? 'Retake' : 'Start Quiz'}</Button>
        </Link>
      </div>
    </Card>
  );
}
