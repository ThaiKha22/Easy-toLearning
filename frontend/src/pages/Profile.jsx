import { useState } from 'react';
import { Camera, Sun, Moon, Monitor } from 'lucide-react';
import { currentUser } from '../data/mockData';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import Switch from '../components/ui/Switch';
import { useToast } from '../components/ui/Toast';

function Section({ title, description, children }) {
  return (
    <Card padding="p-5 sm:p-6">
      <h3 className="font-display text-base font-semibold text-ink-900">{title}</h3>
      {description && <p className="mt-1 text-sm text-ink-500">{description}</p>}
      <div className="mt-5 space-y-4">{children}</div>
    </Card>
  );
}

const themes = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'system', label: 'System', icon: Monitor },
];

export default function Profile() {
  const [form, setForm] = useState({ name: currentUser.name, email: currentUser.email, bio: currentUser.bio });
  const [prefs, setPrefs] = useState({
    dailyGoal: currentUser.dailyGoalMinutes,
    studyTime: currentUser.preferredStudyTime,
    difficulty: currentUser.difficultyPreference,
    language: currentUser.language,
  });
  const [notifications, setNotifications] = useState(currentUser.notifications);
  const [theme, setTheme] = useState(currentUser.theme);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    setSaving(false);
    showToast('Profile updated', 'success');
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <Section title="Profile">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar name={form.name} size="xl" />
            <button aria-label="Change avatar" className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-surface bg-brand-600 text-white hover:bg-brand-700">
              <Camera size={13} />
            </button>
          </div>
          <div>
            <p className="text-sm font-medium text-ink-900">{form.name}</p>
            <p className="text-xs text-ink-500">JPG or PNG, max 2MB</p>
          </div>
        </div>
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">Bio</label>
            <textarea
              rows={3}
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-brand-500"
            />
          </div>
          <Button type="submit" loading={saving}>Save Changes</Button>
        </form>
      </Section>

      <Section title="Learning Preferences">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Daily study goal (min)" type="number" value={prefs.dailyGoal} onChange={(e) => setPrefs((p) => ({ ...p, dailyGoal: e.target.value }))} />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">Preferred study time</label>
            <select
              value={prefs.studyTime}
              onChange={(e) => setPrefs((p) => ({ ...p, studyTime: e.target.value }))}
              className="h-11 w-full rounded-xl border border-line bg-surface px-3.5 text-sm outline-none focus:border-brand-500"
            >
              {['Morning', 'Afternoon', 'Evening', 'Night'].map((v) => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">Difficulty preference</label>
            <select
              value={prefs.difficulty}
              onChange={(e) => setPrefs((p) => ({ ...p, difficulty: e.target.value }))}
              className="h-11 w-full rounded-xl border border-line bg-surface px-3.5 text-sm outline-none focus:border-brand-500"
            >
              {['Easy', 'Adaptive', 'Hard'].map((v) => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">Language</label>
            <select
              value={prefs.language}
              onChange={(e) => setPrefs((p) => ({ ...p, language: e.target.value }))}
              className="h-11 w-full rounded-xl border border-line bg-surface px-3.5 text-sm outline-none focus:border-brand-500"
            >
              {['English', 'Spanish', 'French', 'Vietnamese'].map((v) => <option key={v}>{v}</option>)}
            </select>
          </div>
        </div>
      </Section>

      <Section title="Notifications">
        {[
          { key: 'studyReminders', label: 'Study reminders', desc: 'Daily nudges to keep your streak going' },
          { key: 'quizReminders', label: 'Quiz reminders', desc: 'Reminders to retake quizzes you\u2019re due for' },
          { key: 'aiRecommendations', label: 'AI recommendations', desc: 'Personalized session suggestions' },
          { key: 'weeklyReports', label: 'Weekly reports', desc: 'A summary of your progress every Sunday' },
        ].map(({ key, label, desc }) => (
          <div key={key} className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-ink-900">{label}</p>
              <p className="text-xs text-ink-500">{desc}</p>
            </div>
            <Switch checked={notifications[key]} onChange={(v) => setNotifications((n) => ({ ...n, [key]: v }))} label={label} />
          </div>
        ))}
      </Section>

      <Section title="Appearance">
        <div className="grid grid-cols-3 gap-2.5">
          {themes.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTheme(id)}
              className={`flex flex-col items-center gap-2 rounded-xl border py-4 text-sm font-medium transition-colors ${
                theme === id ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-line text-ink-700 hover:bg-surface-alt'
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>
      </Section>
    </div>
  );
}
