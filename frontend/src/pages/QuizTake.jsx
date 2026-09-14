import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { quizService } from '../services/api';
import QuizOption from '../components/quizzes/QuizOption';
import Button from '../components/ui/Button';
import Skeleton from '../components/ui/Skeleton';
import ErrorState from '../components/ui/ErrorState';
import { ProgressBar } from '../components/ui/Progress';

export default function QuizTake() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  function load() {
    setLoading(true);
    setError(false);
    quizService.getQuiz(id).then(setQuiz).catch(() => setError(true)).finally(() => setLoading(false));
  }
  useEffect(load, [id]);

  useEffect(() => {
    if (!quiz) return;
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [quiz]);

  if (loading) return <Skeleton className="h-96 rounded-2xl" />;
  if (error || !quiz) return <ErrorState onRetry={load} />;

  const question = quiz.questions[current];
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');

  function selectOption(optId) {
    setAnswers((a) => ({ ...a, [question.id]: optId }));
  }

  async function handleSubmit() {
    const unanswered = quiz.questions.some((question) => answers[question.id] === undefined);
    if (unanswered) {
      setSubmitError('Please answer every question before submitting.');
      return;
    }

    setSubmitting(true);
    setSubmitError('');
    clearInterval(timerRef.current);
    try {
      const submittedAnswers = quiz.questions.map((question) => ({
        questionId: question.id,
        answer: answers[question.id],
      }));
      const attempt = await quizService.submitAttempt(id, submittedAnswers);
      navigate(`/quiz-results/${attempt._id}`);
    } catch (err) {
      setSubmitError(err.message);
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl pb-24 sm:pb-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold text-ink-900">{quiz.title}</h2>
          <p className="mt-0.5 text-sm text-ink-500">Question {current + 1} of {quiz.questions.length}</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-surface-alt px-3 py-1.5 text-sm font-medium text-ink-700">
          <Clock size={14} /> {mins}:{secs}
        </span>
      </div>

      <ProgressBar value={current + 1} max={quiz.questions.length} className="mt-4" />

      <div className="mt-6">
        {submitError && (
          <div className="mb-4 rounded-xl border border-danger-50 bg-danger-50 px-3.5 py-2.5 text-sm text-danger">
            {submitError}
          </div>
        )}
        <p className="font-display text-lg font-semibold leading-snug text-ink-900 sm:text-xl">{question.prompt}</p>
        <div className="mt-5 space-y-2.5">
          {question.options.map((opt) => (
            <QuizOption
              key={opt.id}
              option={opt}
              selected={answers[question.id]}
              correctOptionId={question.correctOptionId}
              submitted={false}
              onSelect={selectOption}
            />
          ))}
        </div>
      </div>

      {/* Desktop nav */}
      <div className="mt-8 hidden items-center justify-between sm:flex">
        <Button variant="ghost" icon={ChevronLeft} onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0}>
          Previous
        </Button>
        {current < quiz.questions.length - 1 ? (
          <Button icon={ChevronRight} iconPosition="right" onClick={() => setCurrent((c) => c + 1)}>Next</Button>
        ) : (
          <Button onClick={handleSubmit} loading={submitting} disabled={submitting}>Submit Quiz</Button>
        )}
      </div>

      {/* Sticky mobile nav */}
      <div className="fixed inset-x-0 bottom-0 z-20 flex gap-3 border-t border-line-soft bg-surface p-4 sm:hidden">
        <Button variant="secondary" icon={ChevronLeft} onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0} className="flex-1">
          Prev
        </Button>
        {current < quiz.questions.length - 1 ? (
          <Button icon={ChevronRight} iconPosition="right" onClick={() => setCurrent((c) => c + 1)} className="flex-1">Next</Button>
        ) : (
          <Button onClick={handleSubmit} loading={submitting} disabled={submitting} className="flex-1">Submit</Button>
        )}
      </div>
    </div>
  );
}
