import React, {useState, useContext} from "react";
import { Board, Cell, Options } from "./types";



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
  SMALL_GRID_SIZE: 3},
  selectCell: () => {}
});

const INITIAL_BOARD = [
  [0,0,0,6,9,0,7,0,2],
  [0,0,0,0,0,1,0,0,0],
  [2,0,0,0,8,0,1,0,5],
  [0,0,0,0,6,0,4,3,0],
  [1,0,3,0,4,0,5,0,8],
  [0,7,6,0,3,0,0,0,0],
  [3,0,2,0,7,0,0,0,4],
  [0,0,0,2,0,0,0,0,0],
  [8,0,9,0,1,6,0,0,0],
]
const INITIAL_BOARD_STATE : Cell[][] = INITIAL_BOARD.map((rows, row) => rows.map((cell, col) => (
    {row: row,
    column: col,
    value: cell,
    isSelected: false,
    isHighlighted: false,
    isValid: true,
  }) 
  ))


export function SudokuProvider({children}: Props){
  const [options, setOptions] = useState<Options>({
    SUDOKU_SIZE: 9,
    SMALL_GRID_SIZE: 3
  })

  const [boardState, setBoardState] = useState<Board>(INITIAL_BOARD_STATE)
  
  function getCurrentGrid(currentRow: number, currentColumn: number){
    const rowStart = Math.floor(currentRow/options.SMALL_GRID_SIZE) * options.SMALL_GRID_SIZE;
    const rowEnd = rowStart + options.SMALL_GRID_SIZE;
    const colStart = Math.floor(currentColumn / options.SMALL_GRID_SIZE)* options.SMALL_GRID_SIZE;
    const colEnd = colStart + options.SMALL_GRID_SIZE
    return {rowStart, rowEnd, colStart, colEnd}
  }
  function modifyBoard(currentRow: number, currentColumn: number, value: number){


    function isMoveValid(){
      let valid = true;
      const currentGrid = getCurrentGrid(currentRow, currentColumn)
      for (let row=0; row< options.SUDOKU_SIZE; row++){
        if (boardState[row][currentColumn].value === value) valid = false
      }
      for (let col=0; col<options.SUDOKU_SIZE; col++){
        if (boardState[currentRow][col].value === value) valid = false
      }
      for (let row=currentGrid.rowStart; row<currentGrid.rowEnd; row++){
        for (let col=currentGrid.colStart; col<currentGrid.colEnd; col++){
          if (boardState[row][col].value === value) valid = false
        }
      }
      return valid
    }

    if (value > options.SUDOKU_SIZE) value %= 10;
    // if the field is already filled, the previous number is replaced with the new one
    // because then the value is like <prevNum><newNum>, so % 10 leaves only <newNum>
    setBoardState(board => board.map((rows, row) => rows.map((cell, col) => {
      if (cell.value == value) return cell;
      if (row === currentRow && col === currentColumn) {
        return value ? {...cell, value:value, isValid: isMoveValid()} : {...cell, value: 0}
      }
      return cell
    })))
  }


  function selectCell(currentRow: number, currentColumn: number){
    const currentGrid = getCurrentGrid(currentRow, currentColumn)
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
      selectCell
    }}>
      {children}
    </SudokuContext.Provider>
  )
}

export function useGlobalContext(){
  return useContext(SudokuContext)
}