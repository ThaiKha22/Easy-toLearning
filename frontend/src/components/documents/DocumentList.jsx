import { Link } from 'react-router-dom';
import { FileText, BookOpen, MoreVertical, Download, Trash2, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import Badge from '../ui/Badge';
import Dropdown from '../ui/Dropdown';
import { formatFileSize, formatRelativeTime } from '../../utils/format';

const statusConfig = {
  uploaded: { label: 'Uploaded', variant: 'neutral', icon: FileText },
  processing: { label: 'Processing', variant: 'spark', icon: Loader2, spin: true },
  ready: { label: 'Ready', variant: 'success', icon: CheckCircle2 },
  error: { label: 'Error', variant: 'danger', icon: AlertCircle },
};

export default function DocumentList({ documents, onDelete }) {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-line-soft bg-surface sm:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line-soft bg-surface-alt/50 text-left text-xs font-medium uppercase tracking-wide text-ink-500">
              <th className="px-4 py-3">Document</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Size</th>
              <th className="px-4 py-3">Uploaded</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => {
              const status = statusConfig[doc.status] || statusConfig.processing;
              return (
                <tr key={doc.id} className="border-b border-line-soft last:border-0 hover:bg-surface-alt/40">
                  <td className="px-4 py-3">
                    <Link to={`/documents/${doc.id}`} className="flex items-center gap-2.5 font-medium text-ink-900 hover:text-brand-600">
                      <FileText size={16} className="shrink-0 text-ink-300" />
                      <span className="truncate">{doc.title}</span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 uppercase text-ink-500">{doc.type}</td>
                  <td className="px-4 py-3 text-ink-500">{formatFileSize(doc.sizeKb)}</td>
                  <td className="px-4 py-3 text-ink-500">{formatRelativeTime(doc.uploadedAt)}</td>
                  <td className="px-4 py-3">
                    <Badge variant={status.variant} icon={status.icon} className={status.spin ? '[&>svg]:animate-spin' : ''}>
                      {status.label}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        to={`/documents/${doc.id}`}
                        aria-label="Open study material"
                        title="Open study material"
                        className="flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-brand-50 px-2.5 py-1.5 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-100"
                      >
                        <BookOpen size={16} />
                        <span>Tạo bài học</span>
                      </Link>
                      <button
                        type="button"
                        aria-label="Delete document"
                        title="Delete document"
                        onClick={() => onDelete?.(doc.id)}
                        className="rounded-lg p-1.5 text-ink-500 transition-colors hover:bg-danger-50 hover:text-danger"
                      >
                        <Trash2 size={16} />
                      </button>

                      <Dropdown
                        trigger={<span className="rounded-lg p-1.5 text-ink-500 hover:bg-surface-alt"><MoreVertical size={16} /></span>}
                        items={[
                          { label: 'Download', icon: Download },
                          { label: 'Delete', icon: Trash2, danger: true, onClick: () => onDelete?.(doc.id) },
                        ]}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 sm:hidden">
        {documents.map((doc) => {
          const status = statusConfig[doc.status] || statusConfig.processing;
          return (
            <div key={doc.id} className="rounded-2xl border border-line-soft bg-surface p-4">
              <div className="flex items-start justify-between gap-2">
                <Link to={`/documents/${doc.id}`} className="flex min-w-0 items-center gap-2.5">
                  <FileText size={16} className="shrink-0 text-ink-300" />
                  <span className="truncate text-sm font-medium text-ink-900">{doc.title}</span>
                </Link>

                <div className="flex items-center gap-1">
                  <Link
                    to={`/documents/${doc.id}`}
                    aria-label="Open study material"
                    title="Open study material"
                    className="flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-brand-50 px-2.5 py-1.5 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-100"
                  >
                    <BookOpen size={16} />
                    <span>Tạo bài học</span>
                  </Link>
                  <button
                    type="button"
                    aria-label="Delete document"
                    title="Delete document"
                    onClick={() => onDelete?.(doc.id)}
                    className="rounded-lg p-1.5 text-ink-500 transition-colors hover:bg-danger-50 hover:text-danger"
                  >
                    <Trash2 size={16} />
                  </button>

                  <Dropdown
                    trigger={<span className="rounded-lg p-1 text-ink-500"><MoreVertical size={16} /></span>}
                    items={[
                      { label: 'Download', icon: Download },
                      { label: 'Delete', icon: Trash2, danger: true, onClick: () => onDelete?.(doc.id) },
                    ]}
                  />
                </div>
              </div>
              <div className="mt-2.5 flex items-center justify-between">
                <span className="text-xs text-ink-500">{doc.type.toUpperCase()} · {formatFileSize(doc.sizeKb)} · {formatRelativeTime(doc.uploadedAt)}</span>
                <Badge variant={status.variant} icon={status.icon} className={status.spin ? '[&>svg]:animate-spin' : ''}>{status.label}</Badge>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
