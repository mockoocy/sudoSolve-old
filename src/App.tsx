import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { Theme } from "./types";
import themes from "./utils/themes";
import GlobalStyle from "./globalComponents/styles/Global";
import Navbar from "./globalComponents/Navbar";
import { SudokuProvider } from "./globalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home/Home";
import ThemeCreator from "./pages/ThemeCreator/ThemeCreator";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  const themeFromStorage = localStorage.getItem("theme");
  const customThemeFromStorage = localStorage.getItem("customTheme");

  const [theme, setTheme] = useState<Theme>(
    themeFromStorage ? JSON.parse(themeFromStorage) : themes.darkTheme
  );

  const [customTheme, setCustomTheme] = useState<Theme>(
    customThemeFromStorage
      ? JSON.parse(customThemeFromStorage)
      : themes.darkTheme
  );

  useEffect(() => {
    localStorage.setItem("customTheme", JSON.stringify(customTheme));
    setTheme(customTheme);
  }, [customTheme, setTheme]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SudokuProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <GlobalStyle />
            <Navbar setTheme={setTheme} customTheme={customTheme} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/themeCreator"
                element={
                  <ThemeCreator
                    customTheme={customTheme}
                    setCustomTheme={setCustomTheme}
                    setTheme={setTheme}
                  />
                }
              />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </SudokuProvider>
    </QueryClientProvider>
  );
}
