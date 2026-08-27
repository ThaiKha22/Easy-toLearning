import { useEffect, useState } from 'react';
import { Sparkles, CalendarClock } from 'lucide-react';
import { studyPlanService } from '../services/api';
import { subjects } from '../data/mockData';
import { daysUntil } from '../utils/format';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { ProgressBar, MasteryRing } from '../components/ui/Progress';
import Skeleton from '../components/ui/Skeleton';
import ErrorState from '../components/ui/ErrorState';
import DayPlanCard from '../components/study-plan/DayPlanCard';
import RebuildPlanModal from '../components/study-plan/RebuildPlanModal';
import { useToast } from '../components/ui/Toast';

export default function StudyPlan() {
  const [weeklyPlan, setWeeklyPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { showToast } = useToast();

  function load() {
    setLoading(true);
    setError(false);
    studyPlanService.getWeeklyPlan().then(setWeeklyPlan).catch(() => setError(true)).finally(() => setLoading(false));
  }
  useEffect(load, []);

  const exam = subjects[0];
  const days = daysUntil(exam.examDate);
  const overallProgress = 58;

  if (loading) return <Skeleton className="h-96 rounded-2xl" />;
  if (error) return <ErrorState onRetry={load} />;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-900">Your Study Plan</h2>
          <p className="mt-1 text-sm text-ink-500">Tailored to {exam.name}</p>
        </div>
        <Button icon={Sparkles} onClick={() => setModalOpen(true)}>Ask AI to Rebuild Plan</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card padding="p-5" className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-spark-50 text-spark-600">
            <CalendarClock size={22} />
          </div>
          <div>
            <p className="font-display text-2xl font-bold text-ink-900">{days} days</p>
            <p className="text-sm text-ink-500">until your {exam.name} exam</p>
          </div>
        </Card>
        <Card padding="p-5" className="flex items-center gap-4">
          <MasteryRing value={overallProgress} size={56} strokeWidth={6} />
          <div>
            <p className="text-sm font-medium text-ink-900">Overall Progress</p>
            <p className="text-xs text-ink-500">Across all active subjects</p>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="mb-3 font-display text-base font-semibold text-ink-900">This Week</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {weeklyPlan.map((d, i) => <DayPlanCard key={d.day} day={d.day} tasks={d.tasks} isToday={i === 5} />)}
        </div>
      </div>

      <RebuildPlanModal open={modalOpen} onClose={() => setModalOpen(false)} onRebuild={() => showToast('Your study plan has been rebuilt', 'success')} />
    </div>
  );
}
