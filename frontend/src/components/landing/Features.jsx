import { FileText, Layers, ListChecks, Sparkles, CalendarClock, BarChart3 } from 'lucide-react';
import Card from '../ui/Card';

const features = [
  { icon: FileText, title: 'AI Summaries', desc: 'Upload any PDF, DOCX or TXT and get a clean, readable summary in seconds.' },
  { icon: Layers, title: 'Smart Flashcards', desc: 'Auto-generated flashcards that adapt to what you keep getting wrong.' },
  { icon: ListChecks, title: 'AI Quiz Generator', desc: 'Practice quizzes built directly from your own study materials.' },
  { icon: Sparkles, title: 'AI Tutor', desc: 'Ask questions and get explanations grounded in what you\u2019re studying.' },
  { icon: CalendarClock, title: 'Personalized Study Plans', desc: 'A daily plan that adjusts to your exam date and available time.' },
  { icon: BarChart3, title: 'Learning Analytics', desc: 'See exactly where you\u2019re improving — and where you\u2019re not.' },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:py-24">
      <div className="max-w-xl">
        <p className="text-sm font-semibold text-brand-600">Everything you need</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
          One platform, from upload to mastery.
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, desc }) => (
          <Card key={title} hover className="p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Icon size={20} />
            </div>
            <h3 className="mt-4 font-display text-base font-semibold text-ink-900">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{desc}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
