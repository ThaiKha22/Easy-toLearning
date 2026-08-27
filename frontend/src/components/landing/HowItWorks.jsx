import { UploadCloud, Wand2, TrendingUp } from 'lucide-react';

const steps = [
  { icon: UploadCloud, title: 'Upload your materials', desc: 'Drop in lecture slides, PDFs, or notes — AI StudyHub reads and organizes them by subject.' },
  { icon: Wand2, title: 'Let AI transform them', desc: 'Get summaries, flashcards and quizzes generated automatically from what you uploaded.' },
  { icon: TrendingUp, title: 'Learn and track your progress', desc: 'Study with a plan that adapts to your exam date and the topics you\u2019re weakest on.' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-surface-alt/50 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="max-w-xl">
          <p className="text-sm font-semibold text-brand-600">The process</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            From raw notes to a study plan in three steps.
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
                <h3 className="font-display text-base font-semibold text-ink-900">{title}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
