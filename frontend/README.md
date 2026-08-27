# AI StudyHub — Frontend

A modern, responsive frontend for an AI-powered learning platform, built with React + Vite + Tailwind CSS v4 + React Router + Recharts + Lucide icons.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## What's included

- Full route map: landing, auth (login/register/forgot password), dashboard, subjects,
  subject detail, documents, document detail, flashcards, quizzes, quiz taking, quiz
  results, AI tutor, study plan, analytics, and profile/settings.
- Reusable UI kit in `src/components/ui` (Button, Input, Card, Badge, Progress/MasteryRing,
  Avatar, Modal, Dropdown, Skeleton, EmptyState, ErrorState, Toast, ConfirmDialog, Switch, TabBar).
- Mock data in `src/data/mockData.js` and a promise-based mock service layer in
  `src/services/api.js` — designed as a drop-in replacement point for a real
  Node.js + Express + MongoDB backend and the Gemini API later. Swap the function
  bodies in `api.js` for real `fetch()` calls; nothing else needs to change.
- Fully responsive: sidebar collapses to a mobile drawer, tables become cards on
  mobile, the AI tutor's side panels become drawers, quizzes get a sticky bottom
  nav on mobile, and flashcards are optimized for one-handed use.
- Loading, empty, and error states throughout; toast notifications; confirmation
  dialogs for destructive actions.

## Design system

Custom palette (teal "brand" + amber "spark" + violet accent) defined as Tailwind v4
`@theme` tokens in `src/index.css`, with Lexend for display type and Inter for body
text. The recurring **mastery ring** (circular progress) and the gradient **AI-edge**
border are the product's signature visual devices, used consistently for progress,
quiz scores, topic mastery, and AI-generated content.

## Next steps (backend integration)

Replace the bodies of the functions in `src/services/api.js` with real calls to your
Express API. The mock data shapes in `src/data/mockData.js` mirror what the real API
responses are expected to look like, so pages and components should not need changes.
