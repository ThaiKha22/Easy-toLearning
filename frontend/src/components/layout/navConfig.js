import {
  LayoutDashboard, BookOpen, Layers, ListChecks, Sparkles, CalendarClock, BarChart3, Settings, HelpCircle,
} from 'lucide-react';

export const primaryNav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/subjects', label: 'My Subjects', icon: BookOpen },
  { to: '/flashcards', label: 'Flashcards', icon: Layers },
  { to: '/quizzes', label: 'Quizzes', icon: ListChecks },
  { to: '/ai-tutor', label: 'AI Tutor', icon: Sparkles },
  { to: '/study-plan', label: 'Study Plan', icon: CalendarClock },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
];

export const secondaryNav = [
  { to: '/profile', label: 'Settings', icon: Settings },
  { to: '/help', label: 'Help', icon: HelpCircle },
];
