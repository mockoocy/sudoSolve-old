import { Board } from "../types";
import isValid from "./isValid";


export function findEmpty(board: Board){
  for (let row of board){
    for (let cell of row){
      if (cell.value === 0) return cell
    }
  }
  return null
}



export default function solveSudoku(board: Board, smallGridSize: number){


  const sudokuSize = board.length;
  const blank = findEmpty(board);
  if (!blank){
    return true;
  }
  const {row, column} = blank;

  for (let i=1; i<=sudokuSize; i++){
    if (isValid(board, blank, i, smallGridSize)){
      board[row][column].value = i;
      if (solveSudoku(board, smallGridSize)){
        console.log(board)
        return board
      }
      board[row][column].value = 0;
    }
  }
  return false
}