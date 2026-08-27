import { ListChecks, UploadCloud, Layers, Clock3 } from 'lucide-react';
import Card from '../ui/Card';
import { formatRelativeTime } from '../../utils/format';

const iconMap = { quiz: ListChecks, upload: UploadCloud, flashcards: Layers, session: Clock3 };
const colorMap = {
  quiz: 'bg-brand-50 text-brand-600',
  upload: 'bg-[#EFEDFC] text-violet-600',
  flashcards: 'bg-spark-50 text-spark-600',
  session: 'bg-success-50 text-success',
};

export default function RecentActivity({ activity }) {
  return (
    <Card padding="p-5">
      <h2 className="font-display text-base font-semibold text-ink-900">Recent Activity</h2>
      <ul className="mt-4 space-y-4">
        {activity.map((a) => {
          const Icon = iconMap[a.type];
          return (
            <li key={a.id} className="flex items-start gap-3">
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${colorMap[a.type]}`}>
                <Icon size={15} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-ink-900">{a.label}</p>
                <p className="text-xs text-ink-500">{a.detail} · {formatRelativeTime(a.time)}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
