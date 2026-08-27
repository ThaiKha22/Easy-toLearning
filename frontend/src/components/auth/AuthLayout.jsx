import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Zap, TrendingUp } from 'lucide-react';

const points = [
  { icon: Zap, text: 'AI-generated summaries, flashcards and quizzes from your own notes' },
  { icon: TrendingUp, text: 'Study plans that adapt to what you actually struggle with' },
  { icon: ShieldCheck, text: 'Your materials stay private, always' },
];

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="flex min-h-screen bg-paper">
      <div className="hidden w-[42%] flex-col justify-between bg-ink-900 p-10 text-white lg:flex xl:p-14">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 to-violet-400">
            <Sparkles size={17} />
          </div>
          <span className="font-display text-[15px] font-bold tracking-tight">AI StudyHub</span>
        </Link>

        <div>
          <p className="font-display text-3xl font-semibold leading-tight xl:text-4xl">
            Study smarter, not longer.
          </p>
          <div className="mt-8 space-y-5">
            {points.map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Icon size={16} />
                </div>
                <p className="text-sm text-white/75">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-white/40">© 2026 AI StudyHub. Built for students who want their time back.</p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 sm:px-10">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-500 text-white">
              <Sparkles size={17} />
            </div>
            <span className="font-display text-[15px] font-bold tracking-tight text-ink-900">AI StudyHub</span>
          </Link>
          <h1 className="font-display text-2xl font-semibold text-ink-900">{title}</h1>
          {subtitle && <p className="mt-1.5 text-sm text-ink-500">{subtitle}</p>}
          <div className="mt-7">{children}</div>
        </div>
      </div>
    </div>
  );
}
