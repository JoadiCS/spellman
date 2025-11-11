import { useEffect, useState } from 'react';
import Button from '../ui/button.jsx';
import Input from '../ui/input.jsx';

const STORAGE_KEY = 'spellman_admin_todos';

const TodoList = () => {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to load tasks', error);
      return [];
    }
  });
  const [text, setText] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to persist tasks', error);
    }
  }, [tasks]);

  const addTask = (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), label: text.trim(), completed: false, createdAt: Date.now() }
    ]);
    setText('');
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  return (
    <section className="rounded-3xl bg-white/5 p-6 text-white shadow-lg shadow-black/20 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary-300">Workflow</p>
          <h2 className="text-xl font-semibold">Admin To-do List</h2>
        </div>
        {tasks.some((task) => task.completed) ? (
          <Button variant="secondary" onClick={clearCompleted} className="border border-white/20">
            Clear Completed
          </Button>
        ) : null}
      </div>
      <form onSubmit={addTask} className="mt-4 flex gap-3">
        <Input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Add a task…"
          className="bg-white/10 text-white placeholder:text-white/60"
        />
        <Button type="submit" disabled={!text.trim()}>
          Add
        </Button>
      </form>
      <ul className="mt-4 space-y-3">
        {!tasks.length ? (
          <li className="text-sm text-white/60">Nothing queued up. Add your next action.</li>
        ) : (
          tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <label className="flex flex-1 cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-4 w-4 rounded border-white/30 bg-transparent text-primary-500 focus:ring-primary-500"
                />
                <span className={`text-sm ${task.completed ? 'text-white/40 line-through' : 'text-white'}`}>
                  {task.label}
                </span>
              </label>
              <span className="text-xs uppercase tracking-wide text-white/40">
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))
        )}
      </ul>
    </section>
  );
};

export default TodoList;
