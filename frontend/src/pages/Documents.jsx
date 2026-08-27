import { useEffect, useState } from 'react';
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

  function handleDelete() {
    setDocuments((docs) => docs.filter((d) => d.id !== deleteId));
    showToast('Document deleted', 'success');
    setDeleteId(null);
  }

  if (loading) return <Skeleton className="h-72 rounded-2xl" />;
  if (error) return <ErrorState onRetry={load} />;

  return (
    <div className="space-y-5">
      <Link to={`/subjects/${id}`} className="flex items-center gap-1 text-sm font-medium text-ink-500 hover:text-ink-900">
        <ChevronLeft size={16} /> {subject?.name}
      </Link>
      <h2 className="font-display text-xl font-bold text-ink-900">Documents</h2>

      <UploadDropzone onComplete={() => showToast('Document ready', 'success')} />

      {documents.length === 0 ? (
        <EmptyState icon={FileText} title="No documents yet" description="Upload your first document to start learning." />
      ) : (
        <DocumentList documents={documents} onDelete={setDeleteId} />
      )}

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete document?"
        description="This will permanently remove the document and any AI-generated materials created from it."
        confirmLabel="Delete"
      />
    </div>
  );
}
