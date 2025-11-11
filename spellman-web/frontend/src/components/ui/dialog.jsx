const Dialog = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
          <button type="button" onClick={onClose} className="text-neutral-500 hover:text-neutral-900">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
