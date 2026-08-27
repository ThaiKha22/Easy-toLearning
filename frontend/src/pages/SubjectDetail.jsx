import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UploadCloud, PlayCircle, Sparkles, ChevronLeft } from 'lucide-react';
import { subjectService, documentService, flashcardService, quizService } from '../services/api';
import { weakTopics, strongTopics } from '../data/mockData';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import TabBar from '../components/ui/TabBar';
import { ProgressBar } from '../components/ui/Progress';
import Skeleton, { SkeletonGrid } from '../components/ui/Skeleton';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';
import SubjectOverviewTab from '../components/subjects/SubjectOverviewTab';
import DocumentList from '../components/documents/DocumentList';
import DeckCard from '../components/flashcards/DeckCard';
import QuizCard from '../components/quizzes/QuizCard';
import { FileText, Layers, ListChecks } from 'lucide-react';

const TABS = ['Overview', 'Documents', 'Topics', 'Flashcards', 'Quizzes'];

export default function SubjectDetail() {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [decks, setDecks] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tab, setTab] = useState('Overview');

  function load() {
    setLoading(true);
    setError(false);
    Promise.all([
      subjectService.getSubject(id),
      documentService.listDocuments(id),
      flashcardService.listDecks(id),
      quizService.listQuizzes(id),
    ])
      .then(([s, docs, dks, qzs]) => {
        setSubject(s);
        setDocuments(docs);
        setDecks(dks);
        setQuizzes(qzs);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }

  useEffect(load, [id]);

  if (loading) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-24 rounded-2xl" />
        <SkeletonGrid />
      </div>
    );
  }
  if (error || !subject) return <ErrorState onRetry={load} />;

  const topics = weakTopics.filter((t) => t.subjectId === id).length + strongTopics.filter((t) => t.subjectId === id).length;

  return (
    <div className="space-y-5">
      <Link to="/subjects" className="flex items-center gap-1 text-sm font-medium text-ink-500 hover:text-ink-900">
        <ChevronLeft size={16} /> My Subjects
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-900">{subject.name}</h2>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-sm font-semibold text-brand-600">{subject.progress}% complete</span>
            <ProgressBar value={subject.progress} className="w-32" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" icon={UploadCloud} onClick={() => setTab('Documents')}>Upload Document</Button>
          <Button variant="secondary" size="sm" icon={PlayCircle}>Start Study Session</Button>
          <Link to="/ai-tutor"><Button size="sm" icon={Sparkles}>Ask AI Tutor</Button></Link>
        </div>
      </div>

      <TabBar tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'Overview' && <SubjectOverviewTab subject={subject} />}

      {tab === 'Documents' && (
        documents.length === 0 ? (
          <EmptyState icon={FileText} title="No documents yet" description="Upload your first document to start learning." />
        ) : <DocumentList documents={documents} />
      )}

      {tab === 'Topics' && (
        <div className="grid gap-3 sm:grid-cols-2">
          {[...strongTopics, ...weakTopics].filter((t) => t.subjectId === id).map((t) => (
            <div key={t.id} className="flex items-center justify-between rounded-xl border border-line-soft bg-surface p-4">
              <span className="text-sm font-medium text-ink-900">{t.name}</span>
              <Badge variant={t.mastery >= 75 ? 'success' : t.mastery >= 55 ? 'spark' : 'danger'}>{t.mastery}% mastery</Badge>
            </div>
          ))}
          {topics === 0 && <EmptyState title="No topics tracked yet" description="Topics appear once AI processes your documents." />}
        </div>
      )}

      {tab === 'Flashcards' && (
        decks.length === 0 ? (
          <EmptyState icon={Layers} title="No flashcards available" description="Generate flashcards from your study materials." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {decks.map((d) => <DeckCard key={d.id} deck={d} />)}
          </div>
        )
      )}

      {tab === 'Quizzes' && (
        quizzes.length === 0 ? (
          <EmptyState icon={ListChecks} title="No quizzes yet" description="Generate a quiz from your study materials to test yourself." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quizzes.map((q) => <QuizCard key={q.id} quiz={q} />)}
          </div>
        )
      )}
    </div>
  );
}
