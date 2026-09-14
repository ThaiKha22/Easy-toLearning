import i18n from '../i18n';

export function formatRelativeTime(isoString) {
  const now = new Date('2026-08-23T09:00:00Z');
  const then = new Date(isoString);
  const diffMs = now - then;
  const diffMins = Math.round(diffMs / 60000);
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.round(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return then.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function formatFileSize(kb) {
  if (kb < 1024) return `${kb} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export function formatMinutes(mins) {
  if (mins < 60) return `${mins} ${i18n.t('common.minute')}`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m
    ? `${h} ${i18n.t('common.hour')} ${m} ${i18n.t('common.minute')}`
    : `${h} ${i18n.t('common.hour')}`;
}

export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export function daysUntil(isoDate) {
  const now = new Date('2026-08-23T00:00:00Z');
  const target = new Date(isoDate);
  return Math.max(0, Math.ceil((target - now) / 86400000));
}
