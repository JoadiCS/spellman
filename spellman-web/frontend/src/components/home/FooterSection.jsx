import { Link } from 'react-router-dom';
import useContent from '../../hooks/useContent.js';
import useAuth from '../../hooks/useAuth.js';

const FooterSection = () => {
  const { data = [] } = useContent('footer');
  const footer = data[0] || {};
  const { user } = useAuth();

  return (
    <footer id="footer" className="bg-neutral-900 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-4">
        <div>
          <h3 className="text-xl font-semibold">{footer.orgName || 'Spellman Impact Network'}</h3>
          <p className="mt-4 text-sm text-white/70">{footer.address || '123 Greenway Blvd, Portland, OR'}</p>
          <p className="mt-2 text-sm text-white/70">{footer.email || 'hello@spellman.earth'}</p>
          <p className="text-sm text-white/70">{footer.phone || '+1 (555) 010-8899'}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em]">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li><a href="#principles">Principles</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#goals">Roadmap</a></li>
            <li><a href="#join">Join</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em]">Connect</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>Instagram</li>
            <li>LinkedIn</li>
            <li>Twitter</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em]">Newsletter</h4>
          <p className="mt-4 text-sm text-white/70">Receive monthly action kits and field reports.</p>
          <form className="mt-4 flex gap-2">
            <input
              type="email"
              placeholder="Email"
              className="flex-1 rounded-full px-4 py-2 text-sm text-neutral-900"
            />
            <button type="submit" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-900">
              {footer.newsletterButtonText || 'Join'}
            </button>
          </form>
          <Link
            to={user?.role === 'admin' ? '/admin' : '/login'}
            className="mt-4 inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            {user?.role === 'admin' ? 'Admin Dashboard' : 'Admin Login'}
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Spellman Impact Network. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterSection;
