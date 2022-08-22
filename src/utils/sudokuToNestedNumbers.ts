import { Board, SudokuBoard } from "../types";

export default function sudokuToNestedNumbers(board: Board): SudokuBoard{
  return board.map((rows,row)=>{
    return rows.map((cell, col)=> cell.value)
  })
}