import { Check, X } from 'lucide-react';

export default function QuizOption({ option, selected, correctOptionId, submitted, onSelect, disabled }) {
  const isCorrect = option.id === correctOptionId;
  const isSelected = option.id === selected;

  let state = 'default';
  if (submitted) {
    if (isCorrect) state = 'correct';
    else if (isSelected && !isCorrect) state = 'incorrect';
    else state = 'disabled';
  } else if (isSelected) {
    state = 'selected';
  }

  const styles = {
    default: 'border-line hover:border-brand-300 hover:bg-surface-alt/50',
    selected: 'border-brand-500 bg-brand-50 ring-1 ring-brand-500',
    correct: 'border-success bg-success-50',
    incorrect: 'border-danger bg-danger-50',
    disabled: 'border-line-soft opacity-60',
  };

  return (
    <button
      onClick={() => !disabled && onSelect(option.id)}
      disabled={disabled}
      aria-pressed={isSelected}
      className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium text-ink-900 transition-colors duration-150 sm:py-4 ${styles[state]}`}
    >
      <span>{option.label}</span>
      {state === 'correct' && <Check size={18} className="shrink-0 text-success" />}
      {state === 'incorrect' && <X size={18} className="shrink-0 text-danger" />}
    </button>
  );
}
