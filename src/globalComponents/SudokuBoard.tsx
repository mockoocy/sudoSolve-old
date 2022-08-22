import React, { useRef } from 'react'
import styled from 'styled-components';
import { useGlobalContext } from '../globalContext';
import { Board, Coords } from '../types';
import generateSudoku from '../utils/generateSudoku';
import nestedNumbersToSudoku from '../utils/nestedNumbersToSudoku';
import solveSudoku, { cacheValidValues } from '../utils/solveSudoku';
import sudokuToNestedNumbers from '../utils/sudokuToNestedNumbers';
import SudokuCell from './SudokuCell';


type StyledProps = {
  sudokuSize: number
}
const StyledSudokuBoard = styled.div<StyledProps>`
  display: grid;
  margin: 1.25% 2.5%;
  width: 40vw;
  height: auto;
  grid-template-columns: repeat(${props => props.sudokuSize}, 1fr);  
  grid-template-rows: repeat(${props => props.sudokuSize}, 1fr);

  @media (max-width:820px){
    width: 80vw;
  }

`

export default function SudokuBoard() {
  const {boardState,setBoardState, options, initialBoardFilled } = useGlobalContext();
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

  function displaySolvedSudoku(){
    const startTime = Date.now();

    for (let i=0; i<25; i++){
      const newBoard = generateSudoku(options.SUDOKU_SIZE, options.FILLED_CELLS_AMOUNT).board;
      const sudokuCache = cacheValidValues(newBoard, options.SMALL_GRID_SIZE);
      solveSudoku(newBoard, sudokuCache, options.SMALL_GRID_SIZE)
    }


    
    console.log(`%csolving took ${Date.now() - startTime}ms, avg:${(Date.now() - startTime)/options.FILLED_CELLS_AMOUNT}`, 'color: #7fffd4; font-size: 2rem; font-weight: 600; text-shadow: .25rem .25rem .5rem #f0f8f5')
  }

  function fastSolve(){
    setBoardState(nestedNumbersToSudoku(initialBoardFilled))

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
    <StyledSudokuBoard sudokuSize={options.SUDOKU_SIZE}>
      {sudokuCellElements}
      <button onClick={() => displaySolvedSudoku()}></button>
      <button onClick={() => fastSolve()}></button>

    </StyledSudokuBoard>
  )
}
