import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { useTheme } from '../context/theme-context';

export default function Navbar() {
  const { darkMode, toggle } = useTheme();

  return (
    <nav className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 flex justify-between items-center">
      <div className="space-x-4">
        <NavLink to="/" className={({ isActive }) => isActive ? 'font-bold' : ''}>Home</NavLink>
        <NavLink to="/tasks" className={({ isActive }) => isActive ? 'font-bold' : ''}>Tasks</NavLink>
        
      </div>
     <button
  onClick={toggle}
  className="px-3 py-1 rounded-md text-sm font-medium shadow-sm bg-gradient-to-r from-indigo-400 to-purple-500 text-white hover:opacity-90 transition"
>
  {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
</button>

    </nav>
  );
}
