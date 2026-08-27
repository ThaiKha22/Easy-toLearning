import { useState } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function CreateSubjectModal({ open, onClose, onCreate }) {
  const [form, setForm] = useState({ name: '', description: '', examDate: '', dailyTime: '30' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = {};
    if (!form.name) nextErrors.name = 'Subject name is required.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    onCreate?.(form);
    setForm({ name: '', description: '', examDate: '', dailyTime: '30' });
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="Create Subject">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Input label="Name" placeholder="e.g. Linear Algebra" value={form.name} onChange={(e) => update('name', e.target.value)} error={errors.name} />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            rows={3}
            placeholder="What is this subject about?"
            className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-brand-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input label="Exam date" type="date" value={form.examDate} onChange={(e) => update('examDate', e.target.value)} />
          <Input label="Daily study time (min)" type="number" min="5" value={form.dailyTime} onChange={(e) => update('dailyTime', e.target.value)} />
        </div>
        <Button type="submit" fullWidth loading={loading}>Create Subject</Button>
      </form>
    </Modal>
  );
}
