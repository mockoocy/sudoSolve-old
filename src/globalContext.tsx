import React, {useState, useContext} from "react";
import { Board, Options } from "./types";



type Props = {
  children: React.ReactNode[] | React.ReactNode
}

type ContextValue = {
  boardState: Board;
  setBoardState: Function;
  modifyBoard: (arg0: number, arg1: number, arg2: number) => void;
  options: Options;
}

export const SudokuContext = React.createContext<ContextValue>({boardState: [], setBoardState: () => {}, modifyBoard: () => {}, options: {SUDOKU_SIZE: 9, SMALL_GRID_SIZE: 3}});

export function SudokuProvider({children}: Props){
  const [options, setOptions] = useState<Options>({
    SUDOKU_SIZE: 9,
    SMALL_GRID_SIZE: 3
  })

  const [boardState, setBoardState] = useState<Board>(
  [
    [0,0,0,6,9,0,7,0,2],
    [0,0,0,0,0,1,0,0,0],
    [2,0,0,0,8,0,1,0,5],
    [0,0,0,0,6,0,4,3,0],
    [1,0,3,0,4,0,5,0,8],
    [0,7,6,0,4,0,5,0,8],
    [3,0,2,0,7,0,0,0,4],
    [0,0,0,2,0,0,0,0,0],
    [8,0,9,0,1,6,0,0,0],
  ])

  function modifyBoard(currentRow: number, currentColumn: number, value: number){
    console.log(value)
    if (value > options.SUDOKU_SIZE ) return;
    setBoardState(board => board.map((rows, row) => rows.map((cell, col) => {
      if (row === currentRow && col === currentColumn) {
        return value;
      }
      return cell
    })))
  }
  
  return (
    <SudokuContext.Provider value= {{
      boardState,
      setBoardState,
      modifyBoard,
      options
    }}>
      {children}
    </SudokuContext.Provider>
  )
}

export function useGlobalContext(){
  return useContext(SudokuContext)
}