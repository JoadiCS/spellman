const ContentList = ({ items = [], onSelect, activeId }) => (
  <div className="space-y-2">
    {items.map((item) => (
      <button
        key={item.id}
        type="button"
        className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${
          activeId === item.id ? 'border-primary-500 bg-primary-50 text-primary-900' : 'border-neutral-200'
        }`}
        onClick={() => onSelect(item)}
      >
        <p className="font-semibold">{item.title || item.projectTitle || item.goalTitle || 'Untitled'}</p>
        <p className="text-xs text-neutral-500">{item.section}</p>
      </button>
    ))}
    {!items.length ? <p className="text-sm text-neutral-500">No content yet.</p> : null}
  </div>
);

export default ContentList;
