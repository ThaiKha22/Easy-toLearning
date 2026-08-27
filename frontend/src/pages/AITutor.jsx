import { useEffect, useRef, useState } from 'react';
import { Send, Paperclip, Mic, PanelLeftOpen, SlidersHorizontal, X } from 'lucide-react';
import { aiTutorService } from '../services/api';
import { suggestedPrompts } from '../data/mockData';
import ConversationHistory from '../components/ai-tutor/ConversationHistory';
import StudyContextPanel from '../components/ai-tutor/StudyContextPanel';
import ChatMessage from '../components/ai-tutor/ChatMessage';
import AIThinking from '../components/ai-tutor/AIThinking';
import Card from '../components/ui/Card';

export default function AITutor() {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [contextOpen, setContextOpen] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    aiTutorService.listConversations().then((convs) => {
      setConversations(convs);
      setActiveId(convs[0]?.id);
    });
    aiTutorService.getMessages().then(setMessages);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, thinking]);

  async function sendMessage(text) {
    if (!text.trim()) return;
    const userMsg = { id: `u-${Date.now()}`, role: 'user', content: text, time: new Date().toISOString() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setThinking(true);
    const reply = await aiTutorService.sendMessage(text);
    setThinking(false);
    setMessages((m) => [...m, reply]);
  }

  function handleNewChat() {
    setMessages([]);
    setActiveId(null);
    setHistoryOpen(false);
  }

  return (
    <div className="-m-4 flex h-[calc(100vh-4rem)] sm:-m-6 lg:-m-7 lg:h-[calc(100vh-4rem)]">
      {/* Desktop: conversation history */}
      <div className="hidden w-64 shrink-0 border-r border-line-soft bg-surface lg:block">
        <ConversationHistory conversations={conversations} activeId={activeId} onSelect={setActiveId} onNew={handleNewChat} />
      </div>

      {/* Mobile history drawer */}
      {historyOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink-900/40" onClick={() => setHistoryOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 bg-surface shadow-2xl">
            <div className="flex items-center justify-between border-b border-line-soft p-3">
              <span className="pl-1 text-sm font-semibold text-ink-900">Conversations</span>
              <button onClick={() => setHistoryOpen(false)} className="rounded-lg p-1.5 text-ink-500 hover:bg-surface-alt"><X size={18} /></button>
            </div>
            <ConversationHistory conversations={conversations} activeId={activeId} onSelect={(id) => { setActiveId(id); setHistoryOpen(false); }} onNew={handleNewChat} />
          </div>
        </div>
      )}

      {/* Center chat */}
      <div className="flex min-w-0 flex-1 flex-col bg-paper">
        <div className="flex items-center gap-2 border-b border-line-soft bg-surface px-4 py-3 lg:hidden">
          <button onClick={() => setHistoryOpen(true)} aria-label="Open history" className="rounded-lg p-2 text-ink-700 hover:bg-surface-alt">
            <PanelLeftOpen size={19} />
          </button>
          <span className="flex-1 truncate text-sm font-semibold text-ink-900">AI Tutor</span>
          <button onClick={() => setContextOpen(true)} aria-label="Open study context" className="rounded-lg p-2 text-ink-700 hover:bg-surface-alt">
            <SlidersHorizontal size={18} />
          </button>
        </div>

        <div ref={scrollRef} className="thin-scroll flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-6">
          {messages.map((m) => (
            <ChatMessage key={m.id} message={m} onRegenerate={() => sendMessage('Regenerate: ' + m.content.slice(0, 20))} />
          ))}
          {thinking && <AIThinking />}
        </div>

        <div className="border-t border-line-soft bg-surface p-3 sm:p-4">
          <div className="mx-auto flex max-w-3xl flex-wrap gap-2 pb-2.5">
            {suggestedPrompts.map((p) => (
              <button
                key={p}
                onClick={() => sendMessage(p)}
                className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink-700 hover:border-brand-300 hover:bg-brand-50/50"
              >
                {p}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
            className="mx-auto flex max-w-3xl items-center gap-2 rounded-2xl border border-line bg-surface-alt/40 px-3 py-2"
          >
            <button type="button" aria-label="Attach document" className="rounded-lg p-2 text-ink-500 hover:bg-surface-alt">
              <Paperclip size={18} />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your study materials..."
              aria-label="Message AI tutor"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-ink-300"
            />
            <button type="button" aria-label="Voice input" className="rounded-lg p-2 text-ink-500 hover:bg-surface-alt">
              <Mic size={18} />
            </button>
            <button
              type="submit"
              aria-label="Send message"
              disabled={!input.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white transition-transform hover:bg-brand-700 disabled:opacity-40 active:scale-95"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Desktop context panel */}
      <div className="hidden w-72 shrink-0 border-l border-line-soft bg-surface xl:block">
        <StudyContextPanel />
      </div>

      {/* Mobile context drawer */}
      {contextOpen && (
        <div className="fixed inset-0 z-40 xl:hidden">
          <div className="absolute inset-0 bg-ink-900/40" onClick={() => setContextOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-surface shadow-2xl">
            <div className="flex items-center justify-between border-b border-line-soft p-3">
              <span className="pl-1 text-sm font-semibold text-ink-900">Study Context</span>
              <button onClick={() => setContextOpen(false)} className="rounded-lg p-1.5 text-ink-500 hover:bg-surface-alt"><X size={18} /></button>
            </div>
            <StudyContextPanel />
          </div>
        </div>
      )}
    </div>
  );
}
