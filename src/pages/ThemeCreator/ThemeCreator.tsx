import React, { useEffect, useState } from 'react'
import SudokuBoard from '../../globalComponents/SudokuBoard'
import { useGlobalContext } from '../../globalContext'
import getBoardSize from '../../utils/getBoardSize'
import {ChromePicker} from "react-color"
import { Theme } from '../../types'
import themes from "../../utils/themes"
import styled from "styled-components"
import ColorInput from './ColorInput'


const StyledThemeCreator = styled.section`
  margin: 2.5% 0; 
  display: flex;
  align-items: center;
  justify-content: space-around;
`


type Props = {
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

export default function ThemeCreator({setTheme}: Props) {
  const customThemeFromStorage = localStorage.getItem('customTheme')
  const [customTheme, setCustomTheme] = useState<Theme>(
    customThemeFromStorage 
    ? JSON.parse(customThemeFromStorage) 
    :themes.darkTheme
    )

  useEffect(()=>{
    localStorage.setItem("customTheme", JSON.stringify(customTheme))
},[customTheme])

  const { options } = useGlobalContext(); 
  const boardSize = getBoardSize(options.SUDOKU_SIZE, options.BOARD_SIZE_FACTOR)
  return (
    <StyledThemeCreator>
      <SudokuBoard width={boardSize.width} height={boardSize.height} />
      <ChromePicker 
      color={customTheme.colors.bgClr}
      onChangeComplete={(color) => setCustomTheme({...customTheme, colors: {...customTheme.colors, bgClr: color.hex}  })}
      
      />
      <button onClick={() => setTheme(customTheme)}>View changes</button>
      <ColorInput/>
    </StyledThemeCreator>

  )
}
