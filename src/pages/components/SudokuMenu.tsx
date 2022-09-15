import React, { useEffect, useRef, useState } from 'react';
import SudokuBoard from '../../globalComponents/SudokuBoard';
import StyledSudokuMenu from './styles/StyledSudokuMenu';
import { useGlobalContext } from '../../globalContext';
import { nestedNumbersToSudoku, sudokuToNestedNumbers, arrayToSquareMatrix  } from '../../utils/arrayMethods';
import solveSudoku from '../../utils/solveSudoku';
import apiClient from '../../utils/apiClient';
import { useMutation } from '@tanstack/react-query';
import { Icon } from '@iconify/react';
import Timer from "./Timer"
import VictoryScreen from "../../globalComponents/VictoryScreen"
import MenuButton from './menuButton';
import { AxiosError } from 'axios';
import getBoardSize from '../../utils/getBoardSize';


export default function SudokuMenu() {
  const [paused, setPaused] = useState(false)
  const [timeFinished, setTimeFinished] = useState(0)
  const [finishedWithButton, setFinishedWithButton] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  
  const {initialBoardInfo, boardState, setBoardState, setInitialBoardInfo, options, setOptions, loadedImage, setLoadedImage, gameWon, setGameWon} = useGlobalContext();
  const MAX_FILENAME_LENGTH = 12
  const BOARD_SIZE: {width: string, height: string} = getBoardSize(options.SUDOKU_SIZE, options.BOARD_SIZE_FACTOR)


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
    setGameWon(false)
    setFinishedWithButton(false)
    setBoardState(nestedNumbersToSudoku(initialBoardInfo.board))
  }

  function sendSudokuImage(e: React.ChangeEvent<HTMLInputElement>){
    if (e.target.files) setLoadedImage(e.target.files[0])
  }
  

  const {isLoading: isSudokuLoading, mutate: getSudokuBoard} = useMutation(getSudokuFromImage, {
    onSuccess: res => {
      if (!res) return;
      console.log(res)
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
    onError: (err: AxiosError ) => {
      console.log(err )
      alert(`error while trying to proccess the image, status code: ${err?.response?.status} | ${JSON.stringify(err.response?.data)}`)
    }
  })


  function chooseSolver(){
    if (boardState.flat().some(cell => !cell.isValid)) return;
    setFinishedWithButton(true)
    if (options.SUDOKU_SIZE <= 9){
      algoSolveSudoku()
    } else {
    fastSolve()
    }   
  }


  useEffect(()=>{
    setGameWon(false)
    setFinishedWithButton(false)
  }, [options.FILLED_CELLS_AMOUNT, options.SUDOKU_SIZE, setGameWon])




  async function getSudokuFromImage(){
    if (!loadedImage) return;
    const formData = new FormData();
    formData.append('image', loadedImage, loadedImage.name)
    const response = await apiClient.post('postImage', formData, {
      onUploadProgress: ProgressEvent => console.log(`Upload Progress: ${ProgressEvent.loaded / ProgressEvent.total*100}`)
    })
    return response
  }

  function getHint(){
    const sudokuSize = options.SUDOKU_SIZE
    const boardStateFlattened = boardState.flat()
    if (boardStateFlattened.every(cell => cell.value !== 0)) return;
    const validIds: number[] = []

    boardStateFlattened.forEach((cell, id) => {
      if (cell.value === 0 || !cell.isValid) validIds.push(id)
    })
    if  (!validIds) return 
    const randomIdId = Math.floor(Math.random() * validIds.length )
    //naming masterpiece
    const randomId = validIds[randomIdId]
    const randomRow = Math.floor(randomId / sudokuSize)
    const randomColumn = randomId % sudokuSize 
    console.log(randomRow, randomColumn)
    const newBoard = structuredClone(boardState)
    // Saving the performance for storage, losing the status of being cool functional programmer this way tho
    newBoard[randomRow][randomColumn].value = initialBoardInfo.filledBoard[randomRow][randomColumn]
    setBoardState(newBoard)
    
  }

  return (  
    <StyledSudokuMenu sudokuSize={options.SUDOKU_SIZE} ref={menuRef}>
      {gameWon && !finishedWithButton
        ? <VictoryScreen 
        height={BOARD_SIZE.height}
        width={BOARD_SIZE.width}
        timeFinished={timeFinished}
        />
        : <SudokuBoard
        width={BOARD_SIZE.width}
        height={BOARD_SIZE.height}
        />
      }
      <div className="buttons">
        <Timer 
        paused={paused}
        setPaused={setPaused}
        setTimeFinished={setTimeFinished}
        />
        <MenuButton 
        text="Hint" 
        tooltip='gives you a number from a random cell' 
        icon={<Icon className="icon" icon="icons8:idea" />}
        clickHandler={getHint}
        />
        <MenuButton 
        text="Solve" 
        tooltip='All cells must have valid numbers inside' 
        icon={<Icon className="icon" icon="arcticons:offlinepuzzlesolver" />}
        clickHandler={chooseSolver}
        />
        <MenuButton 
        text="Unsolve" 
        tooltip='Goes back to initial state of the board' 
        icon={<Icon className="icon" icon="mdi:keyboard-return" />}
        clickHandler={unSolve}
        />
        <label htmlFor="file-selector" id="file-label" className='btn'>
          {loadedImage?.name 
            ? loadedImage.name.length > MAX_FILENAME_LENGTH 
              ? `${loadedImage.name.slice(0, MAX_FILENAME_LENGTH)}...`
              : loadedImage.name
            : "From image"
          }
          <Icon className="icon" id="icon upload-icon" icon="ic:baseline-file-upload" />
        </label>
        <input id="file-selector" type="file" accept='image/*' onChange={e => sendSudokuImage(e)}/>
        {loadedImage &&
        <MenuButton 
        text={isSudokuLoading ? "Processing Image..." : "Submit image"}
        icon={isSudokuLoading 
          ? <Icon className="icon" icon="line-md:loading-loop" /> 
          : <Icon className="icon" icon="ic:baseline-input" />
        }
        tooltip="You can only upload image of a 9x9 sudoku grid"
        clickHandler={getSudokuBoard}
        />
        }

      </div>
      
    </StyledSudokuMenu>
  )
}
