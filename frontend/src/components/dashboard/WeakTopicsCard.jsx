import { AlertCircle } from 'lucide-react';
import Card from '../ui/Card';
import { ProgressBar } from '../ui/Progress';

export default function WeakTopicsCard({ topics }) {
  return (
    <Card padding="p-5">
      <div className="flex items-center gap-2">
        <AlertCircle size={17} className="text-danger" />
        <h2 className="font-display text-base font-semibold text-ink-900">Weak Topics</h2>
      </div>
      <div className="mt-4 space-y-3.5">
        {topics.map((t) => (
          <div key={t.id}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-900">{t.name}</span>
              <span className="text-ink-500">{t.mastery}%</span>
            </div>
            <ProgressBar value={t.mastery} color={t.mastery < 55 ? 'danger' : 'spark'} className="mt-1.5" />
          </div>
        ))}
      </div>
    </Card>
  );
}
