import React, {useState, useContext, useEffect} from "react";
import { Board, Cell, Options } from "./types";
import generateSudoku from "./utils/generateSudoku";
import getCurrentGrid from "./utils/getCurrentGrid";
import isValid from "./utils/isValid";

type Props = {
  children: React.ReactNode[] | React.ReactNode
}

type ContextValue = {
  boardState: Board;
  setBoardState: Function;
  modifyBoard: (arg0: number, arg1: number, arg2: number) => void;
  options: Options;
  selectCell: (arg0:number, arg1: number, arg2: Cell) => void;
}

export const SudokuContext = React.createContext<ContextValue>({
  boardState: [],
  setBoardState: () => {},
  modifyBoard: () => {},
  options: {SUDOKU_SIZE: 9,
  SMALL_GRID_SIZE: 3,
  SELECTED_FONT: "Inter, sans-serif"
},
  selectCell: () => {}
});



export function SudokuProvider({children}: Props){
  const [gameWon, setGameWon] = useState(false)
  const [options, setOptions] = useState<Options>({
    SUDOKU_SIZE: 9,
    SMALL_GRID_SIZE: 3,
    FILLED_CELLS_AMOUNT: 32,
    SELECTED_FONT: "Rubik moonrocks"
  })
  const initialBoard = generateSudoku(options.SUDOKU_SIZE, options.FILLED_CELLS_AMOUNT);
  const initialBoardState : Cell[][] = initialBoard.map((rows, row) => rows.map((cell, col) => (
    {row: row,
    column: col,
    value: cell,
    isSelected: false,
    isHighlighted: false,
    isValid: true,
  })))

  const [boardState, setBoardState] = useState<Board>(initialBoardState);
  function modifyBoard(currentRow: number, currentColumn: number, value: number){


    if (value > options.SUDOKU_SIZE) value %= 10;
    // if the field is already filled, the previous number is replaced with the new one
    // because then the value is like <prevNum><newNum>, so % 10 leaves only <newNum>
    setBoardState(board => board.map((rows, row) => rows.map((cell, col) => {
      if (cell.value === value) return cell;
      if (row === currentRow && col === currentColumn) {
        return value ? {...cell, value:value, isValid: isValid(board,
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
  useEffect(()=>{
    if (!boardState.some(row => row.some(cell => cell.value === 0 || !cell.isValid)) && !gameWon){
      setGameWon(true)
    }
  },[boardState, gameWon])

  useEffect(()=>{
    if (gameWon){
    }
  },[gameWon])
  
  return (
    <SudokuContext.Provider value= {{
      boardState,
      setBoardState,
      modifyBoard,
      options,
      selectCell
    }}>
      {children}
    </SudokuContext.Provider>
  )
}

export function useGlobalContext(){
  return useContext(SudokuContext)
}