const Select = ({ className = '', children, ...props }) => (
  <select
    className={`w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 ${className}`}
    {...props}
  >
    {children}
  </select>
);

export default Select;
