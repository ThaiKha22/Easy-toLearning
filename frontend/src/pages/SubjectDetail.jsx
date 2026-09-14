import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { UploadCloud, PlayCircle, ChevronLeft } from 'lucide-react';
import { subjectService, documentService, flashcardService, quizService, studySessionService, progressService } from '../services/api';
import Button from '../components/ui/Button';
import TabBar from '../components/ui/TabBar';
import { ProgressBar } from '../components/ui/Progress';
import Skeleton, { SkeletonGrid } from '../components/ui/Skeleton';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import SubjectOverviewTab from '../components/subjects/SubjectOverviewTab';
import DocumentList from '../components/documents/DocumentList';
import DeckCard from '../components/flashcards/DeckCard';
import QuizCard from '../components/quizzes/QuizCard';
import { FileText, Layers, ListChecks } from 'lucide-react';
import { useToast } from '../components/ui/Toast';

export default function SubjectDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [subject, setSubject] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [decks, setDecks] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tab, setTab] = useState(() => t('subject.overview'));
  const tabs = [t('subject.overview'), t('subject.documents'), t('subject.topics'), t('subject.flashcards'), t('subject.quizzes')];
  const [sessionStartedAt, setSessionStartedAt] = useState(null);
  const [sessionSaving, setSessionSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { showToast } = useToast();

  function load() {
    setLoading(true);
    setError(false);
    Promise.all([
      subjectService.getSubject(id),
      documentService.listDocuments(id),
      flashcardService.listDecks(id),
      quizService.listQuizzes(id),
      progressService.getSubject(id),
    ])
      .then(([s, docs, dks, qzs, subjectProgress]) => {
        setSubject(s);
        setDocuments(docs);
        setDecks(dks);
        setQuizzes(qzs);
        setProgress(subjectProgress);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }

  useEffect(load, [id]);

  function requestDelete(documentId) {
    setDeleteId(documentId);
  }

  async function handleDelete(documentId) {
    try {
      await documentService.deleteDocument(documentId);
      setDocuments((currentDocuments) => currentDocuments.filter((document) => document.id !== documentId));
      setDeleteId(null);
      showToast('Đã xóa tài liệu', 'success');
    } catch (error) {
      showToast(error.message, 'error');
      throw error;
    }
  }

  async function toggleStudySession() {
    if (!sessionStartedAt) {
      setSessionStartedAt(new Date());
      return;
    }
    const endedAt = new Date();
    const duration = Math.max(1, Math.ceil((endedAt - sessionStartedAt) / 60000));
    setSessionSaving(true);
    try {
      await studySessionService.create({
        subjectId: id,
        startedAt: sessionStartedAt.toISOString(),
        endedAt: endedAt.toISOString(),
        duration,
        type: 'other',
      });
      setSessionStartedAt(null);
    } finally {
      setSessionSaving(false);
    }
  }

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

  const topics = progress?.totalTasks || 0;
  const overviewTab = tabs[0];
  const documentsTab = tabs[1];
  const topicsTab = tabs[2];
  const flashcardsTab = tabs[3];
  const quizzesTab = tabs[4];

  return (
    <div className="space-y-5">
      <Link to="/subjects" className="flex items-center gap-1 text-sm font-medium text-ink-500 hover:text-ink-900">
        <ChevronLeft size={16} /> {t('nav.subjects')}
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-900">{subject.name}</h2>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-sm font-semibold text-brand-600">{subject.progress}% {t('subject.complete')}</span>
            <ProgressBar value={subject.progress} className="w-32" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" icon={UploadCloud} onClick={() => navigate(`/subjects/${id}/documents`)}>{t('subject.upload')}</Button>
          <Button variant="secondary" size="sm" icon={PlayCircle} loading={sessionSaving} onClick={toggleStudySession}>
            {sessionStartedAt ? t('subject.finishSession') : t('subject.startSession')}
          </Button>
        </div>
      </div>

      <TabBar tabs={tabs} active={tab} onChange={setTab} />

      {tab === overviewTab && <SubjectOverviewTab subject={subject} progress={progress} />}

      {tab === documentsTab && (
        documents.length === 0 ? (
          <EmptyState icon={FileText} title={t('subject.noDocuments')} description={t('subject.uploadFirst')} />
        ) : <DocumentList documents={documents} onDelete={requestDelete} />
      )}

      {tab === topicsTab && (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-line-soft bg-surface p-4 text-sm text-ink-500">
            {progress ? `${progress.completedTasks}/${progress.totalTasks} ${t('subject.tasksCompleted')}` : t('subject.noActivity')}
          </div>
          {topics === 0 && <EmptyState title={t('subject.noTopics')} description={t('subject.topicsDescription')} />}
        </div>
      )}

      {tab === flashcardsTab && (
        decks.length === 0 ? (
          <EmptyState icon={Layers} title={t('subject.noFlashcards')} description={t('subject.generateFlashcards')} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {decks.map((d) => <DeckCard key={d.id} deck={d} />)}
          </div>
        )
      )}

      {tab === quizzesTab && (
        quizzes.length === 0 ? (
          <EmptyState icon={ListChecks} title={t('subject.noQuizzes')} description={t('subject.generateQuiz')} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quizzes.map((q) => <QuizCard key={q.id} quiz={q} />)}
          </div>
        )
      )}

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => handleDelete(deleteId)}
        title={t('content.deleteDocument')}
        description={t('content.deleteDescription')}
        confirmLabel={t('content.delete')}
      />
    </div>
  );
}
