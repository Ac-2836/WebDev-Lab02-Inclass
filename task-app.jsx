import { createElement } from './mini-react.js';
import { filterTasks } from './filter-tasks.js';
import { useState } from './reactive-engine.js';

const FILTERS = Object.freeze(['ALL', 'ACTIVE', 'DONE']);

export function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const visibleTasks = filterTasks(tasks, filter);

  const addTask = () => {
    const nextTask = {
      id: crypto.randomUUID(),
      title: `Task ${tasks.length + 1}`,
      done: false,
    };

    setTasks((previousTasks) => [...previousTasks, nextTask]);
  };

  const toggleTask = (taskId) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task,
      ),
    );
  };

  return (
    <main className="task-app">
      <header>
        <h1>Task Manager</h1>
        <p>{tasks.length} total tasks</p>
        <button type="button" onClick={addTask}>
          Add Task
        </button>
      </header>
      <nav aria-label="Filter tasks">
        {FILTERS.map((taskFilter) => (
          <button
            type="button"
            aria-pressed={filter === taskFilter}
            onClick={() => setFilter(taskFilter)}
          >
            {taskFilter}
          </button>
        ))}
      </nav>
      <ul>
        {visibleTasks.map((task) => (
          <li>
            <span>{task.title}</span>
            <button
              type="button"
              aria-pressed={task.done}
              onClick={() => toggleTask(task.id)}
            >
              {task.done ? 'Mark active' : 'Mark done'}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
