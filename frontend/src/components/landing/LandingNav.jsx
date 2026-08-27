import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Menu, X } from 'lucide-react';
import Button from '../ui/Button';

const links = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#ai-tutor', label: 'AI Tutor' },
];

export default function LandingNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line-soft/80 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-500 text-white">
            <Sparkles size={17} />
          </div>
          <span className="font-display text-[15px] font-bold tracking-tight text-ink-900">AI StudyHub</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-ink-500 hover:text-ink-900">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/login" className="text-sm font-medium text-ink-700 hover:text-ink-900">Log in</Link>
          <Link to="/register"><Button size="sm">Get Started</Button></Link>
        </div>

        <button className="p-2 text-ink-700 md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line-soft bg-surface px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium text-ink-700">
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Link to="/login" onClick={() => setOpen(false)}><Button variant="secondary" fullWidth>Log in</Button></Link>
              <Link to="/register" onClick={() => setOpen(false)}><Button fullWidth>Get Started</Button></Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
