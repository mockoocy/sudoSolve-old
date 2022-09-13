import React, { useEffect, useRef, useState } from 'react';
import SudokuBoard from './SudokuBoard';
import StyledSudokuMenu from './styles/StyledSudokuMenu';
import { useGlobalContext } from '../globalContext';
import { nestedNumbersToSudoku, sudokuToNestedNumbers, arrayToSquareMatrix  } from '../utils/arrayMethods';
import solveSudoku from '../utils/solveSudoku';
import apiClient from '../utils/apiClient';
import { useMutation } from '@tanstack/react-query';
import { Icon } from '@iconify/react';
import Timer from "./Timer"
import VictoryScreen from "./VictoryScreen"
import generateSudoku from '../utils/generateSudoku';


export default function SudokuMenu() {
  const [paused, setPaused] = useState(false)
  const [startTime, setStartTime] = useState(new Date().getTime())
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [timeFinished, setTimeFinished] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)
  
  const {initialBoardInfo, boardState, setBoardState, setInitialBoardInfo, options, setOptions, loadedImage, setLoadedImage, gameWon, setGameWon} = useGlobalContext();
  const MAX_FILENAME_LENGTH = 12
  const TIMER_REFRESH_INTERVAL = 33


  function algoSolveSudoku(){
    const startTime = Date.now(); 
    const boardCopy = structuredClone(boardState);
    const sudokuBoard = sudokuToNestedNumbers(boardCopy);
    if (solveSudoku(sudokuBoard, options.SMALL_GRID_SIZE)){
      setBoardState(nestedNumbersToSudoku(sudokuBoard));
    } else {
      alert("Couldn't solve it bro")
    }
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
      algoSolveSudoku()
    } else {
    fastSolve()
    }   
  }

  useEffect(()=>{
    if (boardState.length > 0 && !boardState.flat().some(cell => cell.value === 0 || !cell.isValid)){
      console.log('here!')
      setGameWon(true)
      setTimeFinished(timeElapsed)
    }
  },[boardState])

  useEffect(()=>{
    setGameWon(false)
  }, [options])

  useEffect(()=>{
    setPaused(gameWon)
    setTimeElapsed(0)
  },[gameWon])


  async function getSudokuFromImage(){
    if (!loadedImage) return;
    const formData = new FormData();
    formData.append('image', loadedImage, loadedImage.name)
    const response = await apiClient.post('postImage', formData, {
      onUploadProgress: ProgressEvent => console.log(`Upload Progress: ${ProgressEvent.loaded / ProgressEvent.total*100}`)
    })
    return response
  }


  function getBoardSize(sudokuSize: number){
    const WIDTH_BIAS = 36 
    const boardWidth = `${sudokuSize + WIDTH_BIAS}vw`
    const boardHeight = `${sudokuSize + WIDTH_BIAS}vw`
    return {width: boardWidth, height: boardHeight}
  }

  
  useEffect(()=>{
    let timer: NodeJS.Timer

    if (!paused){
      timer = setInterval(()=> {
        setTimeElapsed(new Date().getTime() - startTime)
      }, TIMER_REFRESH_INTERVAL)
    }
    return () => clearInterval(timer)
  },[paused, startTime])

  useEffect(()=>{
    setStartTime(new Date().getTime())
  },[initialBoardInfo])

  return (  
    <StyledSudokuMenu sudokuSize={options.SUDOKU_SIZE} ref={menuRef}>
      {gameWon
        ? <VictoryScreen 
        height={getBoardSize(options.SUDOKU_SIZE).height}
        width={getBoardSize(options.SUDOKU_SIZE).width}
        timeFinished={timeFinished}
        />
        : <SudokuBoard/>
      }
      <div className="buttons">
        <Timer
        timeElapsed={timeElapsed}
        />
        <button className="btn" onClick={()=> chooseSolver()}>
          solve
          <Icon className="icon" icon="arcticons:offlinepuzzlesolver" />
        </button>
        <button className="btn" onClick={()=> unSolve()}> 
          unsolve
          <Icon className="icon" icon="mdi:keyboard-return" />
        </button>
        <label htmlFor="file-selector" id="file-label" className='btn'>
          {loadedImage?.name 
            ? loadedImage.name.length > MAX_FILENAME_LENGTH 
              ? `${loadedImage.name.slice(0, MAX_FILENAME_LENGTH)}...`
              : loadedImage.name
            : "Upload an image!"
          }
          <Icon className="icon" id="icon upload-icon" icon="ic:baseline-file-upload" />
        </label>
        <input id="file-selector" type="file" accept='image/*' onChange={e => sendSudokuImage(e)}/>
        {loadedImage &&
          <button className="btn" id="file-submit" onClick={() => getSudokuBoard()}>
          {isSudokuLoading
            ? <h5>Processing Image... <Icon className="icon" icon="line-md:loading-loop" /> </h5> 
            : <h5>Submit image <Icon className="icon" icon="ic:baseline-input" /></h5>
          }
        </button>
        }

      </div>
      
    </StyledSudokuMenu>
  )
}
