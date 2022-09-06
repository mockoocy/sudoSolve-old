import React, { useState } from 'react';
import SudokuBoard from './SudokuBoard';
import styled from 'styled-components';
import { useGlobalContext } from '../globalContext';
import { nestedNumbersToSudoku, sudokuToNestedNumbers, arrayToSquareMatrix  } from '../utils/arrayMethods';
import solveSudoku from '../utils/solveSudoku';
import apiClient from '../utils/apiClient';
import { useMutation } from '@tanstack/react-query';

const StyledSudokuMenu = styled.div`
  margin: 1.25% 5%;

  width: 50vw;
  @media (max-width: 820px){
    width: 80vw
  }
    .buttons {
    display: flex;
    width: 100%;
    gap: .25rem;


    button {
      width: 20%;
      height: 3rem;
      background-color: var(--standOutClr);
      border: 0;
      margin: .25rem;
      padding: 0;
      border-radius: 1rem;

      :hover {
        transform: scale(1.1);
        transition: all 250ms ease-in-out
      }
    }
  }
`

export default function SudokuMenu() {

  const {initialBoardInfo, boardState, setBoardState, setInitialBoardInfo, options, setOptions, loadedImage, setLoadedImage} = useGlobalContext();



  function displaySolvedSudoku(){
    const startTime = Date.now(); 

    const boardCopy = structuredClone(boardState);
    const sudokuBoard = sudokuToNestedNumbers(boardCopy);
    solveSudoku(sudokuBoard, options.SMALL_GRID_SIZE);
    setBoardState(nestedNumbersToSudoku(sudokuBoard))

    console.log(`%csolving took ${Date.now() - startTime}ms`, 'color: #7fffd4; font-size: 2rem; font-weight: 600; text-shadow: .25rem .25rem .5rem #f0f8f5')
  }

  function fastSolve(){
    setBoardState(nestedNumbersToSudoku(initialBoardInfo.filledBoard))
  }

  function unSolve(){
    setBoardState(nestedNumbersToSudoku(initialBoardInfo.board))
  }

  function sendSudokuImage(e: React.ChangeEvent<HTMLInputElement>){
    if (e.target.files) setLoadedImage(e.target.files[0])
    // setOptions(prevOptions => ({...prevOptions, SUDOKU_SIZE: 9, SMALL_GRID_SIZE: 3 }))

  }

  const {mutate: getSudokuBoard} = useMutation(getSudokuFromImage, {
    onSuccess: res => {
      if (!res) return;
      const loadedBoard: number[] = res.data
      const sudokuMatrix = arrayToSquareMatrix(loadedBoard)
      setOptions(prevOptions => ({
        ...prevOptions,
        SUDOKU_SIZE: 9,
        SMALL_GRID_SIZE: 3,
        FILLED_CELLS_AMOUNT: loadedBoard.filter(el => el > 0).length
      }))

      setInitialBoardInfo({
        board: sudokuMatrix,
        filledBoard: sudokuMatrix
      })
    },
    onError: err => {
      console.log(err)
    }
  })

  async function getSudokuFromImage(){
    if (!loadedImage) return;
    const formData = new FormData();
    formData.append('image', loadedImage, loadedImage.name)
    const response = await apiClient.post('postImage', formData, {
      onUploadProgress: ProgressEvent => console.log(`Upload Progress: ${ProgressEvent.loaded / ProgressEvent.total*100}`)
    })
    return response
  }



  return (  
    <StyledSudokuMenu>
      <SudokuBoard />
      <div className="buttons">
        {options.SUDOKU_SIZE <= 9 && <button onClick={()=> displaySolvedSudoku() }>Slow solve</button>}
        {!loadedImage &&
          <button onClick={()=> fastSolve()}>Fast solve</button>
        }
        <button onClick={()=> unSolve()}>unsolve</button>
        <input type="file" accept='image/*' onChange={e => sendSudokuImage(e)}/>
        <button onClick={() => getSudokuBoard()}></button>

      </div>
      
    </StyledSudokuMenu>
  )
}
