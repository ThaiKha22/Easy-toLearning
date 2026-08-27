import { useEffect, useState } from 'react';
import { Plus, BookOpen } from 'lucide-react';
import { subjectService } from '../services/api';
import SubjectCard from '../components/subjects/SubjectCard';
import CreateSubjectModal from '../components/subjects/CreateSubjectModal';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import { SkeletonGrid } from '../components/ui/Skeleton';
import { useToast } from '../components/ui/Toast';

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { showToast } = useToast();

  function load() {
    setLoading(true);
    setError(false);
    subjectService.listSubjects().then(setSubjects).catch(() => setError(true)).finally(() => setLoading(false));
  }

  useEffect(load, []);

  function handleCreate(form) {
    setSubjects((s) => [
      { id: `sub-${Date.now()}`, name: form.name, description: form.description || 'No description yet.', color: 'brand', progress: 0, documents: 0, flashcards: 0, quizzes: 0, lastStudied: new Date().toISOString(), examDate: form.examDate },
      ...s,
    ]);
    showToast(`"${form.name}" created`, 'success');
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-500">{subjects.length} subjects</p>
        <Button icon={Plus} onClick={() => setModalOpen(true)}>Create Subject</Button>
      </div>

      {loading && <SkeletonGrid />}
      {!loading && error && <ErrorState onRetry={load} />}
      {!loading && !error && subjects.length === 0 && (
        <EmptyState
          icon={BookOpen}
          title="No subjects yet"
          description="Create a subject to start organizing your documents, flashcards and quizzes."
          action={<Button icon={Plus} onClick={() => setModalOpen(true)}>Create Subject</Button>}
        />
      )}
      {!loading && !error && subjects.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {subjects.map((s) => <SubjectCard key={s.id} subject={s} />)}
        </div>
      )}

      <CreateSubjectModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={handleCreate} />
    </div>
  );
}
