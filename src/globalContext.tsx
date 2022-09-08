import React, {useState, useContext, useEffect} from "react";
import { Board, Cell, Options, Matrix2D } from "./types";
import generateSudoku from "./utils/generateSudoku";
import getCurrentGrid from "./utils/getCurrentGrid";
import isValid from "./utils/isValid";
import { nestedNumbersToSudoku, sudokuToNestedNumbers } from './utils/arrayMethods';


type Props = {
  children: React.ReactNode[] | React.ReactNode
}

type ContextValue = {
  boardState: Board;
  setBoardState: React.Dispatch<React.SetStateAction<Board>>;
  modifyBoard: (arg0: number, arg1: number, arg2: number) => void;
  options: Options;
  setOptions:  React.Dispatch<React.SetStateAction<Options>>;
  selectCell: (arg0:number, arg1: number, arg2: Cell) => void;
  initialBoardInfo: {board: Matrix2D, filledBoard: Matrix2D};
  setInitialBoardInfo: React.Dispatch<React.SetStateAction<{
    board: Matrix2D;
    filledBoard: Matrix2D;
}>>;
  loadedImage: File | null;
  setLoadedImage: React.Dispatch<React.SetStateAction<File | null>>
}

export const SudokuContext = React.createContext<ContextValue | undefined>(undefined);



export function SudokuProvider({children}: Props){
  const [loadedImage, setLoadedImage] = useState<File | null>(null)
  const [options, setOptions] = useState<Options>({
    SUDOKU_SIZE: 16,
    SMALL_GRID_SIZE: 4,
    FILLED_CELLS_AMOUNT: 7,
  })
  const [boardState, setBoardState] = useState<Board>([]);
  const [initialBoardInfo, setInitialBoardInfo] = useState<{board: Matrix2D, filledBoard: Matrix2D}>({board: [], filledBoard: []})

  
  useEffect(()=> {
    if (loadedImage) return;
    const newBoardInfo = generateSudoku(options.SUDOKU_SIZE, options.FILLED_CELLS_AMOUNT);
    setInitialBoardInfo(newBoardInfo)
    setBoardState(nestedNumbersToSudoku(newBoardInfo.board))
  }, [options.SUDOKU_SIZE, options.FILLED_CELLS_AMOUNT])

  useEffect(()=>{
    setBoardState(nestedNumbersToSudoku(initialBoardInfo.board))
    setLoadedImage(null)
  },[initialBoardInfo])

  function modifyBoard(currentRow: number, currentColumn: number, value: number){
    if (value > options.SUDOKU_SIZE) value %= 10;
    // if the field is already filled, the previous number is replaced with the new one
    // because then the value is like <prevNum><newNum>, so % 10 leaves only <newNum>
    setBoardState(board => board.map((rows, row) => rows.map((cell, col) => {
      if (cell.value === value || !cell.isRemovable) return cell;
      if (row === currentRow && col === currentColumn) {
        return value ? {...cell, value:value, isValid: isValid(
          sudokuToNestedNumbers(board),
          cell,
          value,
          options.SMALL_GRID_SIZE)} : {...cell, value: 0}
      }
      return cell
    })))

  }


  function selectCell(currentRow: number, currentColumn: number){
    const currentGrid = getCurrentGrid(currentRow, currentColumn, options.SMALL_GRID_SIZE)
    // Cell is Selected -> if I just select it lol, if it's in the same 
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
      modifyBoard,
      options,
      setOptions,
      selectCell,
      initialBoardInfo,
      setInitialBoardInfo,
      loadedImage,
      setLoadedImage
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