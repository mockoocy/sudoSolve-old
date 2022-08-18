import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import {Theme} from "./types";
import themes from "./utils/themes";
import GlobalStyle from './globalComponents/styles/Global';
import Navbar from './globalComponents/Navbar';
import SudokuBoard from './globalComponents/SudokuBoard';
import { SudokuProvider } from './globalContext';

export default function App() {

  const [theme, setTheme] = useState<Theme>(themes.lightTheme)
  
  return (
    <SudokuProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle/>
        <Navbar/>
        <SudokuBoard/>
      </ThemeProvider>
    </SudokuProvider>
  )
}
