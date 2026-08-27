import { useEffect, useState } from 'react';
import { dashboardService } from '../services/api';
import { currentUser } from '../data/mockData';
import StatsGrid from '../components/dashboard/StatsGrid';
import ContinueLearning from '../components/dashboard/ContinueLearning';
import TodayPlanCard from '../components/dashboard/TodayPlanCard';
import WeakTopicsCard from '../components/dashboard/WeakTopicsCard';
import RecentActivity from '../components/dashboard/RecentActivity';
import AIRecommendationCard from '../components/dashboard/AIRecommendationCard';
import DashboardSkeleton from '../components/dashboard/DashboardSkeleton';
import ErrorState from '../components/ui/ErrorState';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    setError(false);
    dashboardService
      .getOverview()
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  const firstName = currentUser.name.split(' ')[0];
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  if (loading) return <DashboardSkeleton />;
  if (error || !data) return <ErrorState onRetry={load} />;

  return (
    <div className="space-y-5 lg:space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-[1.7rem]">
          {greeting}, {firstName} 👋
        </h2>
        <p className="mt-1 text-sm text-ink-500 sm:text-base">Ready to continue learning?</p>
      </div>

      <StatsGrid stats={data.stats} />

      <AIRecommendationCard topic="Congestion Control" minutes={20} subjectId="sub-networks" />

      <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
        <div className="space-y-5 lg:col-span-2 lg:space-y-6">
          <ContinueLearning subjects={data.subjects} />
          <RecentActivity activity={data.recentActivity} />
        </div>
        <div className="space-y-5 lg:space-y-6">
          <TodayPlanCard plan={data.todayPlan} />
          <WeakTopicsCard topics={data.weakTopics} />
        </div>
      </div>
    </div>
  );
}
