import { Sparkles, Send } from 'lucide-react';

export default function AITutorPreview() {
  return (
    <section id="ai-tutor" className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-sm font-semibold text-brand-600">Meet your AI tutor</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            Ask anything. Get answers grounded in your own materials.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-500">
            Your AI tutor knows what subject and document you\u2019re studying, so explanations connect directly to your coursework instead of generic answers.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-ink-700">
            {['Explains concepts with analogies that actually stick', 'Quizzes you on demand', 'Suggests what to study next'].map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-line-soft bg-surface p-4 shadow-[var(--shadow-card-hover)] sm:p-5">
          <div className="flex items-center gap-2 border-b border-line-soft pb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-500 text-white">
              <Sparkles size={15} />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink-900">AI Tutor</p>
              <p className="text-xs text-ink-500">Computer Networks · Ch. 4 — TCP</p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-brand-600 px-3.5 py-2.5 text-sm text-white">
              Explain TCP congestion control.
            </div>
            <div className="max-w-[90%] rounded-2xl rounded-tl-sm border border-line-soft bg-surface-alt/60 px-3.5 py-2.5 text-sm text-ink-700">
              Think of it like managing traffic on a highway — TCP starts cautiously, speeds up while the road is clear, and backs off the moment it senses a jam.
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {['Give me an example', 'Quiz me on this'].map((p) => (
              <span key={p} className="rounded-full border border-line px-3 py-1.5 text-xs text-ink-500">{p}</span>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-xl border border-line bg-surface-alt/40 px-3 py-2.5">
            <span className="flex-1 text-sm text-ink-300">Ask anything about your study materials...</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
              <Send size={14} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
