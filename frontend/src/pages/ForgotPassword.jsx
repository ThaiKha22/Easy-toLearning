import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle2, ArrowLeft } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { authService } from '../services/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authService.requestPasswordReset(email);
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <AuthLayout title="Check your inbox">
        <div className="rounded-2xl border border-line-soft bg-surface-alt/60 p-5 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-success-50 text-success">
            <CheckCircle2 size={24} />
          </div>
          <p className="text-sm text-ink-700">
            If an account exists for <span className="font-medium text-ink-900">{email}</span>, we’ve sent a link to reset your password.
          </p>
        </div>
        <Link to="/login" className="mt-5 flex items-center justify-center gap-1.5 text-sm font-medium text-brand-600 hover:underline">
          <ArrowLeft size={15} /> Back to log in
        </Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Reset your password" subtitle="Enter your email and we’ll send you a reset link.">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Input label="Email" type="email" icon={Mail} placeholder="you@school.edu" value={email} onChange={(e) => setEmail(e.target.value)} error={error} />
        <Button type="submit" fullWidth loading={loading}>Send reset link</Button>
        <Link to="/login" className="flex items-center justify-center gap-1.5 text-sm font-medium text-brand-600 hover:underline">
          <ArrowLeft size={15} /> Back to log in
        </Link>
      </form>
    </AuthLayout>
  );
}
