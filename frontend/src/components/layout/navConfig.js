import {
  LayoutDashboard, BookOpen, Layers, ListChecks, CalendarClock, BarChart3, Settings, HelpCircle,
} from 'lucide-react';

export const primaryNav = [
  { to: '/dashboard', labelKey: 'nav.dashboard', icon: LayoutDashboard },
  { to: '/subjects', labelKey: 'nav.subjects', icon: BookOpen },
  { to: '/flashcards', labelKey: 'nav.flashcards', icon: Layers },
  { to: '/quizzes', labelKey: 'nav.quizzes', icon: ListChecks },
  { to: '/study-plan', labelKey: 'nav.studyPlan', icon: CalendarClock },
  { to: '/analytics', labelKey: 'nav.analytics', icon: BarChart3 },
];

export const secondaryNav = [
  { to: '/profile', labelKey: 'nav.settings', icon: Settings },
  { to: '/help', labelKey: 'nav.help', icon: HelpCircle },
];
