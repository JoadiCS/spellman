import { useEffect, useMemo, useState } from 'react';
import SectionEditor from '../components/admin/SectionEditor.jsx';
import ContentList from '../components/admin/ContentList.jsx';
import TodoList from '../components/admin/TodoList.jsx';
import AdminOpsPanel from '../components/admin/AdminOpsPanel.jsx';
import Button from '../components/ui/button.jsx';
import Input from '../components/ui/input.jsx';
import useContent from '../hooks/useContent.js';
import Spinner from '../components/ui/spinner.jsx';
import { sections } from '../utils/constants.js';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [activeItem, setActiveItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { data = [], isLoading, refetch } = useContent();

  const sectionItems = useMemo(
    () => data.filter((item) => item.section === activeSection).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)),
    [data, activeSection]
  );
  const filteredItems = useMemo(
    () =>
      sectionItems.filter((item) => {
        const term = searchTerm.toLowerCase();
        if (!term) return true;
        const fields = [item.title, item.projectTitle, item.goalTitle, item.statTitle, item.description];
        return fields.some((value) => value?.toLowerCase().includes(term));
      }),
    [sectionItems, searchTerm]
  );

  const sectionCounts = useMemo(
    () =>
      sections.reduce((acc, section) => {
        acc[section] = data.filter((item) => item.section === section).length;
        return acc;
      }, {}),
    [data]
  );

  useEffect(() => {
    setActiveItem(sectionItems[0] || null);
    setSearchTerm('');
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
      <header className="border-b border-white/10 bg-neutral-950/80 px-10 py-6 backdrop-blur">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary-300">Control Center</p>
            <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
            <p className="text-sm text-white/70">Plan, edit, and publish every section in one place.</p>
          </div>
          <Button onClick={() => setActiveItem({ section: activeSection })} className="w-full max-w-xs lg:w-auto">
            + Create {activeSection}
          </Button>
        </div>
      </header>
      <div className="px-10 pt-6">
        <TodoList />
      </div>
      <div className="grid gap-4 px-10 pt-6 lg:grid-cols-3">
        {sections.map((section) => (
          <div
            key={section}
            className={`rounded-2xl border px-5 py-4 transition ${
              activeSection === section ? 'border-primary-400 bg-primary-500/10' : 'border-white/10 bg-white/5'
            }`}
          >
            <div className="flex items-center justify-between text-sm uppercase tracking-[0.3em] text-white/60">
              <span>{section}</span>
              <span>{sectionCounts[section] || 0}</span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-lg font-semibold text-white">
                {sectionCounts[section] || 0} {sectionCounts[section] === 1 ? 'entry' : 'entries'}
              </p>
              <Button
                variant="secondary"
                className="border border-white/20 bg-transparent text-sm"
                onClick={() => setActiveSection(section)}
              >
                Manage
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="px-10 pt-6">
        <AdminOpsPanel />
      </div>
      <div className="grid gap-10 px-10 py-10 xl:grid-cols-[240px_300px_1fr]">
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
        </aside>
        <section className="rounded-3xl bg-white/5 p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Current Section</p>
              <h2 className="text-lg font-semibold capitalize">{activeSection}</h2>
            </div>
            <Input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search content…"
              className="bg-white/10 text-white placeholder:text-white/60 sm:max-w-xs"
            />
          </div>
          <div className="mt-4 max-h-[60vh] overflow-auto pr-2">
            <ContentList items={filteredItems} activeId={activeItem?.id} onSelect={setActiveItem} />
          </div>
          {!filteredItems.length ? (
            <p className="mt-4 text-sm text-white/50">No entries match your filters yet.</p>
          ) : null}
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
