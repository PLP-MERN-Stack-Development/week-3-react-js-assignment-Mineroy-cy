import Navbar from './Navbar';
import Footer from './footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen transition-colors duration-300 bg-white text-black dark:bg-gray-900 dark:text-white">
      <Navbar />
      <main className="px-4 py-10 max-w-4xl mx-auto">
        <div className="p-6 rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
