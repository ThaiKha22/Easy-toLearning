import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function AIRecommendationCard({ topic = 'Congestion Control', minutes = 20, subjectId = 'sub-networks' }) {
  return (
    <div className="ai-edge p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-500 text-white shadow-[var(--shadow-glow-brand)]">
          <Sparkles size={18} />
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">AI Recommendation</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-800 sm:text-base">
            Based on your recent quiz results, we recommend reviewing <span className="font-semibold text-ink-900">{topic}</span> for {minutes} minutes today.
          </p>
          <Link to={`/subjects/${subjectId}`}>
            <Button size="sm" className="mt-4" icon={ArrowRight} iconPosition="right">
              Start Recommended Session
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
