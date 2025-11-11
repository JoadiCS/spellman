const Toast = ({ title, description }) => (
  <div className="rounded-xl bg-neutral-900/90 px-4 py-3 text-white shadow-lg">
    <p className="text-sm font-semibold">{title}</p>
    {description ? <p className="text-xs text-neutral-200">{description}</p> : null}
  </div>
);

export default Toast;
