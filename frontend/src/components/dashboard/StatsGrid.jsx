import { TrendingUp, Flame, Clock, Target } from 'lucide-react';
import Card from '../ui/Card';
import { formatMinutes } from '../../utils/format';

export default function StatsGrid({ stats }) {
  const items = [
    { label: 'Overall Progress', value: `${stats.overallProgress}%`, icon: TrendingUp, color: 'text-brand-600 bg-brand-50' },
    { label: 'Study Streak', value: `${stats.studyStreak} days`, icon: Flame, color: 'text-spark-600 bg-spark-50' },
    { label: 'Study Time', value: formatMinutes(stats.studyTimeMinutes), icon: Clock, color: 'text-violet-600 bg-[#EFEDFC]' },
    { label: 'Quiz Average', value: `${stats.quizAverage}%`, icon: Target, color: 'text-success bg-success-50' },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {items.map(({ label, value, icon: Icon, color }) => (
        <Card key={label} hover className="p-4 sm:p-5">
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${color}`}>
            <Icon size={17} />
          </div>
          <p className="mt-3 font-display text-xl font-bold text-ink-900 sm:text-2xl">{value}</p>
          <p className="mt-0.5 text-xs text-ink-500 sm:text-sm">{label}</p>
        </Card>
      ))}
    </div>
  );
}
