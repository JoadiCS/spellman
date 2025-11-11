import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/ui/input.jsx';
import Button from '../components/ui/button.jsx';
import useAuth from '../hooks/useAuth.js';
import { useToast } from '../context/ToastContext.jsx';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await login(form);
      addToast({ title: 'Welcome back' });
      navigate('/admin');
    } catch (error) {
      addToast({ title: 'Login failed', description: error.response?.data?.message || error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 py-10">
      <form className="w-full max-w-md space-y-6 rounded-3xl bg-white p-8 shadow-2xl" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold text-neutral-900">Admin Login</h1>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-neutral-600">Email</label>
          <Input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-neutral-600">Password</label>
          <Input type="password" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Signing in…' : 'Login'}
        </Button>
      </form>
    </div>
  );
};

export default Login;
