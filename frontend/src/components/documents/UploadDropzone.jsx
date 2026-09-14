import { useCallback, useRef, useState } from 'react';
import { UploadCloud, FileText, X, Sparkles } from 'lucide-react';
import { ProgressBar } from '../ui/Progress';
import { documentService } from '../../services/api';
import { useTranslation } from 'react-i18next';

export default function UploadDropzone({ subjectId, onComplete }) {
  const { t } = useTranslation();
  const stages = [t('documents.upload'), t('documents.processing'), t('documents.generating')];
  const [dragOver, setDragOver] = useState(false);
  const [jobs, setJobs] = useState([]); // { id, name, stageIndex, progress }
  const inputRef = useRef(null);

  const startUpload = useCallback((files) => {
    const newJobs = Array.from(files).map((f) => ({
      id: `${f.name}-${Date.now()}-${Math.random()}`,
      name: f.name,
      file: f,
      stageIndex: 0,
      progress: 0,
    }));
    setJobs((j) => [...newJobs, ...j]);

    newJobs.forEach((job) => uploadJob(job));
  }, [subjectId]);

  async function uploadJob(job) {
    try {
      setJobs((js) => js.map((item) => (item.id === job.id ? { ...item, progress: 35 } : item)));
      await documentService.upload(job.file, subjectId, job.name);
      setJobs((js) => js.map((item) => (item.id === job.id ? { ...item, stageIndex: 2, progress: 100 } : item)));
      onComplete?.();
    } catch {
      setJobs((js) => js.map((item) => (item.id === job.id ? { ...item, stageIndex: 0, progress: 0, error: true } : item)));
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) startUpload(e.dataTransfer.files);
  }

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-colors ${
          dragOver ? 'border-brand-500 bg-brand-50/50' : 'border-line hover:border-brand-300 hover:bg-surface-alt/40'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.txt"
          className="hidden"
          onChange={(e) => e.target.files?.length && startUpload(e.target.files)}
        />
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <UploadCloud size={26} />
        </div>
        <p className="mt-4 text-sm font-medium text-ink-900">{t('documents.drop')}</p>
        <p className="mt-1 text-xs text-ink-500">{t('documents.supports')}</p>
      </div>

      {jobs.length > 0 && (
        <div className="space-y-3">
          {jobs.map((job) => (
            <div key={job.id} className="ai-edge flex items-center gap-3.5 p-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-alt text-ink-500">
                {job.stageIndex === 2 ? <Sparkles size={16} className="text-violet-600" /> : <FileText size={16} />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium text-ink-900">{job.name}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); setJobs((js) => js.filter((j) => j.id !== job.id)); }}
                    className="text-ink-300 hover:text-ink-500"
                    aria-label="Cancel upload"
                  >
                    <X size={14} />
                  </button>
                </div>
                <p className="mt-0.5 text-xs text-ink-500">{stages[job.stageIndex]}</p>
                <ProgressBar value={job.progress} color={job.stageIndex === 2 ? 'violet' : 'brand'} className="mt-2" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
