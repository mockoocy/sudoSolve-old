import React, {useState, useContext, useEffect} from "react";
import { Board, Cell, Options, Matrix2D } from "./types";
import generateSudoku from "./utils/generateSudoku";
import getCurrentGrid from "./utils/getCurrentGrid";
import { nestedNumbersToSudoku } from './utils/arrayMethods';


type Props = {
  children: React.ReactNode[] | React.ReactNode
}

type ContextValue = {
  boardState: Board;
  setBoardState: React.Dispatch<React.SetStateAction<Board>>;
  options: Options;
  setOptions:  React.Dispatch<React.SetStateAction<Options>>;
  selectCell: (arg0:number, arg1: number, arg2: Cell) => void;
  initialBoardInfo: {board: Matrix2D, filledBoard: Matrix2D};
  setInitialBoardInfo: React.Dispatch<React.SetStateAction<{
    board: Matrix2D;
    filledBoard: Matrix2D;
}>>;
  loadedImage: File | null;
  setLoadedImage: React.Dispatch<React.SetStateAction<File | null>>,
  restartGame: () => void;
  gameWon: boolean;
  setGameWon: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SudokuContext = React.createContext<ContextValue | undefined>(undefined);

const DEFAULT_OPTIONS: Options = {
  SUDOKU_SIZE: 9,
  SMALL_GRID_SIZE: 3,
  FILLED_CELLS_AMOUNT: 17,
  BOARD_SIZE_FACTOR: 1
}

export function SudokuProvider({children}: Props){
  const [gameWon, setGameWon] = useState(false)
  const [loadedImage, setLoadedImage] = useState<File | null>(null)
  const [options, setOptions] = useState<Options>(DEFAULT_OPTIONS)
  const [boardState, setBoardState] = useState<Board>([]);
  const [initialBoardInfo, setInitialBoardInfo] = useState<{board: Matrix2D, filledBoard: Matrix2D}>({board: [], filledBoard: []})

  function restartGame(){
    setGameWon(false)
    const newBoardInfo = generateSudoku(options.SUDOKU_SIZE, options.FILLED_CELLS_AMOUNT);
    setInitialBoardInfo(newBoardInfo)
    setBoardState(nestedNumbersToSudoku(newBoardInfo.board))
  }
  
  useEffect(()=> {
    if (loadedImage) return;
    restartGame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.SUDOKU_SIZE, options.FILLED_CELLS_AMOUNT])

  useEffect(()=>{
    setBoardState(nestedNumbersToSudoku(initialBoardInfo.board))
    setLoadedImage(null)
  },[initialBoardInfo])


  function selectCell(currentRow: number, currentColumn: number){
    const currentGrid = getCurrentGrid(currentRow, currentColumn, options.SMALL_GRID_SIZE)
    // Cell is Selected -> if I just selected it lol, if it's in the same 
    // row || column || small grid, it's highlighted
    setBoardState(prevBoard =>prevBoard.map((rows,row) => {
      return rows.map((cell, col) => {
        if (row === currentRow && col === currentColumn) {
          return {...cell, isSelected: true }
        }else if (row === currentRow || col === currentColumn) {
          return {...cell, isSelected: false, isHighlighted: true}
        }else if (
          row >= currentGrid.rowStart 
          && row  < currentGrid.rowEnd
          && col >= currentGrid.colStart 
          && col  < currentGrid.colEnd
          ){
            return {...cell, isSelected: false, isHighlighted: true}
        }
        return {...cell, isSelected: false, isHighlighted: false}
      })
    }))
  }



  
  return (
    <SudokuContext.Provider value= {{
      boardState,
      setBoardState,
      options,
      setOptions,
      selectCell,
      initialBoardInfo,
      setInitialBoardInfo,
      loadedImage,
      setLoadedImage,
      restartGame,
      gameWon,
      setGameWon
    }}>
      {children}
    </SudokuContext.Provider>
  )
}

export function useGlobalContext(){
  const contextValue = useContext(SudokuContext)
  if (contextValue === undefined) throw new Error("context value is unset")
  return contextValue
}