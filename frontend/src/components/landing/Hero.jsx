import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Flame } from 'lucide-react';
import Button from '../ui/Button';
import { MasteryRing, ProgressBar } from '../ui/Progress';
import Badge from '../ui/Badge';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-14 sm:px-6 sm:pt-20 lg:pb-24 lg:pt-28">
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[860px] -translate-x-1/2 rounded-full opacity-[0.16] blur-3xl"
        style={{ background: 'radial-gradient(closest-side, var(--color-brand-500), var(--color-violet-500), transparent)' }}
        aria-hidden="true"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div className="relative">
          <Badge variant="brand" icon={Sparkles} className="mb-5">{t('landing.badge')}</Badge>
          <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl lg:text-[3.4rem]">
            {t('landing.heroTitle1')}
            <br />
            {t('landing.heroTitle2')}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-500 sm:text-lg">
            {t('landing.heroDescription')}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/register">
              <Button size="lg" icon={ArrowRight} iconPosition="right" fullWidth className="sm:w-auto">
                {t('landing.getStarted')}
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="secondary" fullWidth className="sm:w-auto">
                {t('landing.explore')}
              </Button>
            </a>
          </div>
          <div className="mt-8 flex items-center gap-4 text-sm text-ink-500">
            <div className="flex -space-x-2">
              {['#14887A', '#7C6FE8', '#EFA023', '#1E9E6B'].map((c, i) => (
                <span key={i} className="h-7 w-7 rounded-full border-2 border-paper" style={{ backgroundColor: c }} />
              ))}
            </div>
            {t('landing.students')}
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="rounded-2xl border border-line-soft bg-surface p-4 shadow-[var(--shadow-card-hover)] sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-sm font-semibold text-ink-900">Good evening, Alex 👋</p>
                <p className="text-xs text-ink-500">{t('landing.ready')}</p>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-spark-50 px-2.5 py-1 text-xs font-medium text-spark-600">
                <Flame size={12} /> {t('landing.streak', { count: 12 })}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2.5">
              <MiniStat label={t('landing.progress')} value="58%" color="brand" />
              <MiniStat label={t('landing.quizAverage')} value="78%" color="violet" />
              <MiniStat label={t('landing.streakShort')} value="12d" color="spark" />
            </div>

            <div className="mt-4 rounded-xl border border-line-soft p-3.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-ink-900">Computer Networks</span>
                <span className="text-ink-500">67%</span>
              </div>
              <ProgressBar value={67} className="mt-2" />
            </div>

            <div className="ai-edge mt-4 p-3.5">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-500 text-white">
                  <Sparkles size={14} />
                </div>
                <p className="text-xs leading-relaxed text-ink-700">
                  {t('landing.recommendation', { topic: 'Congestion Control' })}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-line-soft bg-surface p-3 shadow-[var(--shadow-card-hover)] sm:flex sm:items-center sm:gap-2.5">
            <MasteryRing value={82} size={48} strokeWidth={5} color="success" />
            <div className="pr-1">
              <p className="text-[11px] text-ink-500">{t('landing.lastQuiz')}</p>
              <p className="text-xs font-semibold text-ink-900">TCP & Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniStat({ label, value, color }) {
  const colorMap = { brand: 'text-brand-600', violet: 'text-violet-600', spark: 'text-spark-600' };
  return (
    <div className="rounded-xl bg-surface-alt/70 px-2.5 py-2 text-center">
      <p className={`font-display text-sm font-bold ${colorMap[color]}`}>{value}</p>
      <p className="mt-0.5 text-[10px] text-ink-500">{label}</p>
    </div>
  );
}
