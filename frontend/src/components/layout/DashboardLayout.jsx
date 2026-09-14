import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import Header from './Header';

const TITLES = [
  { test: (p) => p === '/dashboard', titleKey: 'nav.dashboard' },
  { test: (p) => p === '/subjects', titleKey: 'nav.subjects' },
  { test: (p) => /^\/subjects\/[^/]+\/documents$/.test(p), titleKey: 'page.documents' },
  { test: (p) => /^\/subjects\/[^/]+$/.test(p), titleKey: 'page.subject' },
  { test: (p) => /^\/documents\//.test(p), titleKey: 'page.studyMaterial' },
  { test: (p) => p === '/flashcards', titleKey: 'nav.flashcards' },
  { test: (p) => p === '/quizzes', titleKey: 'nav.quizzes' },
  { test: (p) => /^\/quizzes\//.test(p), titleKey: 'page.quiz' },
  { test: (p) => /^\/quiz-results\//.test(p), titleKey: 'page.quizResults' },
  { test: (p) => p === '/study-plan', titleKey: 'nav.studyPlan' },
  { test: (p) => p === '/analytics', titleKey: 'nav.analytics' },
  { test: (p) => p === '/profile', titleKey: 'page.profile' },
  { test: (p) => p === '/help', titleKey: 'nav.help' },
];

function useTitle() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const titleKey = TITLES.find((item) => item.test(pathname))?.titleKey;
  return titleKey ? t(titleKey) : 'AI StudyHub';
}

export default function DashboardLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const title = useTitle();

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar />
      <MobileSidebar open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header title={title} onMenuClick={() => setDrawerOpen(true)} />
        <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
