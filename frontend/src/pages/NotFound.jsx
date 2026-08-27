import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-paper px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-violet-500 text-white">
        <Sparkles size={24} />
      </div>
      <h1 className="font-display text-4xl font-bold text-ink-900">404</h1>
      <p className="max-w-sm text-sm text-ink-500">This page doesn't exist. Let's get you back to studying.</p>
      <Link to="/dashboard"><Button>Back to Dashboard</Button></Link>
    </div>
  );
}
