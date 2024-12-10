// src/pages/_app.js
import { useEffect, useState } from "react";
import { ThemeProvider as TailwindThemeProvider } from "@material-tailwind/react"; // Fournisseur de thème Tailwind
import { UserProvider } from "../context/UserContext";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles"; // Fournisseur de thème MUI
import CssBaseline from "@mui/material/CssBaseline"; // Réinitialisation des styles de MUI
import "@/styles/globals.css"; // Import des styles globaux

export default function App({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false);

  // Gestion du mode sombre
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setDarkMode(savedMode === "true");
    } else {
      setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  // Thème personnalisé MUI
  const muiTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#1976d2", // Couleur primaire
      },
      secondary: {
        main: "#dc004e", // Couleur secondaire
      },
    },
  });

  return (
    <UserProvider>
      {/* Fournisseur de thème MUI */}
      <MuiThemeProvider theme={muiTheme}>
        {/* Fournisseur de thème Tailwind */}
        <TailwindThemeProvider>
          {/* Réinitialisation des styles globaux */}
          <CssBaseline />
          <button
            className="fixed top-5 right-5 p-2 bg-gray-200 dark:bg-gray-800 rounded-full"
            onClick={() => setDarkMode((prevMode) => !prevMode)}
          >
            {darkMode ? "🌞" : "🌙"}
          </button>
          <Component {...pageProps} />
        </TailwindThemeProvider>
      </MuiThemeProvider>
    </UserProvider>
  );
}