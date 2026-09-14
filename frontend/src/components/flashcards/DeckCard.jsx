import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layers } from 'lucide-react';
import Card from '../ui/Card';
import { MasteryRing } from '../ui/Progress';

export default function DeckCard({ deck }) {
  const { t } = useTranslation();
  const masteryPct = deck.cardCount ? Math.round((deck.mastered / deck.cardCount) * 100) : 0;
  return (
    <Link to={deck.documentId && deck.documentId !== 'all' ? `/documents/${deck.documentId}` : '/flashcards'}>
      <Card hover padding="p-5" className="flex items-center gap-4">
        <MasteryRing value={masteryPct} size={56} strokeWidth={5} color="violet" />
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display text-sm font-semibold text-ink-900">{deck.name}</h3>
          <p className="mt-1 flex items-center gap-1 text-xs text-ink-500">
            <Layers size={12} /> {deck.mastered}/{deck.cardCount} {t('flashcards.mastered')}
          </p>
        </div>
      </Card>
    </Link>
  );
}
