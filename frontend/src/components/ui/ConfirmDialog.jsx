import Modal from './Modal';
import Button from './Button';
import { useState } from 'react';

export default function ConfirmDialog({ open, onClose, onConfirm, title = 'Are you sure?', description, confirmLabel = 'Confirm', danger = true }) {
  const [loading, setLoading] = useState(false);

  async function confirm() {
    setLoading(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button variant={danger ? 'danger' : 'primary'} loading={loading} disabled={loading} onClick={confirm}>{confirmLabel}</Button>
        </>
      }
    >
      <p className="text-sm text-ink-500">{description}</p>
    </Modal>
  );
}
