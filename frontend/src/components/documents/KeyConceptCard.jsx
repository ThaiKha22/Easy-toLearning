import Card from '../ui/Card';
import Badge from '../ui/Badge';

const diffVariant = { Easy: 'success', Medium: 'spark', Hard: 'danger' };

export default function KeyConceptCard({ concept }) {
  return (
    <Card padding="p-5">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-sm font-semibold text-ink-900">{concept.name}</h3>
        <Badge variant={diffVariant[concept.difficulty]}>{concept.difficulty}</Badge>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ink-500">{concept.explanation}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {concept.relatedTopics.map((t) => (
          <span key={t} className="rounded-full bg-surface-alt px-2.5 py-1 text-xs text-ink-500">{t}</span>
        ))}
      </div>
    </Card>
  );
}
