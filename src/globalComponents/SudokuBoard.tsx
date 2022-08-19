import React, { useRef } from 'react'
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

  const {boardState, options } = useGlobalContext();

  const cellRefs : React.MutableRefObject<any[]> = useRef([]);

    
  const sudokuCellElements: JSX.Element[][] = boardState.map((row, rowId) => {
    return row.map((cell, col)=>{
      const cellId = rowId * options.SUDOKU_SIZE + col;
      return (
        <SudokuCell 
        key={`sudokuCell-${rowId}-${col}`} 
        ref={(el) => (cellRefs.current[cellId] = el)}
        maxNumber={options.SUDOKU_SIZE} 
        cell={cell}
        />
      )
    })
  })


  return (
    <StyledSudokuBoard>
      {sudokuCellElements}
    </StyledSudokuBoard>
  )
}
