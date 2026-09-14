import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, FileText } from 'lucide-react';
import { subjectService, documentService } from '../services/api';
import UploadDropzone from '../components/documents/UploadDropzone';
import DocumentList from '../components/documents/DocumentList';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import Skeleton from '../components/ui/Skeleton';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { useToast } from '../components/ui/Toast';

export default function Documents() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { showToast } = useToast();

  function load() {
    setLoading(true);
    setError(false);
    Promise.all([subjectService.getSubject(id), documentService.listDocuments(id)])
      .then(([s, docs]) => { setSubject(s); setDocuments(docs); })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }

  useEffect(load, [id]);

  function requestDelete(id) {
    setDeleteId(id);
  }

  async function handleDelete(id) {
    try {
      await documentService.deleteDocument(id);
      setDocuments((docs) => docs.filter((d) => d.id !== id));
      showToast('Đã xóa tài liệu', 'success');
      setDeleteId(null);
    } catch (error) {
      showToast(error.message, 'error');
      throw error;
    }
  }

  if (loading) return <Skeleton className="h-72 rounded-2xl" />;
  if (error) return <ErrorState onRetry={load} />;

  return (
    <div className="space-y-5">
      <Link to={`/subjects/${id}`} className="flex items-center gap-1 text-sm font-medium text-ink-500 hover:text-ink-900">
        <ChevronLeft size={16} /> {subject?.name}
      </Link>
      <h2 className="font-display text-xl font-bold text-ink-900">{t('content.documents')}</h2>

      <UploadDropzone subjectId={id} onComplete={() => { showToast('Document ready', 'success'); load(); }} />

      {documents.length === 0 ? (
        <EmptyState icon={FileText} title={t('content.noDocuments')} description={t('content.uploadFirst')} />
      ) : (
        <DocumentList documents={documents} onDelete={requestDelete} />
      )}

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => handleDelete(deleteId)}
        title={t('content.deleteDocument')}
        description={t('content.deleteDescription')}
        confirmLabel={t('content.delete')}
      />
    </div>
  );
}
