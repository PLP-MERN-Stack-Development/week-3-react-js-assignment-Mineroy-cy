export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-center text-sm text-gray-500 p-4 mt-8">
      &copy; {new Date().getFullYear()} My React App
    </footer>
  );
}
