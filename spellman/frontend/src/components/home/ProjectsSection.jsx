import useContent from '../../hooks/useContent.js';
import { classNames } from '../../utils/helpers.js';

const ProjectsSection = () => {
  const { data = [] } = useContent('projects');

  return (
    <section id="projects" className="bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm uppercase tracking-[0.3em] text-primary-600">Projects</p>
        <h2 className="mt-4 text-4xl font-bold text-neutral-900">Projects that move policy and people.</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.map((project) => (
            <article
              key={project.id}
              className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xl transition hover:-translate-y-2"
            >
              {project.projectImageUrl ? (
                <img
                  src={project.projectImageUrl}
                  alt={project.projectTitle}
                  className="h-56 w-full object-cover transition duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="h-56 w-full bg-neutral-100" />
              )}
              <div className="relative p-6">
                <div
                  className={classNames(
                    'mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold',
                    project.color && !project.color.startsWith('#') ? project.color : 'bg-primary-50 text-primary-700'
                  )}
                  style={project.color?.startsWith('#') ? { backgroundColor: project.color, color: '#0f172a' } : undefined}
                >
                  <span>{project.title || 'Community Climate Lab'}</span>
                </div>
                <h3 className="text-2xl font-semibold text-neutral-900">{project.projectTitle}</h3>
                <p className="mt-2 text-sm text-neutral-600">{project.projectDescription}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
