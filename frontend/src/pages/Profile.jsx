import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Camera, Sun, Moon, Monitor } from 'lucide-react';
import { userService } from '../services/api';
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
  { id: 'light', labelKey: 'profile.light', icon: Sun },
  { id: 'dark', labelKey: 'profile.dark', icon: Moon },
  { id: 'system', labelKey: 'profile.system', icon: Monitor },
];

export default function Profile() {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', bio: '' });
  const [prefs, setPrefs] = useState({
    dailyGoal: 60,
    studyTime: 'Evening',
    difficulty: 'Medium',
    language: 'Vietnamese',
  });
  const [notifications, setNotifications] = useState({
    studyReminders: true,
    quizReminders: true,
    aiRecommendations: true,
    weeklyReports: true,
  });
  const [theme, setTheme] = useState('system');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    userService.getCurrentUser()
      .then((user) => {
        const learning = user.learningPreferences || {};
        setForm({ name: user.fullName || '', email: user.email || '', bio: user.bio || '' });
        setPrefs({
          dailyGoal: learning.dailyStudyGoal ?? 60,
          studyTime: `${learning.preferredStudyTime || 'evening'}`.replace(/^./, (char) => char.toUpperCase()),
          difficulty: `${learning.difficulty || 'medium'}`.replace(/^./, (char) => char.toUpperCase()),
          language: learning.language === 'vi' ? 'Vietnamese' : 'English',
        });
        setNotifications(user.notificationSettings || {});
        setTheme(user.appearance?.theme || 'system');
      })
      .catch((error) => showToast(error.message, 'error'))
      .finally(() => setLoading(false));
  }, [i18n, showToast]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches));
  }, [theme]);

  async function handleSave(e) {
    e?.preventDefault();
    setSaving(true);
    try {
      await Promise.all([
        userService.updateProfile({ fullName: form.name, bio: form.bio }),
        userService.updatePreferences({
          dailyStudyGoal: Number(prefs.dailyGoal),
          preferredStudyTime: prefs.studyTime.toLowerCase(),
          difficulty: prefs.difficulty.toLowerCase(),
          language: prefs.language === 'Vietnamese' ? 'vi' : 'en',
        }),
        userService.updateNotifications(notifications),
        userService.updateAppearance({ theme }),
      ]);
      showToast(t('profile.updated'), 'success');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="text-sm text-ink-500">{t('profile.loading')}</div>;

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <Section title={t('profile.title')}>
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
          <Input label={t('profile.name')} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          <Input label={t('profile.email')} type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">{t('profile.bio')}</label>
            <textarea
              rows={3}
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-brand-500"
            />
          </div>
          <Button type="submit" loading={saving}>{t('profile.save')}</Button>
        </form>
      </Section>

      <Section title={t('profile.learningPreferences')}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label={t('profile.dailyGoal')} type="number" value={prefs.dailyGoal} onChange={(e) => setPrefs((p) => ({ ...p, dailyGoal: e.target.value }))} />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">{t('profile.studyTime')}</label>
            <select
              value={prefs.studyTime}
              onChange={(e) => setPrefs((p) => ({ ...p, studyTime: e.target.value }))}
              className="h-11 w-full rounded-xl border border-line bg-surface px-3.5 text-sm outline-none focus:border-brand-500"
            >
              {['Morning', 'Afternoon', 'Evening', 'Night'].map((v) => <option key={v} value={v}>{t(`profile.${v.toLowerCase()}`)}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">{t('profile.difficulty')}</label>
            <select
              value={prefs.difficulty}
              onChange={(e) => setPrefs((p) => ({ ...p, difficulty: e.target.value }))}
              className="h-11 w-full rounded-xl border border-line bg-surface px-3.5 text-sm outline-none focus:border-brand-500"
            >
              {['Easy', 'Medium', 'Hard'].map((v) => <option key={v} value={v}>{t(`profile.${v.toLowerCase()}`)}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">{t('profile.language')}</label>
            <select
              value={prefs.language}
              onChange={(e) => {
                const language = e.target.value;
                setPrefs((p) => ({ ...p, language }));
                const code = language === 'Vietnamese' ? 'vi' : 'en';
                i18n.changeLanguage(code);
                localStorage.setItem('studyhub_language', code);
              }}
              className="h-11 w-full rounded-xl border border-line bg-surface px-3.5 text-sm outline-none focus:border-brand-500"
            >
              {['English', 'Vietnamese'].map((v) => <option key={v} value={v}>{t(`profile.${v === 'English' ? 'english' : 'vietnamese'}`)}</option>)}
            </select>
          </div>
        </div>
      </Section>

      <Section title={t('profile.notifications')}>
        {[
          { key: 'studyReminders', labelKey: 'profile.studyReminders', descKey: 'profile.studyRemindersDesc' },
          { key: 'quizReminders', labelKey: 'profile.quizReminders', descKey: 'profile.quizRemindersDesc' },
          { key: 'aiRecommendations', labelKey: 'profile.aiRecommendations', descKey: 'profile.aiRecommendationsDesc' },
          { key: 'weeklyReports', labelKey: 'profile.weeklyReports', descKey: 'profile.weeklyReportsDesc' },
        ].map(({ key, labelKey, descKey }) => (
          <div key={key} className="flex min-w-0 items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink-900">{t(labelKey)}</p>
              <p className="break-words text-xs text-ink-500">{t(descKey)}</p>
            </div>
            <Switch checked={notifications[key] ?? false} onChange={(v) => setNotifications((n) => ({ ...n, [key]: v }))} label={t(labelKey)} />
          </div>
        ))}
      </Section>

      <Section title={t('profile.appearance')}>
        <div className="grid grid-cols-3 gap-2.5">
          {themes.map(({ id, labelKey, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTheme(id)}
              className={`flex flex-col items-center gap-2 rounded-xl border py-4 text-sm font-medium transition-colors ${
                theme === id ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-line text-ink-700 hover:bg-surface-alt'
              }`}
            >
              <Icon size={18} />
              {t(labelKey)}
            </button>
          ))}
        </div>
      </Section>

      <div className="flex justify-end">
        <Button type="button" loading={saving} onClick={handleSave}>{t('profile.save')}</Button>
      </div>
    </div>
  );
}
