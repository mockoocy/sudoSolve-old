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
    isHighlighted: false
  }) 
  ))


export function SudokuProvider({children}: Props){
  const [options, setOptions] = useState<Options>({
    SUDOKU_SIZE: 9,
    SMALL_GRID_SIZE: 3
  })

  const [boardState, setBoardState] = useState<Board>(INITIAL_BOARD_STATE)

  function modifyBoard(currentRow: number, currentColumn: number, value: number){
    if (value > options.SUDOKU_SIZE) return;
    setBoardState(board => board.map((rows, row) => rows.map((cell, col) => {
      if (row === currentRow && col === currentColumn) {
        return value ? {...cell, value:value} : {...cell, value: 0}
      }
      return cell
    })))
  }

  function selectCell(currentRow: number, currentColumn: number){
    const currentGridStart = [
      Math.floor(currentRow / options.SMALL_GRID_SIZE) * options.SMALL_GRID_SIZE,
      Math.floor(currentColumn / options.SMALL_GRID_SIZE)* options.SMALL_GRID_SIZE
    ]
    // Cell is Selected -> if I just select it lol, if it's in the same 
    // row || column || small grid, it's highlighted
    setBoardState(prevBoard =>prevBoard.map((rows,row) => {
      return rows.map((cell, col) => {
        if (row === currentRow && col === currentColumn) {
          return {...cell, isSelected: true }
        }else if (row === currentRow || col === currentColumn) {
          return {...cell, isSelected: false, isHighlighted: true}
        }else if (
          row >= currentGridStart[0] 
          && row  < currentGridStart[0] + options.SMALL_GRID_SIZE
          && col >= currentGridStart[1] 
          && col  < currentGridStart[1] + options.SMALL_GRID_SIZE
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