import React, { useState } from 'react';
import SudokuBoard from './SudokuBoard';
import styled from 'styled-components';
import { useGlobalContext } from '../globalContext';
import { nestedNumbersToSudoku, sudokuToNestedNumbers, arrayToSquareMatrix  } from '../utils/arrayMethods';
import solveSudoku from '../utils/solveSudoku';
import apiClient from '../utils/apiClient';
import { useMutation } from '@tanstack/react-query';
import { Icon } from '@iconify/react';

type StyledProps = {
  sudokuSize: number
}

const StyledSudokuMenu = styled.div<StyledProps>`
  margin: 1.25% 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  /* width: calc(${props => props.sudokuSize}*1.125vw + 36vw);
   */
  width: 80vw;
  @media (max-width: 820px){
    width: 80vw
  }
    .buttons {
    display: flex;
    width: 100%;
    gap: .25rem;


    .btn {
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
    #file-label {
      font-size: 1.125rem;
      opacity: 0.8;
      background-color: var(--standOutClr);
      display: flex;
      align-items: center;
      justify-content: center;

      .icon {
        width: 1em;
        height: 1em
      }
    }
    #file-selector {
      display: none;
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
  }

  const {isLoading: isSudokuLoading, mutate: getSudokuBoard} = useMutation(getSudokuFromImage, {
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


  function chooseSolver(){
    if (options.SUDOKU_SIZE <= 9){
      displaySolvedSudoku()
  } else {
    fastSolve()
  }
}


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
    <StyledSudokuMenu sudokuSize={options.SUDOKU_SIZE}>
      <SudokuBoard />
      <div className="buttons">
        <button className="btn" onClick={()=> chooseSolver()}>solve</button>
        <button className="btn" onClick={()=> unSolve()}>unsolve</button>
        <label htmlFor="file-selector" id="file-label" className='btn'>
          Upload an image!
          <Icon id="icon upload-icon" icon="ic:baseline-file-upload" />
        </label>
        <input id="file-selector" type="file" accept='image/*' onChange={e => sendSudokuImage(e)}/>
        <button className="btn" id="file-submit" onClick={() => getSudokuBoard()}>
          {isSudokuLoading ? "Proccessing image..." : "Submit image" }
        </button>

      </div>
      
    </StyledSudokuMenu>
  )
}
