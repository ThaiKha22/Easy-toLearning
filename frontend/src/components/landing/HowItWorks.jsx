import { UploadCloud, Wand2, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const steps = [{ icon: UploadCloud, title: 'upload', desc: 'uploadDesc' }, { icon: Wand2, title: 'transform', desc: 'transformDesc' }, { icon: TrendingUp, title: 'track', desc: 'trackDesc' }];

export default function HowItWorks() {
  const { t } = useTranslation();
  return (
    <section id="how-it-works" className="bg-surface-alt/50 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="max-w-xl">
          <p className="text-sm font-semibold text-brand-600">{t('landing.process')}</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            {t('landing.processTitle')}
          </h2>
        </div>

        <div className="relative mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-line sm:block" aria-hidden="true" />
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="relative">
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-ink-900 font-display text-sm font-bold text-white">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Icon size={18} className="text-brand-600" />
                <h3 className="font-display text-base font-semibold text-ink-900">{t(`landing.${title}`)}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{t(`landing.${desc}`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
