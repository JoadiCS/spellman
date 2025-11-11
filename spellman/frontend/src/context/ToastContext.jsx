import { createContext, useContext, useState } from 'react';

const ToastContext = createContext({ addToast: () => {}, removeToast: () => {} });

const generateId = () =>
  typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : Date.now().toString();

const ToastViewport = ({ toasts, removeToast }) => (
  <div className="fixed bottom-6 right-6 z-[120] flex flex-col gap-3">
    {toasts.map((toast) => (
      <div
        key={toast.id}
        className="rounded-lg bg-neutral-900/90 px-5 py-4 text-white shadow-xl shadow-black/30"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold">{toast.title}</p>
            {toast.description ? (
              <p className="text-sm text-neutral-200">{toast.description}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="text-xs uppercase tracking-wide text-neutral-300"
          >
            Close
          </button>
        </div>
      </div>
    ))}
  </div>
);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = (id) => setToasts((prev) => prev.filter((toast) => toast.id !== id));

  const addToast = ({ title, description, duration = 4000 }) => {
    const id = generateId();
    setToasts((prev) => [...prev, { id, title, description }]);
    if (duration) {
      setTimeout(() => removeToast(id), duration);
    }
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastViewport toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
