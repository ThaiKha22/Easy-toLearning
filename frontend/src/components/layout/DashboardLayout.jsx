import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import Header from './Header';

const TITLES = [
  { test: (p) => p === '/dashboard', title: 'Dashboard' },
  { test: (p) => p === '/subjects', title: 'My Subjects' },
  { test: (p) => /^\/subjects\/[^/]+\/documents$/.test(p), title: 'Documents' },
  { test: (p) => /^\/subjects\/[^/]+$/.test(p), title: 'Subject' },
  { test: (p) => /^\/documents\//.test(p), title: 'Study Material' },
  { test: (p) => p === '/flashcards', title: 'Flashcards' },
  { test: (p) => p === '/quizzes', title: 'Quizzes' },
  { test: (p) => /^\/quizzes\//.test(p), title: 'Quiz' },
  { test: (p) => /^\/quiz-results\//.test(p), title: 'Quiz Results' },
  { test: (p) => p === '/ai-tutor', title: 'AI Tutor' },
  { test: (p) => p === '/study-plan', title: 'Study Plan' },
  { test: (p) => p === '/analytics', title: 'Analytics' },
  { test: (p) => p === '/profile', title: 'Profile & Settings' },
  { test: (p) => p === '/help', title: 'Help' },
];

function useTitle() {
  const { pathname } = useLocation();
  return TITLES.find((t) => t.test(pathname))?.title || 'AI StudyHub';
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
