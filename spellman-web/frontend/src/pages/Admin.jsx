import { useEffect, useMemo, useState } from 'react';
import SectionEditor from '../components/admin/SectionEditor.jsx';
import ContentList from '../components/admin/ContentList.jsx';
import Button from '../components/ui/button.jsx';
import useContent from '../hooks/useContent.js';
import Spinner from '../components/ui/spinner.jsx';
import { sections } from '../utils/constants.js';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [activeItem, setActiveItem] = useState(null);
  const { data = [], isLoading, refetch } = useContent();

  const sectionItems = useMemo(
    () => data.filter((item) => item.section === activeSection).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)),
    [data, activeSection]
  );

  useEffect(() => {
    setActiveItem(sectionItems[0] || null);
  }, [sectionItems]);

  const handleSaved = async () => {
    await refetch();
  };

  const handleDeleted = async () => {
    setActiveItem(null);
    await refetch();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-white">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-white/10 px-10 py-6">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <p className="text-sm text-white/70">Manage all sections from one place.</p>
      </header>
      <div className="grid gap-10 px-10 py-10 lg:grid-cols-[260px_1fr_1.2fr]">
        <aside className="space-y-2">
          {sections.map((section) => (
            <button
              key={section}
              type="button"
              onClick={() => setActiveSection(section)}
              className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide transition ${
                activeSection === section ? 'bg-white text-neutral-900' : 'bg-white/10 text-white/70'
              }`}
            >
              {section}
            </button>
          ))}
          <Button
            variant="secondary"
            className="w-full border border-white/10 bg-transparent text-white"
            onClick={() => setActiveItem({ section: activeSection })}
          >
            + New
          </Button>
        </aside>
        <section className="rounded-3xl bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Content List</h2>
          <ContentList items={sectionItems} activeId={activeItem?.id} onSelect={setActiveItem} />
        </section>
        <section className="rounded-3xl bg-white p-6 text-neutral-900">
          <h2 className="text-lg font-semibold capitalize">{activeSection} Editor</h2>
          <SectionEditor
            section={activeSection}
            item={activeItem}
            onSaved={handleSaved}
            onDeleted={handleDeleted}
          />
        </section>
      </div>
    </div>
  );
};

export default Admin;
