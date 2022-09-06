import React, { useEffect, useState } from 'react';
import SudokuBoard from './SudokuBoard';
import styled from 'styled-components';
import { useGlobalContext } from '../globalContext';
import { nestedNumbersToSudoku, sudokuToNestedNumbers, arrayToSquareMatrix  } from '../utils/arrayMethods';
import solveSudoku from '../utils/solveSudoku';
import axios from "axios"
import { Matrix2D } from '../types';
import apiClient from '../utils/apiClient';

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

  const {initialBoardInfo, boardState, setBoardState, options} = useGlobalContext();
  const [sudokuImage, setSudokuImage] = useState<File | null>(null);
  const [axiosResponse, setAxiosResponse] = useState<number[]>([])


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

    console.log(`%csolving took ${Date.now() - startTime}ms`, 'color: #7fffd4; font-size: 2rem; font-weight: 600; text-shadow: .25rem .25rem .5rem #f0f8f5')
  }

  function fastSolve(){
    setBoardState(nestedNumbersToSudoku(initialBoardInfo.filledBoard))
  }

  function unSolve(){
    setBoardState(nestedNumbersToSudoku(initialBoardInfo.board))
  }

  function sendSudokuImage(e: React.ChangeEvent<HTMLInputElement>){
    if (e.target.files) setSudokuImage(e.target.files[0])
  }

  function uploadSudokuImage(){
    if (!sudokuImage) return;
    const formData = new FormData();
    formData.append('image', sudokuImage, sudokuImage.name)
    const responseArray = []
    const elo =apiClient.post("postImage", formData,{
      onUploadProgress: ProgressEvent => console.log(`Upload Progress: ${ProgressEvent.loaded / ProgressEvent.total*100}`)
    })
      .then(res => console.log(res.data))
    console.log(elo)
  }

  // useEffect(()=>{set},[axiosResponse])

  return (  
    <StyledSudokuMenu>
      <SudokuBoard />
      <div className="buttons">
        {options.SUDOKU_SIZE <= 9 && <button onClick={()=> displaySolvedSudoku() }>Slow solve</button>}
        <button onClick={()=> fastSolve()}>Fast solve</button>
        <button onClick={()=> unSolve()}>unsolve</button>
        <input type="file" accept='image/*' onChange={e => sendSudokuImage(e)}/>
        <button onClick={uploadSudokuImage}></button>
      </div>
      
    </StyledSudokuMenu>
  )
}
