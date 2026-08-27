import { useState } from 'react';
import { Copy, RotateCcw, ThumbsUp, ThumbsDown, Sparkles, Check } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { currentUser } from '../../data/mockData';

export default function ChatMessage({ message, onRegenerate }) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(null);
  const isUser = message.role === 'user';

  function copy() {
    navigator.clipboard?.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  if (isUser) {
    return (
      <div className="flex items-start justify-end gap-2.5">
        <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-brand-600 px-4 py-2.5 text-sm text-white sm:max-w-[75%]">
          {message.content}
        </div>
        <Avatar name={currentUser.name} size="sm" className="mt-0.5 shrink-0" />
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-violet-500 text-white">
        <Sparkles size={14} />
      </div>
      <div className="max-w-[90%] sm:max-w-[80%]">
        <div className="whitespace-pre-line rounded-2xl rounded-tl-sm border border-line-soft bg-surface-alt/50 px-4 py-3 text-sm leading-relaxed text-ink-800">
          {message.content}
        </div>
        <div className="mt-1.5 flex items-center gap-1 px-1">
          <button onClick={copy} aria-label="Copy" className="rounded-md p-1.5 text-ink-300 hover:bg-surface-alt hover:text-ink-600">
            {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
          </button>
          <button onClick={onRegenerate} aria-label="Regenerate" className="rounded-md p-1.5 text-ink-300 hover:bg-surface-alt hover:text-ink-600">
            <RotateCcw size={14} />
          </button>
          <button
            onClick={() => setLiked(liked === 'up' ? null : 'up')}
            aria-label="Like"
            className={`rounded-md p-1.5 hover:bg-surface-alt ${liked === 'up' ? 'text-brand-600' : 'text-ink-300 hover:text-ink-600'}`}
          >
            <ThumbsUp size={14} />
          </button>
          <button
            onClick={() => setLiked(liked === 'down' ? null : 'down')}
            aria-label="Dislike"
            className={`rounded-md p-1.5 hover:bg-surface-alt ${liked === 'down' ? 'text-danger' : 'text-ink-300 hover:text-ink-600'}`}
          >
            <ThumbsDown size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
