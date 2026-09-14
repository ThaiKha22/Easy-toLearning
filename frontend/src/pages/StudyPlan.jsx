import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, CalendarClock } from 'lucide-react';
import { studyPlanService, subjectService } from '../services/api';
import { daysUntil } from '../utils/format';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { MasteryRing } from '../components/ui/Progress';
import Skeleton from '../components/ui/Skeleton';
import ErrorState from '../components/ui/ErrorState';
import DayPlanCard from '../components/study-plan/DayPlanCard';
import RebuildPlanModal from '../components/study-plan/RebuildPlanModal';
import { useToast } from '../components/ui/Toast';

export default function StudyPlan() {
  const { t } = useTranslation();
  const [weeklyPlan, setWeeklyPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const { showToast } = useToast();

  function load() {
    setLoading(true);
    setError(false);
    studyPlanService.getWeeklyPlan().then(setWeeklyPlan).catch(() => setError(true)).finally(() => setLoading(false));
  }
  useEffect(load, []);
  useEffect(() => { subjectService.listSubjects().then(setSubjects).catch(() => {}); }, []);

  const exam = subjects[0] || { name: 'môn học', examDate: null };
  const days = exam.examDate ? daysUntil(exam.examDate) : 0;
  const overallProgress = weeklyPlan.length ? Math.round(weeklyPlan.reduce((total, day) => total + day.tasks.filter((task) => task.done).length, 0) / Math.max(1, weeklyPlan.reduce((total, day) => total + day.tasks.length, 0)) * 100) : 0;

  if (loading) return <Skeleton className="h-96 rounded-2xl" />;
  if (error) return <ErrorState onRetry={load} />;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-900">{t('content.studyPlan')}</h2>
          <p className="mt-1 text-sm text-ink-500">{t('content.tailored', { subject: exam.name })}</p>
        </div>
        <Button icon={Sparkles} onClick={() => setModalOpen(true)}>{t('content.rebuild')}</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card padding="p-5" className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-spark-50 text-spark-600">
            <CalendarClock size={22} />
          </div>
          <div>
            <p className="font-display text-2xl font-bold text-ink-900">{days} {t('dashboard.days')}</p>
            <p className="text-sm text-ink-500">{t('content.untilExam', { subject: exam.name })}</p>
          </div>
        </Card>
        <Card padding="p-5" className="flex items-center gap-4">
          <MasteryRing value={overallProgress} size={56} strokeWidth={6} />
          <div>
            <p className="text-sm font-medium text-ink-900">{t('content.overallProgress')}</p>
            <p className="text-xs text-ink-500">{t('content.activeSubjects')}</p>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="mb-3 font-display text-base font-semibold text-ink-900">{t('content.thisWeek')}</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {weeklyPlan.map((d) => (
            <DayPlanCard
              key={d.date}
              day={d.day}
              planId={d.planId}
              tasks={d.tasks}
              isToday={d.date === new Date().toISOString().slice(0, 10)}
            />
          ))}
        </div>
      </div>

      <RebuildPlanModal open={modalOpen} onClose={() => setModalOpen(false)} onRebuild={() => showToast('Your study plan has been rebuilt', 'success')} />
    </div>
  );
}
