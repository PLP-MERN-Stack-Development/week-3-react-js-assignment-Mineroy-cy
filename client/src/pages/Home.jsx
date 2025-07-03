import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function Home() {
  return (
    <div className="text-center space-y-6 max-w-xl mx-auto py-20">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white">React Task Manager</h1>
      <p className="text-gray-600 dark:text-gray-300">
        Manage your tasks efficiently in a clean, minimal interface.
      </p>
      <div className="flex justify-center gap-6">
        <Link to="/tasks"><Button>Open Task Manager</Button></Link>
      </div>
    </div>
  );
}
