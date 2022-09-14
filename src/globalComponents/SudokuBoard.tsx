import React, { useEffect, useRef } from 'react'
import styled from 'styled-components';
import { useGlobalContext } from '../globalContext';
import SudokuCell from './SudokuCell';


type StyledProps = {
  sudokuSize: number;
  smallGridSize: number;
  width: string;
  height: string
}
const StyledSudokuBoard = styled.div<StyledProps>`
  --width: ${props => props.width};
  --height: ${props => props.height};
  --sudokuSize: ${props => props.sudokuSize};
  --smallGridSize: ${props => props.smallGridSize};

  width: var(--width);
  height: var(--height);
  display: grid;
  gap: 1px;
  grid-template-columns: repeat(var(--sudokuSize), 1fr);  
  grid-template-rows: repeat(var(--sudokuSize), 1fr);


  @media (max-width: 820px){
    height: auto;
    min-width: 100%;
    grid-template-columns: repeat(var(--sudokuSize), minmax( calc(2rem - 0.05rem * var(--smallGridSize)), 1fr));  
    grid-template-rows: repeat(var(--sudokuSize), minmax( calc(2rem - 0.05rem * var(--smallGridSize)), 1fr));
  }


`

type Props = {
  width: string;
  height: string
}

export default function SudokuBoard({width, height} : Props) {
  const {boardState, options, gameWon, setGameWon } = useGlobalContext();
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
        nextInputId = getNextInputId(nextRow, nextCol);
        break;
      case "ArrowDown":
        nextRow = row + moveAmount < options.SUDOKU_SIZE ? row + moveAmount: row;
        nextInputId = getNextInputId(nextRow, nextCol)
        break;
      case "ArrowLeft":
        nextCol = col - moveAmount;
        nextInputId = getNextInputId(nextRow, nextCol)
        break;
      case "ArrowRight":
        nextCol = col + moveAmount;
        nextInputId = getNextInputId(nextRow, nextCol)
        break;
      }
    if (nextInputId !== undefined &&  nextInputId >= 0 && nextInputId < options.SUDOKU_SIZE ** 2){
      const nextInput = cellRefs.current[nextInputId];
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

  useEffect(()=>{
    const boardStateFlattened = boardState.reduce((acc, val) => acc.concat(val), [])
    if (boardState.length > 0 
      && !boardStateFlattened.some(cell => cell.value === 0 || !cell.isValid)){
      setGameWon(true)
    }
  },[boardState, gameWon, setGameWon])

  return (
    <StyledSudokuBoard 
    sudokuSize={options.SUDOKU_SIZE} 
    smallGridSize={options.SMALL_GRID_SIZE}
    width={width}
    height={height}
    >
      {sudokuCellElements}
    </StyledSudokuBoard>
  )
}
