import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, PlayCircle, Layers, Clock, ListChecks } from 'lucide-react';
import { aiDocumentService, documentService, flashcardService } from '../services/api';
import TabBar from '../components/ui/TabBar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import ErrorState from '../components/ui/ErrorState';
import { useToast } from '../components/ui/Toast';

const TAB_KEYS = ['summary', 'flashcards', 'quiz'];

export default function DocumentDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tab, setTab] = useState('summary');
  const [cards, setCards] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const { showToast } = useToast();
  const tabs = TAB_KEYS.map((key) => ({ value: key, label: t(`documentDetail.${key}`) }));

  function load() {
    setLoading(true);
    setError(false);
    documentService.getDocument(id).then(setDoc).catch(() => setError(true)).finally(() => setLoading(false));
  }
  useEffect(load, [id]);

  if (loading) return <Skeleton className="h-96 rounded-2xl" />;
  if (error || !doc) return <ErrorState onRetry={load} />;

  async function generateSummary() {
    setGenerating(true);
    try {
      const result = await aiDocumentService.summarizeDocument(id);
      setDoc((current) => ({ ...current, summary: result.summary }));
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setGenerating(false);
    }
  }

  async function loadCards() {
    try {
      setCards(await flashcardService.listCards({ documentId: id }));
    } catch (err) {
      showToast(err.message, 'error');
    }
  }

  async function generateFlashcards() {
    setGenerating(true);
    try {
      await aiDocumentService.generateFlashcards(id, { numberOfCards: 10 });
      await loadCards();
      showToast(t('documentDetail.flashcardsGenerated'), 'success');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setGenerating(false);
    }
  }

  async function generateQuiz() {
    setGenerating(true);
    try {
      const result = await aiDocumentService.generateQuiz(id, {
        numberOfQuestions: Number(numberOfQuestions),
      });
      const quizId = result.quiz?._id || result.quiz?.id;
      showToast(t('documentDetail.quizGenerated'), 'success');
      if (quizId) navigate(`/quizzes/${quizId}`);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="space-y-5">
      <Link to="#" onClick={(e) => { e.preventDefault(); navigate(-1); }} className="flex items-center gap-1 text-sm font-medium text-ink-500 hover:text-ink-900">
        <ChevronLeft size={16} /> {t('documentDetail.back')}
      </Link>
      <h2 className="font-display text-xl font-bold text-ink-900 sm:text-2xl">{doc.title}</h2>

      <TabBar tabs={tabs} active={tab} onChange={setTab} />

      {tab === 'summary' && (
        <Card padding="p-6" className="max-w-3xl">
          <div className="prose-sm whitespace-pre-line text-sm leading-relaxed text-ink-700 sm:text-[15px]">
            {doc.summary || t('documentDetail.summaryUnavailable')}
          </div>
          {!doc.summary && <Button onClick={generateSummary} loading={generating} className="mt-5">{t('documentDetail.generateSummary')}</Button>}
        </Card>
      )}


      {tab === 'flashcards' && (
        <DocumentFlashcards
          cards={cards}
          onLoad={loadCards}
          onGenerate={generateFlashcards}
          generating={generating}
        />
      )}

      {tab === 'quiz' && (
        <Card padding="p-6" className="max-w-md">
          <form onSubmit={(event) => { event.preventDefault(); generateQuiz(); }}>
              <div className="flex items-center gap-2 text-brand-600">
                <ListChecks size={18} />
                <span className="text-sm font-semibold">{doc.quiz ? t('documentDetail.createAnotherQuiz') : t('documentDetail.createQuiz')}</span>
              </div>
              <p className="mt-2 text-sm text-ink-500">{t('documentDetail.quizDescription')}</p>
              <label htmlFor="quiz-question-count" className="mt-5 block text-sm font-medium text-ink-700">
                {t('documentDetail.questionCount')}
              </label>
              <input
                id="quiz-question-count"
                type="number"
                min="5"
                max="50"
                step="1"
                value={numberOfQuestions}
                onChange={(event) => setNumberOfQuestions(event.target.value)}
                className="mt-1.5 h-11 w-full rounded-xl border border-line bg-surface px-3.5 text-sm text-ink-900 outline-none focus:border-brand-500"
              />
              <Button type="submit" fullWidth icon={ListChecks} loading={generating} className="mt-5">
                {doc.quiz ? t('documentDetail.createNewQuiz') : t('documentDetail.createQuiz')}
              </Button>
          </form>
          {doc.quiz && (
            <>
          <div className="mt-6 border-t border-line-soft pt-5">
          <div className="flex items-center gap-2 text-brand-600">
            <ListChecks size={18} />
            <span className="text-sm font-semibold">{t('documentDetail.existingQuiz')}</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="font-display text-xl font-bold text-ink-900">{doc.quiz.questions}</p>
              <p className="text-xs text-ink-500">{t('documentDetail.questions')}</p>
            </div>
            <div>
              <Badge variant="spark">{doc.quiz.difficulty}</Badge>
              <p className="mt-1.5 text-xs text-ink-500">{t('documentDetail.difficulty')}</p>
            </div>
            <div>
              <p className="font-display text-xl font-bold text-ink-900 flex items-center justify-center gap-1"><Clock size={16} />{doc.quiz.estimatedMinutes}</p>
              <p className="mt-1.5 text-xs text-ink-500">{t('documentDetail.minutes')}</p>
            </div>
          </div>
          <Link to={doc.quiz.id ? `/quizzes/${doc.quiz.id}` : '/quizzes'}>
            <Button fullWidth icon={PlayCircle} className="mt-5">{t('documentDetail.startQuiz')}</Button>
          </Link>
          </div>
            </>
          )}
        </Card>
      )}
    </div>
  );
}

function DocumentFlashcards({ cards, onLoad, onGenerate, generating }) {
  const { t } = useTranslation();
  useEffect(() => {
    if (!cards.length) onLoad();
  }, []);

  return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <Card key={c._id || c.id} padding="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">{t('documentDetail.question')}</p>
              <p className="mt-1.5 text-sm font-medium text-ink-900">{c.question}</p>
              <div className="mt-3 border-t border-line-soft pt-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-300">{t('documentDetail.answer')}</p>
                <p className="mt-1.5 text-sm text-ink-500">{c.answer}</p>
              </div>
            </Card>
          ))}
          {cards.length === 0 && (
            <Card padding="p-5" className="sm:col-span-2 lg:col-span-3">
              <p className="text-sm text-ink-500">{t('documentDetail.noFlashcards')}</p>
              <Button onClick={onGenerate} loading={generating} className="mt-4">{t('documentDetail.createFlashcards')}</Button>
            </Card>
          )}
          {cards.length > 0 && <Link to={`/flashcards`}>
            <Card hover padding="p-5" className="flex h-full flex-col items-center justify-center text-center">
              <Layers size={22} className="text-brand-600" />
              <p className="mt-2 text-sm font-medium text-ink-900">{t('documentDetail.studyAllFlashcards')}</p>
            </Card>
          </Link>}
        </div>
  );
}
