import { BookOpen, FileText, Tag } from 'lucide-react';
import { studyContext } from '../../data/mockData';

export default function StudyContextPanel() {
  return (
    <div className="space-y-5 p-4">
      <div>
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-500">
          <BookOpen size={13} /> Current Subject
        </p>
        <p className="mt-1.5 text-sm font-medium text-ink-900">{studyContext.subject}</p>
      </div>
      <div>
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-500">
          <FileText size={13} /> Current Document
        </p>
        <p className="mt-1.5 text-sm font-medium text-ink-900">{studyContext.document}</p>
      </div>
      <div>
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-500">
          <Tag size={13} /> Relevant Topics
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {studyContext.topics.map((t) => (
            <span key={t} className="rounded-full bg-surface-alt px-2.5 py-1 text-xs text-ink-700">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
