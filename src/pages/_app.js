// src/pages/_app.js
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@material-tailwind/react'; // Fournisseur de thème
import { UserProvider } from "../context/UserContext";
import '@/styles/globals.css'; // Import des styles globaux
//import "@fortawesome/fontawesome-free/css/all.min.css";


export default function App({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(savedMode === 'true');
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  return (
    <UserProvider> {/* Fournisseur d'utilisateur */}
      <ThemeProvider>
        <button
          className="fixed top-5 right-5 p-2 bg-gray-200 dark:bg-gray-800 rounded-full"
          onClick={() => setDarkMode((prevMode) => !prevMode)}
        >
          {darkMode ? '🌞' : '🌙'}
        </button>
        <Component {...pageProps} />
      </ThemeProvider>
    </UserProvider>
  );
}
