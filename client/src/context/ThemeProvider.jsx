import { useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { ThemeContext } from './theme-context';

export default function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useLocalStorage('theme', false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggle: () => setDarkMode(!darkMode) }}>
      {children}
    </ThemeContext.Provider>
  );
}
