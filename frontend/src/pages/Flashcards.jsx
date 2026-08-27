import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Shuffle, ChevronLeft, ChevronRight, X, Layers } from 'lucide-react';
import { flashcardService } from '../services/api';
import { flashcardDecks } from '../data/mockData';
import FlashcardStage from '../components/flashcards/FlashcardStage';
import Button from '../components/ui/Button';
import Skeleton from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import { useToast } from '../components/ui/Toast';

export default function Flashcards() {
  const [searchParams, setSearchParams] = useSearchParams();
  const deckId = searchParams.get('deck') || flashcardDecks[0].id;
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    setLoading(true);
    flashcardService.listCards(deckId).then((c) => {
      setCards(c);
      setIndex(0);
      setRevealed(false);
      setLoading(false);
    });
  }, [deckId]);

  const deck = flashcardDecks.find((d) => d.id === deckId);
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
    showToast('Deck shuffled', 'info');
  }
  function rate(label) {
    showToast(`Marked "${label}"`, 'success');
    if (index < cards.length - 1) next();
    else showToast('Deck complete! 🎉', 'success');
  }

  if (loading) return <Skeleton className="h-96 rounded-2xl" />;

  return (
    <div className="mx-auto flex max-w-2xl flex-col">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <select
            value={deckId}
            onChange={(e) => setSearchParams({ deck: e.target.value })}
            aria-label="Select deck"
            className="max-w-full truncate rounded-lg border border-line bg-surface px-2.5 py-1.5 text-sm font-medium text-ink-900 outline-none focus:border-brand-500"
          >
            {flashcardDecks.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
        <button aria-label="Exit session" className="rounded-lg p-2 text-ink-500 hover:bg-surface-alt">
          <X size={18} />
        </button>
      </div>

      {cards.length === 0 ? (
        <EmptyState icon={Layers} title="No flashcards available" description="Generate flashcards from your study materials." />
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-ink-500">Card {index + 1} of {cards.length}</span>
            <button onClick={shuffle} className="flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-900">
              <Shuffle size={15} /> Shuffle
            </button>
          </div>

          <FlashcardStage card={card} revealed={revealed} onReveal={() => setRevealed((r) => !r)} />

          <div className="mt-6 flex items-center justify-between gap-3">
            <Button variant="ghost" icon={ChevronLeft} onClick={prev} disabled={index === 0}>Previous</Button>
            {revealed ? (
              <div className="flex flex-1 justify-center gap-2 sm:gap-3">
                <Button variant="danger" size="sm" onClick={() => rate('Hard')} className="flex-1 sm:flex-none">Hard</Button>
                <Button variant="spark" size="sm" onClick={() => rate('Good')} className="flex-1 sm:flex-none">Good</Button>
                <Button variant="primary" size="sm" onClick={() => rate('Easy')} className="flex-1 sm:flex-none">Easy</Button>
              </div>
            ) : <div className="flex-1" />}
            <Button variant="ghost" icon={ChevronRight} iconPosition="right" onClick={next} disabled={index === cards.length - 1}>Next</Button>
          </div>
        </>
      )}
    </div>
  );
}
