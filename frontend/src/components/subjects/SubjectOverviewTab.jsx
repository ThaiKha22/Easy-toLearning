import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import Card from '../ui/Card';
import { MasteryRing, ProgressBar } from '../ui/Progress';
import { weakTopics, recentActivity } from '../../data/mockData';
import { formatRelativeTime } from '../../utils/format';

const weeklyMinutes = [
  { day: 'Mon', min: 25 }, { day: 'Tue', min: 40 }, { day: 'Wed', min: 15 },
  { day: 'Thu', min: 35 }, { day: 'Fri', min: 20 }, { day: 'Sat', min: 50 }, { day: 'Sun', min: 10 },
];

export default function SubjectOverviewTab({ subject }) {
  const topics = weakTopics.filter((t) => t.subjectId === subject.id);
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <div className="space-y-5 lg:col-span-2">
        <Card padding="p-5">
          <h3 className="font-display text-base font-semibold text-ink-900">Study Time This Week</h3>
          <div className="mt-3 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyMinutes}>
                <CartesianGrid vertical={false} stroke="var(--color-line-soft)" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'var(--color-ink-500)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: 'var(--color-ink-500)' }} axisLine={false} tickLine={false} width={28} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--color-line)', fontSize: 12 }} cursor={{ fill: 'var(--color-surface-alt)' }} />
                <Bar dataKey="min" fill="var(--color-brand-500)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card padding="p-5">
          <h3 className="font-display text-base font-semibold text-ink-900">Recent Activity</h3>
          <ul className="mt-4 space-y-3">
            {recentActivity.slice(0, 4).map((a) => (
              <li key={a.id} className="flex items-center justify-between text-sm">
                <span className="text-ink-900">{a.label}</span>
                <span className="shrink-0 text-xs text-ink-500">{formatRelativeTime(a.time)}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="space-y-5">
        <Card padding="p-5" className="flex flex-col items-center text-center">
          <MasteryRing value={subject.progress} size={100} strokeWidth={9} />
          <p className="mt-3 text-sm text-ink-500">Overall mastery of {subject.name}</p>
        </Card>

        <Card padding="p-5">
          <h3 className="font-display text-base font-semibold text-ink-900">Weak Topics</h3>
          <div className="mt-4 space-y-3.5">
            {topics.length === 0 && <p className="text-sm text-ink-500">No weak topics identified yet.</p>}
            {topics.map((t) => (
              <div key={t.id}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-900">{t.name}</span>
                  <span className="text-ink-500">{t.mastery}%</span>
                </div>
                <ProgressBar value={t.mastery} color="danger" className="mt-1.5" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
