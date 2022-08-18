import React from 'react'
import styled from 'styled-components';
import { useGlobalContext } from '../globalContext';
import SudokuCell from './SudokuCell';

const StyledSudokuBoard = styled.div`
  display: grid;
  margin: 1.25% 2.5%;
  width: 40vw;
  height: auto;
  grid-template-columns: repeat(9, 1fr);  
  grid-template-rows: repeat(9, 1fr);

  @media (max-width:820px){
    width: 80vw;
  }

`

export default function SudokuBoard() {

  const SUDOKU_SIZE = 9;
  const {boardState, options } = useGlobalContext();


  const sudokuCellElements : JSX.Element[][] = boardState.map((row, rowId) => row.map((cell,col) => (
    <SudokuCell 
    key={`sudokuCell-${rowId}-${col}`} 
    maxNumber={options.SUDOKU_SIZE} 
    cell={cell}
    />
  )))

    console.log(boardState)
  return (
    <StyledSudokuBoard>
      {sudokuCellElements}
    </StyledSudokuBoard>
  )
}
