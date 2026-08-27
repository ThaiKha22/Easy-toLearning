import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { authService } from '../services/api';
import { useToast } from '../components/ui/Toast';

export default function Register() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = {};
    if (!form.fullName) nextErrors.fullName = 'Full name is required.';
    if (!form.email) nextErrors.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Enter a valid email address.';
    if (!form.password) nextErrors.password = 'Password is required.';
    else if (form.password.length < 8) nextErrors.password = 'Use at least 8 characters.';
    if (form.confirmPassword !== form.password) nextErrors.confirmPassword = 'Passwords do not match.';
    if (!terms) nextErrors.terms = 'You must accept the terms to continue.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    try {
      await authService.register(form);
      showToast('Account created — welcome to AI StudyHub!', 'success');
      navigate('/dashboard');
    } catch (err) {
      setErrors({ form: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Create your account" subtitle="Start turning your notes into a personalized study plan.">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {errors.form && (
          <div className="rounded-xl border border-danger-50 bg-danger-50 px-3.5 py-2.5 text-sm text-danger">{errors.form}</div>
        )}
        <Input label="Full name" icon={User} placeholder="Alex Rivera" value={form.fullName} onChange={(e) => update('fullName', e.target.value)} error={errors.fullName} />
        <Input label="Email" type="email" icon={Mail} placeholder="you@school.edu" value={form.email} onChange={(e) => update('email', e.target.value)} error={errors.email} />
        <Input label="Password" type="password" icon={Lock} placeholder="At least 8 characters" value={form.password} onChange={(e) => update('password', e.target.value)} error={errors.password} hint={!errors.password ? 'Use 8+ characters with a mix of letters and numbers.' : undefined} />
        <Input label="Confirm password" type="password" icon={Lock} placeholder="Re-enter your password" value={form.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)} error={errors.confirmPassword} />

        <div>
          <label className="flex items-start gap-2 text-sm text-ink-700">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-line text-brand-600 focus:ring-brand-500"
            />
            <span>
              I agree to the{' '}
              <a href="#" className="font-medium text-brand-600 hover:underline">Terms of Service</a> and{' '}
              <a href="#" className="font-medium text-brand-600 hover:underline">Privacy Policy</a>.
            </span>
          </label>
          {errors.terms && <p className="mt-1.5 text-xs text-danger">{errors.terms}</p>}
        </div>

        <Button type="submit" fullWidth loading={loading}>
          Create account
        </Button>
        <p className="text-center text-sm text-ink-500">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-brand-600 hover:underline">Log in</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
