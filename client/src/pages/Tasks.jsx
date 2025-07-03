import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../components/Button';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks')
      .then(res => setTasks(res.data))
      .catch(() => setError('Failed to load tasks'))
      .finally(() => setLoading(false));
  }, []);

  const addTask = async () => {
    if (!text.trim()) return;
    const res = await axios.post('http://localhost:5000/api/tasks', { text });
    setTasks([...tasks, res.data]);
    setText('');
  };

  const toggle = async (id) => {
    const res = await axios.patch(`http://localhost:5000/api/tasks/${id}`);
    setTasks(tasks.map(t => (t._id === id ? res.data : t)));
  };

  const remove = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  const filtered = {
    all: tasks,
    active: tasks.filter(t => !t.completed),
    completed: tasks.filter(t => t.completed),
  }[filter];

  if (loading) return <p className="text-center py-20 text-lg">Loading tasks...</p>;
  if (error) return <p className="text-center text-red-500 py-20">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">Task Manager</h1>

      <div className="flex items-center gap-3 mb-6">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="What do you need to do?"
          className="flex-grow p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
        <Button onClick={addTask} className="px-4 py-2">Add</Button>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <Button variant={filter === 'all' ? 'primary' : 'secondary'} onClick={() => setFilter('all')}>All</Button>
        <Button variant={filter === 'active' ? 'primary' : 'secondary'} onClick={() => setFilter('active')}>Active</Button>
        <Button variant={filter === 'completed' ? 'primary' : 'secondary'} onClick={() => setFilter('completed')}>Completed</Button>
      </div>

      <ul className="space-y-3">
        {filtered.length === 0 && (
          <li className="text-center text-gray-500 dark:text-gray-400">No tasks to display.</li>
        )}
        {filtered.map(task => (
          <li
         key={task._id}
         className="flex justify-between items-center bg-white/20 backdrop-blur-lg dark:bg-black/20 px-4 py-3 rounded-lg shadow-lg hover:shadow-xl transition"
         >

            <span
              onClick={() => toggle(task._id)}
              className={`cursor-pointer text-base font-medium transition ${
                task.completed ? 'line-through text-gray-400' : 'text-gray-800 dark:text-white'
              }`}
            >
              {task.text}
            </span>
            <Button variant="danger" onClick={() => remove(task._id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}