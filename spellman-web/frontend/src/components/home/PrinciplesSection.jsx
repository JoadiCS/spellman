import { useMemo } from 'react';
import useContent from '../../hooks/useContent.js';

const PrinciplesSection = () => {
  const { data = [] } = useContent('principles');
  const principles = useMemo(() => {
    if (!data.length) return [];
    return data.length > 4 ? [...data, ...data] : data;
  }, [data]);

  return (
    <section id="principles" className="relative overflow-hidden bg-neutral-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900 opacity-80" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <p className="text-sm uppercase tracking-[0.3em] text-primary-300">Principles</p>
        <h2 className="mt-4 text-4xl font-bold md:text-5xl">Our principles guide every campaign.</h2>
      </div>
      <div className="relative mt-10 flex overflow-hidden">
        <div className="flex min-w-full gap-6" style={{ animation: 'scroll 30s linear infinite' }}>
          {principles.map((item, index) => (
            <article
              key={`${item.id}-${index}`}
              className="relative h-64 w-80 shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl"
            >
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.statTitle} className="absolute inset-0 h-full w-full object-cover opacity-30" />
              ) : null}
              <div className="relative z-10 flex h-full flex-col justify-between">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">{item.title || 'Principle'}</p>
                <div>
                  <h3 className="text-3xl font-semibold">{item.statTitle || 'Center Communities'} </h3>
                  <p className="text-sm text-white/80">
                    {item.statDescription || 'Every action must start with the people most impacted.'}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default PrinciplesSection;
