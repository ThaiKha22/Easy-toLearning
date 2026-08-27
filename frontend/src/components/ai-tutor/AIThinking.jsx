export default function AIThinking() {
  return (
    <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-line-soft bg-surface-alt/60 px-4 py-3 w-fit">
      <span className="text-xs text-ink-500">AI is thinking</span>
      <span className="flex gap-0.5">
        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-brand-500" style={{ animationDelay: '0ms' }} />
        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-brand-500" style={{ animationDelay: '150ms' }} />
        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-brand-500" style={{ animationDelay: '300ms' }} />
      </span>
    </div>
  );
}
