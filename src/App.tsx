import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import {Theme} from "./types";
import themes from "./utils/themes";
import GlobalStyle from './globalComponents/styles/Global';
import Navbar from './globalComponents/Navbar';
import SudokuBoard from './globalComponents/SudokuBoard';
import { SudokuProvider, useGlobalContext } from './globalContext';

export default function App() {

  const [theme, setTheme] = useState<Theme>(themes.lightTheme);

  const {options} = useGlobalContext();
  
  return (
    <SudokuProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle font={options.SELECTED_FONT}/>
        <Navbar/>
        <SudokuBoard/>
      </ThemeProvider>
    </SudokuProvider>
  )
}
