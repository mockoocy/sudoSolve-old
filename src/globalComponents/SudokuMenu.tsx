import React from 'react';
import SudokuBoard from './SudokuBoard';
import styled from 'styled-components';
import { useGlobalContext } from '../globalContext';
import sudokuToNestedNumbers from '../utils/sudokuToNestedNumbers';
import nestedNumbersToSudoku from '../utils/nestedNumbersToSudoku';
import solveSudoku from '../utils/solveSudoku';

const StyledSudokuMenu = styled.div`
  width: 50vw;
  @media (max-width: 820px){
    width: 80vw
  }
    .buttons {
    display: flex;
    width: 100%;


    button {
      width: 20%;
      height: 3rem;
      background-color: var(--standOutClr);
    }
  }
`

export default function SudokuMenu() {

  const {initialBoardFilled, boardState, setBoardState, options} = useGlobalContext();


  function displaySolvedSudoku(){
    const startTime = Date.now();

    // for (let i=0; i<25; i++){
    //   const newBoard = generateSudoku(options.SUDOKU_SIZE, options.FILLED_CELLS_AMOUNT).board;
    //   const sudokuCache = cacheValidValues(newBoard, options.SMALL_GRID_SIZE);
    //   solveSudoku(newBoard, options.SMALL_GRID_SIZE)
    // }
    const boardCopy = structuredClone(boardState);
    const sudokuBoard = sudokuToNestedNumbers(boardCopy);
    solveSudoku(sudokuBoard, options.SMALL_GRID_SIZE);
    setBoardState(nestedNumbersToSudoku(sudokuBoard))

    console.log(`%csolving took ${Date.now() - startTime}ms, avg:${(Date.now() - startTime)/options.FILLED_CELLS_AMOUNT}`, 'color: #7fffd4; font-size: 2rem; font-weight: 600; text-shadow: .25rem .25rem .5rem #f0f8f5')
  }

  function fastSolve(){
    setBoardState(nestedNumbersToSudoku(initialBoardFilled))
  }

  return (
    <StyledSudokuMenu>
      <SudokuBoard />
      <div className="buttons">
        <button onClick={()=> displaySolvedSudoku() }></button>
        <button onClick={()=> fastSolve()}></button>

      </div>
      
    </StyledSudokuMenu>
  )
}
