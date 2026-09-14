import { FileText, Layers, ListChecks, CalendarClock, BarChart3 } from 'lucide-react';
import Card from '../ui/Card';
import { useTranslation } from 'react-i18next';

const features = [
  { icon: FileText, title: 'summaries', desc: 'summariesDesc' }, { icon: Layers, title: 'flashcards', desc: 'flashcardsDesc' }, { icon: ListChecks, title: 'quizGenerator', desc: 'quizGeneratorDesc' }, { icon: CalendarClock, title: 'studyPlans', desc: 'studyPlansDesc' }, { icon: BarChart3, title: 'analytics', desc: 'analyticsDesc' },
];

export default function Features() {
  const { t } = useTranslation();
  return (
    <section id="features" className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:py-24">
      <div className="max-w-xl">
        <p className="text-sm font-semibold text-brand-600">{t('landing.everything')}</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
          {t('landing.platform')}
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, desc }) => (
          <Card key={title} hover className="p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Icon size={20} />
            </div>
            <h3 className="mt-4 font-display text-base font-semibold text-ink-900">{t(`landing.${title}`)}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{t(`landing.${desc}`)}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
