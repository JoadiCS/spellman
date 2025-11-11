import { Link } from 'react-router-dom';
import Button from '../components/ui/button.jsx';

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 text-white">
    <p className="text-sm uppercase tracking-[0.3em] text-primary-300">404</p>
    <h1 className="mt-4 text-4xl font-bold">Page not found</h1>
    <p className="mt-2 text-white/70">The page you are looking for has moved.</p>
    <Link to="/" className="mt-8">
      <Button>Go home</Button>
    </Link>
  </div>
);

export default NotFound;
