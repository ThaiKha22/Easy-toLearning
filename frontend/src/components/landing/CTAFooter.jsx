import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

export function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:py-24">
      <div className="relative overflow-hidden rounded-3xl bg-ink-900 px-6 py-14 text-center sm:px-12">
        <div
          className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, var(--color-brand-400), var(--color-violet-500), transparent)' }}
          aria-hidden="true"
        />
        <h2 className="relative font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to study smarter?
        </h2>
        <p className="relative mx-auto mt-3 max-w-md text-white/65">
          Upload your first document and see your personalized study plan in minutes.
        </p>
        <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/register">
            <Button size="lg" icon={ArrowRight} iconPosition="right">Get Started — it's free</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line-soft px-5 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-500 text-white">
            <Sparkles size={14} />
          </div>
          <span className="font-display text-sm font-bold text-ink-900">AI StudyHub</span>
        </div>
        <p className="text-xs text-ink-500">© 2026 AI StudyHub. All rights reserved.</p>
      </div>
    </footer>
  );
}
