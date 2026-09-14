import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const diffVariant = { Easy: 'success', Medium: 'spark', Hard: 'danger' };

export default function TodayPlanCard({ plan }) {
  const { t } = useTranslation();
  const [items, setItems] = useState(() => plan || []);
  const toggle = (id) => setItems((its) => its.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));

  return (
    <Card padding="p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-base font-semibold text-ink-900">{t('dashboard.todayPlan')}</h2>
        <Link to="/study-plan" className="text-sm font-medium text-brand-600 hover:underline">{t('dashboard.fullPlan')}</Link>
      </div>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-3 rounded-xl border border-line-soft px-3.5 py-2.5">
            <button
              onClick={() => toggle(item.id)}
              aria-pressed={item.done}
              aria-label={`Mark ${item.topic} as ${item.done ? 'not done' : 'done'}`}
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                item.done ? 'border-brand-600 bg-brand-600 text-white' : 'border-line'
              }`}
            >
              {item.done && <Check size={13} />}
            </button>
            <span className={`flex-1 text-sm ${item.done ? 'text-ink-300 line-through' : 'text-ink-900'}`}>{item.topic}</span>
            <span className="text-xs text-ink-500">{item.duration} {t('common.minute')}</span>
            <Badge variant={diffVariant[item.difficulty]} className="hidden sm:inline-flex">{item.difficulty}</Badge>
          </li>
        ))}
      </ul>
    </Card>
  );
}
