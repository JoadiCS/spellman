import { useState } from 'react';
import Button from '../ui/button.jsx';
import Input from '../ui/input.jsx';
import Textarea from '../ui/textarea.jsx';
import useContent from '../../hooks/useContent.js';
import { useToast } from '../../context/ToastContext.jsx';
import { isEmail } from '../../utils/validators.js';

const JoinSection = () => {
  const { data = [] } = useContent('join');
  const join = data[0] || {};
  const { addToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isEmail(form.email)) {
      addToast({ title: 'Enter a valid email' });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addToast({ title: 'Message sent', description: 'We will reply within 2 business days.' });
      setForm({ name: '', email: '', message: '' });
    }, 800);
  };

  return (
    <section id="join" className="bg-neutral-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-primary-600">Join</p>
          <h2 className="mt-4 text-4xl font-bold text-neutral-900">{join.title || 'Join the movement.'}</h2>
          <p className="mt-4 text-neutral-600">{join.description || 'Partner with us to accelerate climate justice across the globe.'}</p>
          <div className="mt-6 flex gap-4">
            <Button>{join.buttonText || 'Volunteer'}</Button>
            <Button variant="secondary">Donate</Button>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-2xl">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
            <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <Textarea
              name="message"
              rows="4"
              placeholder="How would you like to collaborate?"
              value={form.message}
              onChange={handleChange}
              required
            />
            <Button type="submit" disabled={loading} className={loading ? 'opacity-70' : ''}>
              {loading ? 'Sending…' : 'Send Message'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
