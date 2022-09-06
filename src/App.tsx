import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import {Theme} from "./types";
import themes from "./utils/themes";
import GlobalStyle from './globalComponents/styles/Global';
import Navbar from './globalComponents/Navbar';
import { SudokuProvider, useGlobalContext } from './globalContext';
import SudokuMenu from './globalComponents/SudokuMenu';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

export default function App() {

  const [theme, setTheme] = useState<Theme>(themes.darkTheme);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus : false
      }
    }
  })

  
  return (
    <QueryClientProvider client={queryClient}>
      <SudokuProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Navbar setTheme={setTheme} />
          <SudokuMenu/>
        </ThemeProvider>
      </SudokuProvider>
    </QueryClientProvider>
  )
}
