import { useEffect, useState } from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import Card from '../ui/Card';
import { MasteryRing, ProgressBar } from '../ui/Progress';
import { useTranslation } from 'react-i18next';
import { studySessionService } from '../../services/api';

export default function SubjectOverviewTab({ subject, progress }) {
  const { t, i18n } = useTranslation();
  const [weeklyMinutes, setWeeklyMinutes] = useState([]);
  const topics = [];

  useEffect(() => {
    const end = new Date();
    const start = new Date(end);
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - 6);

    studySessionService.list({ subjectId: subject.id }).then((sessions) => {
      const totals = new Map();
      sessions.forEach((session) => {
        const date = new Date(session.startedAt);
        if (date >= start && date <= end) {
          const key = date.toISOString().slice(0, 10);
          totals.set(key, (totals.get(key) || 0) + (session.duration || 0));
        }
      });

      setWeeklyMinutes(Array.from({ length: 7 }, (_, index) => {
        const date = new Date(start);
        date.setDate(start.getDate() + index);
        const key = date.toISOString().slice(0, 10);
        return {
          day: date.toLocaleDateString(i18n.language === 'vi' ? 'vi-VN' : 'en-US', { weekday: 'short' }),
          min: totals.get(key) || 0,
        };
      }));
    }).catch(() => setWeeklyMinutes([]));
  }, [subject.id, i18n.language]);
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <div className="space-y-5 lg:col-span-2">
        <Card padding="p-5">
          <h3 className="font-display text-base font-semibold text-ink-900">{t('subject.studyTime')}</h3>
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
          <h3 className="font-display text-base font-semibold text-ink-900">{t('subject.activity')}</h3>
          <ul className="mt-4 space-y-3">
            <li className="text-sm text-ink-500">{progress ? `${progress.completedTasks} ${t('subject.tasksCompleted')}` : t('subject.noActivity')}</li>
          </ul>
        </Card>
      </div>

      <div className="space-y-5">
        <Card padding="p-5" className="flex flex-col items-center text-center">
          <MasteryRing value={subject.progress} size={100} strokeWidth={9} />
          <p className="mt-3 text-sm text-ink-500">{t('subject.mastery', { subject: subject.name })}</p>
        </Card>

        <Card padding="p-5">
          <h3 className="font-display text-base font-semibold text-ink-900">{t('subject.weakTopics')}</h3>
          <div className="mt-4 space-y-3.5">
            {topics.length === 0 && <p className="text-sm text-ink-500">{t('subject.noWeakTopics')}</p>}
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
