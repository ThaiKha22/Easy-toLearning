import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, PlayCircle, Layers, Clock, ListChecks } from 'lucide-react';
import { documentService } from '../services/api';
import TabBar from '../components/ui/TabBar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import ErrorState from '../components/ui/ErrorState';
import KeyConceptCard from '../components/documents/KeyConceptCard';
import { flashcards as allFlashcards } from '../data/mockData';

const TABS = ['Summary', 'Key Concepts', 'Flashcards', 'Quiz'];

export default function DocumentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tab, setTab] = useState('Summary');

  function load() {
    setLoading(true);
    setError(false);
    documentService.getDocument(id).then(setDoc).catch(() => setError(true)).finally(() => setLoading(false));
  }
  useEffect(load, [id]);

  if (loading) return <Skeleton className="h-96 rounded-2xl" />;
  if (error || !doc) return <ErrorState onRetry={load} />;

  const previewCards = allFlashcards.slice(0, doc.flashcardPreview || 4);

  return (
    <div className="space-y-5">
      <Link to="#" onClick={(e) => { e.preventDefault(); navigate(-1); }} className="flex items-center gap-1 text-sm font-medium text-ink-500 hover:text-ink-900">
        <ChevronLeft size={16} /> Back
      </Link>
      <h2 className="font-display text-xl font-bold text-ink-900 sm:text-2xl">{doc.title}</h2>

      <TabBar tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'Summary' && (
        <Card padding="p-6" className="max-w-3xl">
          <div className="prose-sm whitespace-pre-line text-sm leading-relaxed text-ink-700 sm:text-[15px]">
            {doc.summary || 'Summary is still being generated.'}
          </div>
        </Card>
      )}

      {tab === 'Key Concepts' && (
        <div className="grid gap-4 sm:grid-cols-2">
          {(doc.keyConcepts || []).map((c) => <KeyConceptCard key={c.id} concept={c} />)}
        </div>
      )}

      {tab === 'Flashcards' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {previewCards.map((c) => (
            <Card key={c.id} padding="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">Question</p>
              <p className="mt-1.5 text-sm font-medium text-ink-900">{c.question}</p>
              <div className="mt-3 border-t border-line-soft pt-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-300">Answer</p>
                <p className="mt-1.5 text-sm text-ink-500">{c.answer}</p>
              </div>
            </Card>
          ))}
          <Link to="/flashcards">
            <Card hover padding="p-5" className="flex h-full flex-col items-center justify-center text-center">
              <Layers size={22} className="text-brand-600" />
              <p className="mt-2 text-sm font-medium text-ink-900">Study full deck</p>
            </Card>
          </Link>
        </div>
      )}

      {tab === 'Quiz' && doc.quiz && (
        <Card padding="p-6" className="max-w-md">
          <div className="flex items-center gap-2 text-brand-600">
            <ListChecks size={18} />
            <span className="text-sm font-semibold">AI-Generated Quiz</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="font-display text-xl font-bold text-ink-900">{doc.quiz.questions}</p>
              <p className="text-xs text-ink-500">Questions</p>
            </div>
            <div>
              <Badge variant="spark">{doc.quiz.difficulty}</Badge>
              <p className="mt-1.5 text-xs text-ink-500">Difficulty</p>
            </div>
            <div>
              <p className="font-display text-xl font-bold text-ink-900 flex items-center justify-center gap-1"><Clock size={16} />{doc.quiz.estimatedMinutes}</p>
              <p className="text-xs text-ink-500">Minutes</p>
            </div>
          </div>
          <Link to="/quizzes/qz-tcp">
            <Button fullWidth icon={PlayCircle} className="mt-5">Start Quiz</Button>
          </Link>
        </Card>
      )}
    </div>
  );
}
