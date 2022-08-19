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


  function moveOnBoard(e: React.KeyboardEvent<HTMLDivElement>, row: number, col: number){
    const { code } = e;
    const moveAmount = 1;
    let [nextRow, nextCol] = [row, col]
    let nextInputId;

    const getNextInputId = (nextRow: number, nextCol: number) => nextRow * options.SUDOKU_SIZE + nextCol

    switch (code){
      case "ArrowUp":
        nextRow = row - moveAmount>= 0 ? row - moveAmount: row;
        nextInputId = getNextInputId(nextRow, nextCol)
        break;
      case "ArrowDown":
        nextRow = row + moveAmount <= options.SUDOKU_SIZE ? row + moveAmount: row;
        nextInputId = getNextInputId(nextRow, nextCol)
        break;
      case "ArrowLeft":
        nextCol = col - moveAmount >= 0 ? col - moveAmount : col;
        nextInputId = getNextInputId(nextRow, nextCol)
        break;
      case "ArrowRight":
        nextCol = col + moveAmount <= options.SUDOKU_SIZE ? col + moveAmount: col;
        nextInputId = getNextInputId(nextRow, nextCol)
        break;
      }
    if (nextInputId !== undefined &&  nextInputId >= 0 && nextInputId < options.SUDOKU_SIZE ** 2){
      const nextInput = cellRefs.current[nextInputId];
      console.log(nextInputId)
      nextInput.focus();
      nextInput.select();
      e.preventDefault();

    }

  }

    
  const sudokuCellElements: JSX.Element[][] = boardState.map((row, rowId) => {
    return row.map((cell, col)=>{
      const cellId = rowId * options.SUDOKU_SIZE + col;
      return (
        <SudokuCell 
        key={`sudokuCell-${rowId}-${col}`} 
        ref={(el) => (cellRefs.current[cellId] = el)}
        maxNumber={options.SUDOKU_SIZE} 
        cell={cell}
        moveOnBoard={moveOnBoard}
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
