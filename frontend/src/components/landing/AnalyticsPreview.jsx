import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { MasteryRing } from '../ui/Progress';
import { useTranslation } from 'react-i18next';

const previewPerformance = [
  { date: 'T1', score: 52 },
  { date: 'T2', score: 61 },
  { date: 'T3', score: 68 },
  { date: 'T4', score: 78 },
];

export default function AnalyticsPreview() {
  const { t } = useTranslation();
  return (
    <section className="bg-surface-alt/50 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 rounded-2xl border border-line-soft bg-surface p-5 shadow-[var(--shadow-card-hover)] lg:order-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-ink-900">{t('landing.performance')}</p>
              <span className="text-xs text-success">{t('landing.month')}</span>
            </div>
            <div className="mt-3 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={previewPerformance} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="landingArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-brand-500)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--color-brand-500)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'var(--color-ink-300)' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--color-line)', fontSize: 12 }} />
                  <Area type="monotone" dataKey="score" stroke="var(--color-brand-500)" strokeWidth={2} fill="url(#landingArea)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 border-t border-line-soft pt-4">
              <div className="flex flex-col items-center">
                <MasteryRing value={84} size={56} strokeWidth={5} color="brand" />
                <span className="mt-1.5 text-[11px] text-ink-500">TCP</span>
              </div>
              <div className="flex flex-col items-center">
                <MasteryRing value={52} size={56} strokeWidth={5} color="danger" />
                <span className="mt-1.5 text-[11px] text-ink-500">Subnetting</span>
              </div>
              <div className="flex flex-col items-center">
                <MasteryRing value={68} size={56} strokeWidth={5} color="spark" />
                <span className="mt-1.5 text-[11px] text-ink-500">Congestion</span>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-sm font-semibold text-brand-600">{t('landing.know')}</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              {t('landing.analyticsTitle')}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-500">
              {t('landing.analyticsDesc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
