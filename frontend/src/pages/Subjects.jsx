import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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

  async function handleCreate(form) {
    try {
      const subject = await subjectService.createSubject({
        name: form.name,
        description: form.description,
        examDate: form.examDate || null,
        dailyStudyTime: Number(form.dailyTime),
      });
      setSubjects((s) => [subject, ...s]);
      showToast(`"${form.name}" đã được tạo`, 'success');
    } catch (error) {
      showToast(error.message, 'error');
      throw error;
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-500">{t('content.subjectsCount', { count: subjects.length })}</p>
        <Button icon={Plus} onClick={() => setModalOpen(true)}>{t('content.createSubject')}</Button>
      </div>

      {loading && <SkeletonGrid />}
      {!loading && error && <ErrorState onRetry={load} />}
      {!loading && !error && subjects.length === 0 && (
        <EmptyState
          icon={BookOpen}
          title={t('content.noSubjects')}
          description={t('content.noSubjectsDescription')}
          action={<Button icon={Plus} onClick={() => setModalOpen(true)}>{t('content.createSubject')}</Button>}
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
