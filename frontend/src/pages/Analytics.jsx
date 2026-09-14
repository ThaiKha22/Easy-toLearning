import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, Radar,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';
import { Clock, Flame, Target, Award, Sparkles } from 'lucide-react';
import { analyticsService } from '../services/api';
import Card from '../components/ui/Card';
import { ProgressBar } from '../components/ui/Progress';
import { formatMinutes } from '../utils/format';
import Skeleton from '../components/ui/Skeleton';
import ErrorState from '../components/ui/ErrorState';

const chartTooltip = { borderRadius: 12, border: '1px solid var(--color-line)', fontSize: 12 };

export default function Analytics() {
  const { t } = useTranslation();
  const [stats, setStats] = useState(null);
  const [charts, setCharts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  function load() {
    setLoading(true);
    setError(false);
    Promise.all([analyticsService.getStats(), analyticsService.getCharts()])
      .then(([s, c]) => { setStats(s); setCharts(c); })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }
  useEffect(load, []);

  if (loading) return <Skeleton className="h-[600px] rounded-2xl" />;
  if (error || !stats || !charts) return <ErrorState onRetry={load} />;

  const statItems = [
    { label: t('analytics.totalStudyTime'), value: formatMinutes(stats.totalStudyMinutes), icon: Clock, color: 'text-brand-600 bg-brand-50' },
    { label: t('analytics.currentStreak'), value: `${stats.currentStreak} ${t('dashboard.days')}`, icon: Flame, color: 'text-spark-600 bg-spark-50' },
    { label: t('analytics.averageQuiz'), value: `${stats.averageQuizScore}%`, icon: Target, color: 'text-violet-600 bg-[#EFEDFC]' },
    { label: t('analytics.topicsMastered'), value: stats.topicsMastered, icon: Award, color: 'text-success bg-success-50' },
  ];

  return (
    <div className="space-y-5 lg:space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {statItems.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} padding="p-4 sm:p-5">
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${color}`}><Icon size={17} /></div>
            <p className="mt-3 font-display text-xl font-bold text-ink-900 sm:text-2xl">{value}</p>
            <p className="mt-0.5 text-xs text-ink-500 sm:text-sm">{label}</p>
          </Card>
        ))}
      </div>

      <div className="ai-edge p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-500 text-white">
            <Sparkles size={15} />
          </div>
          <p className="text-sm leading-relaxed text-ink-800">
            <span className="font-semibold text-ink-900">{t('analytics.insight')}:</span> {t('analytics.improvement')}
          </p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card padding="p-5">
          <h3 className="font-display text-base font-semibold text-ink-900">{t('analytics.studyTime')}</h3>
          <div className="mt-3 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.studyTimeWeekly}>
                <CartesianGrid vertical={false} stroke="var(--color-line-soft)" />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: 'var(--color-ink-500)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: 'var(--color-ink-500)' }} axisLine={false} tickLine={false} width={32} />
                <Tooltip contentStyle={chartTooltip} cursor={{ fill: 'var(--color-surface-alt)' }} />
                <Bar dataKey="minutes" fill="var(--color-brand-500)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card padding="p-5">
          <h3 className="font-display text-base font-semibold text-ink-900">{t('analytics.quizPerformance')}</h3>
          <div className="mt-3 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={charts.quizPerformance}>
                <defs>
                  <linearGradient id="quizArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-violet-500)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-violet-500)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="var(--color-line-soft)" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: 'var(--color-ink-500)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: 'var(--color-ink-500)' }} axisLine={false} tickLine={false} width={32} domain={[0, 100]} />
                <Tooltip contentStyle={chartTooltip} />
                <Area type="monotone" dataKey="score" stroke="var(--color-violet-500)" strokeWidth={2.5} fill="url(#quizArea)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card padding="p-5">
          <h3 className="font-display text-base font-semibold text-ink-900">{t('analytics.topicMastery')}</h3>
          <div className="mt-3 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={charts.topicMastery}>
                <PolarGrid stroke="var(--color-line)" />
                <PolarAngleAxis dataKey="topic" tick={{ fontSize: 11, fill: 'var(--color-ink-500)' }} />
                <Radar dataKey="mastery" stroke="var(--color-brand-500)" fill="var(--color-brand-500)" fillOpacity={0.25} strokeWidth={2} />
                <Tooltip contentStyle={chartTooltip} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card padding="p-5">
          <h3 className="font-display text-base font-semibold text-ink-900">{t('analytics.consistency')}</h3>
          <div className="mt-3 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={charts.consistency}>
                <CartesianGrid vertical={false} stroke="var(--color-line-soft)" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'var(--color-ink-500)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: 'var(--color-ink-500)' }} axisLine={false} tickLine={false} width={32} />
                <Tooltip contentStyle={chartTooltip} />
                <Line type="monotone" dataKey="minutes" stroke="var(--color-spark-500)" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card padding="p-5">
        <h3 className="font-display text-base font-semibold text-ink-900">{t('analytics.weakTopics')}</h3>
        <div className="mt-4 space-y-3.5">
          {charts.topicMastery.filter((t) => t.mastery < 70).map((t) => (
            <div key={t.topic}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-900">{t.topic}</span>
                <span className="text-ink-500">{t.mastery}%</span>
              </div>
              <ProgressBar value={t.mastery} color="danger" className="mt-1.5" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
