import { Plus, MessageSquare } from 'lucide-react';
import Button from '../ui/Button';
import { formatRelativeTime } from '../../utils/format';

export default function ConversationHistory({ conversations, activeId, onSelect, onNew }) {
  return (
    <div className="flex h-full flex-col">
      <div className="p-3">
        <Button variant="secondary" icon={Plus} fullWidth onClick={onNew}>New Chat</Button>
      </div>
      <div className="thin-scroll flex-1 space-y-1 overflow-y-auto px-3 pb-3">
        {conversations.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`w-full rounded-xl px-3 py-2.5 text-left transition-colors ${
              c.id === activeId ? 'bg-brand-50' : 'hover:bg-surface-alt'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <MessageSquare size={13} className={c.id === activeId ? 'text-brand-600' : 'text-ink-300'} />
              <p className="truncate text-sm font-medium text-ink-900">{c.title}</p>
            </div>
            <p className="mt-0.5 truncate text-xs text-ink-500">{formatRelativeTime(c.updatedAt)}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
