import { useState } from 'react';
import { Check } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const diffVariant = { Easy: 'success', Medium: 'spark', Hard: 'danger' };

export default function DayPlanCard({ day, tasks: initialTasks, isToday }) {
  const [tasks, setTasks] = useState(initialTasks);
  const toggle = (id) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <Card padding="p-4" className={isToday ? 'ring-2 ring-brand-500' : ''}>
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold text-ink-900">{day}</h3>
        {isToday && <Badge variant="brand">Today</Badge>}
      </div>
      <p className="mt-0.5 text-xs text-ink-500">{doneCount}/{tasks.length} done</p>
      <ul className="mt-3 space-y-2">
        {tasks.map((t) => (
          <li key={t.id} className="flex items-start gap-2 rounded-lg border border-line-soft px-2.5 py-2">
            <button
              onClick={() => toggle(t.id)}
              aria-pressed={t.done}
              aria-label={`Mark ${t.topic} as ${t.done ? 'not done' : 'done'}`}
              className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                t.done ? 'border-brand-600 bg-brand-600 text-white' : 'border-line'
              }`}
            >
              {t.done && <Check size={11} />}
            </button>
            <div className="min-w-0 flex-1">
              <p className={`text-xs font-medium leading-snug ${t.done ? 'text-ink-300 line-through' : 'text-ink-900'}`}>{t.topic}</p>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-[11px] text-ink-500">{t.duration} min</span>
                <Badge variant={diffVariant[t.difficulty]} className="scale-90">{t.difficulty}</Badge>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
