export const Tabs = ({ tabs = [], active, onChange }) => (
  <div className="flex flex-wrap gap-2">
    {tabs.map((tab) => (
      <button
        key={tab.value}
        type="button"
        onClick={() => onChange(tab.value)}
        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
          active === tab.value ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600'
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>
);
