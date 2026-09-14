import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Shuffle, ChevronLeft, ChevronRight, X, Layers } from 'lucide-react';
import { flashcardService } from '../services/api';
import FlashcardStage from '../components/flashcards/FlashcardStage';
import Button from '../components/ui/Button';
import Skeleton from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import { useToast } from '../components/ui/Toast';

export default function Flashcards() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get('subject') || '';
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    setLoading(true);
    flashcardService.listCards(subjectId ? { subjectId } : undefined)
      .then((c) => {
        setCards(c);
        setIndex(0);
        setRevealed(false);
      })
      .catch((error) => showToast(error.message, 'error'))
      .finally(() => setLoading(false));
  }, [subjectId]);

  const card = cards[index];

  function next() {
    setRevealed(false);
    setIndex((i) => Math.min(cards.length - 1, i + 1));
  }
  function prev() {
    setRevealed(false);
    setIndex((i) => Math.max(0, i - 1));
  }
  function shuffle() {
    setCards((c) => [...c].sort(() => Math.random() - 0.5));
    setIndex(0);
    setRevealed(false);
    showToast(t('flashcards.deckShuffled'), 'info');
  }
  async function rate(label) {
    const status = label === 'easy' ? 'known' : label === 'good' ? 'learning' : 'new';
    try {
      await flashcardService.updateCard(card._id || card.id, { status });
      showToast(t('flashcards.marked', { label: t(`flashcards.${label}`) }), 'success');
      if (index < cards.length - 1) next();
      else showToast(t('flashcards.complete'), 'success');
    } catch (error) {
      showToast(error.message, 'error');
    }
  }

  if (loading) return <Skeleton className="h-96 rounded-2xl" />;

  return (
    <div className="mx-auto flex max-w-2xl flex-col">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="rounded-lg border border-line bg-surface px-2.5 py-1.5 text-sm font-medium text-ink-900 hover:border-brand-500 hover:text-brand-700">
            {t('flashcards.all')}
          </span>
        </div>
        <button aria-label={t('flashcards.exit')} className="rounded-lg p-2 text-ink-500 hover:bg-surface-alt">
          <X size={18} />
        </button>
      </div>

      {cards.length === 0 ? (
        <EmptyState icon={Layers} title={t('flashcards.noCards')} description={t('flashcards.generate')} />
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-ink-500">{t('flashcards.card')} {index + 1} {t('flashcards.of')} {cards.length}</span>
            <button onClick={shuffle} className="flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-900">
              <Shuffle size={15} /> {t('flashcards.shuffle')}
            </button>
          </div>

          <FlashcardStage card={card} revealed={revealed} onReveal={() => setRevealed((r) => !r)} />

          <div className="mt-6 flex items-center justify-between gap-3">
            <Button variant="ghost" icon={ChevronLeft} onClick={prev} disabled={index === 0}>{t('flashcards.previous')}</Button>
            {revealed ? (
              <div className="flex flex-1 justify-center gap-2 sm:gap-3">
                <Button variant="danger" size="sm" onClick={() => rate('hard')} className="flex-1 sm:flex-none">{t('flashcards.hard')}</Button>
                <Button variant="spark" size="sm" onClick={() => rate('good')} className="flex-1 sm:flex-none">{t('flashcards.good')}</Button>
                <Button variant="primary" size="sm" onClick={() => rate('easy')} className="flex-1 sm:flex-none">{t('flashcards.easy')}</Button>
              </div>
            ) : <div className="flex-1" />}
            <Button variant="ghost" icon={ChevronRight} iconPosition="right" onClick={next} disabled={index === cards.length - 1}>{t('flashcards.next')}</Button>
          </div>
        </>
      )}
    </div>
  );
}
