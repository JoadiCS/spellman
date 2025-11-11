import { useState } from 'react';
import { motion } from 'framer-motion';

const links = [
  { label: 'Our Mission', href: '#hero' },
  { label: 'Projects', href: '#projects' },
  { label: 'Roadmap', href: '#goals' }
];

const NavigationBar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-x-0 top-0 z-50 bg-black/20 backdrop-blur-2xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#hero" className="text-lg font-semibold tracking-tight text-white">
          Spellman
        </a>
        <nav className="hidden items-center gap-6 text-sm text-white/80 md:flex">
          {links.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => scrollTo(link.href)}
              className="transition hover:text-white"
            >
              {link.label}
            </button>
          ))}
          <a
            href="#join"
            className="inline-flex items-center rounded-full bg-primary-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary-600"
          >
            Get Involved
          </a>
        </nav>
        <button
          type="button"
          className="md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="text-white">☰</span>
        </button>
      </div>
      {open ? (
        <div className="border-t border-white/10 bg-neutral-900/95 px-6 py-4 md:hidden">
          {links.map((link) => (
            <button
              key={link.href}
              type="button"
              className="block w-full py-2 text-left text-white/80"
              onClick={() => scrollTo(link.href)}
            >
              {link.label}
            </button>
          ))}
        </div>
      ) : null}
    </motion.header>
  );
};

export default NavigationBar;
