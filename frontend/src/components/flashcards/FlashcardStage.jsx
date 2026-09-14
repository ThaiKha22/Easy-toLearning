import { useTranslation } from 'react-i18next';
import { RotateCcw } from 'lucide-react';

export default function FlashcardStage({ card, revealed, onReveal }) {
  const { t } = useTranslation();
  return (
    <div className="relative mx-auto w-full max-w-xl" style={{ perspective: '1400px' }}>
      <button
        onClick={onReveal}
        aria-label={revealed ? t('flashcards.showQuestion') : t('flashcards.reveal')}
        className="relative flex min-h-[280px] w-full flex-col items-center justify-center rounded-3xl border border-line-soft bg-surface p-8 text-center shadow-[var(--shadow-card-hover)] transition-transform duration-300 sm:min-h-[340px] sm:p-10"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {!revealed ? (
          <>
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">{t('flashcards.question')}</span>
            <p className="mt-4 font-display text-xl font-semibold leading-snug text-ink-900 sm:text-2xl">{card.question}</p>
            <span className="mt-6 flex items-center gap-1.5 text-xs text-ink-300">
              <RotateCcw size={13} /> {t('flashcards.reveal')}
            </span>
          </>
        ) : (
          <>
            <span className="text-xs font-semibold uppercase tracking-wide text-violet-600">{t('flashcards.answer')}</span>
            <p className="mt-4 text-base leading-relaxed text-ink-800 sm:text-lg">{card.answer}</p>
          </>
        )}
      </button>
    </div>
  );
}
