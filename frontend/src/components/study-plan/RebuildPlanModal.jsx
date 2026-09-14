import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useTranslation } from 'react-i18next';

const difficulties = ['Easy', 'Adaptive', 'Hard'];

export default function RebuildPlanModal({ open, onClose, onRebuild }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({ examDate: '2026-09-19', dailyTime: '45', targetScore: '85', difficulty: 'Adaptive' });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    onRebuild?.();
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title={t('plan.rebuildTitle')}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label={t('plan.examDate')} type="date" value={form.examDate} onChange={(e) => setForm((f) => ({ ...f, examDate: e.target.value }))} />
        <Input label={t('plan.dailyTime')} type="number" value={form.dailyTime} onChange={(e) => setForm((f) => ({ ...f, dailyTime: e.target.value }))} />
        <Input label={t('plan.targetScore')} type="number" value={form.targetScore} onChange={(e) => setForm((f) => ({ ...f, targetScore: e.target.value }))} />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">{t('plan.difficulty')}</label>
          <div className="flex gap-2">
            {difficulties.map((d) => (
              <button
                type="button"
                key={d}
                onClick={() => setForm((f) => ({ ...f, difficulty: d }))}
                className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                  form.difficulty === d ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-line text-ink-700 hover:bg-surface-alt'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
        <Button type="submit" fullWidth loading={loading} icon={Sparkles}>{t('plan.rebuild')}</Button>
      </form>
    </Modal>
  );
}
