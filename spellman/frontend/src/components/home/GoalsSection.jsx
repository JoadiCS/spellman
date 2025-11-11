import { useState } from 'react';
import useContent from '../../hooks/useContent.js';
import { classNames } from '../../utils/helpers.js';

const GoalsSection = () => {
  const { data = [] } = useContent('goals');
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="goals" className="bg-neutral-900 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm uppercase tracking-[0.3em] text-primary-300">Goals</p>
        <h2 className="mt-4 text-4xl font-bold">Our next milestones.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {data.map((goal) => {
            const open = expanded === goal.id;
            return (
              <article
                key={goal.id}
                onMouseEnter={() => setExpanded(goal.id)}
                onMouseLeave={() => setExpanded(null)}
                className={classNames(
                  'relative overflow-hidden rounded-3xl border border-white/10 p-6 transition',
                  open ? 'bg-white/10' : 'bg-white/5'
                )}
              >
                {goal.imageUrl ? (
                  <img
                    src={goal.imageUrl}
                    alt={goal.goalTitle}
                    className={classNames(
                      'absolute inset-0 h-full w-full object-cover opacity-0 transition',
                      open ? 'opacity-20' : 'opacity-0'
                    )}
                  />
                ) : null}
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-semibold">{goal.goalTitle}</h3>
                    <span className="text-2xl">{open ? '−' : '+'}</span>
                  </div>
                  <p className="mt-2 text-sm text-white/80">{goal.shortDescription}</p>
                  <div
                    className={classNames(
                      'mt-4 text-sm text-white/90 transition-all duration-300',
                      open ? 'max-h-40 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
                    )}
                  >
                    {goal.longDescription}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GoalsSection;
