import { Board, SudokuCache } from "../types";
import isValid from "./isValid";
import getCurrentGrid from "./getCurrentGrid";


export function findEmpty(board: Board){
  for (let row of board){
    for (let cell of row){
      if (cell.value === 0) return cell
    }
  }
  return null
}

function allowedValues(board: Board, currentRow: number, currentCol: number, smallGridSize: number){
  const numbersList: number[] = [];

  for (let num=1; num<=board.length; num++){
    let found = false;

    for (let row=0; row<board.length; row++){
      if (board[row][currentCol].value === num) {
        found = true;
        break
      }
    }

    if (!found){
      for (let col=0; col<board.length; col++){
        if (board[currentRow][col].value === num) {
          found = true;
          break
        }
      }
    }
    if (!found){
      const currentGrid = getCurrentGrid(currentRow, currentCol, smallGridSize)
      for (let row=currentGrid.rowStart; row<currentGrid.rowEnd; row++){
        for (let col=currentGrid.colStart; col<currentGrid.colEnd; col++){
          if (board[row][col].value === num){
            found = true;
            break
          }
        }
      }
    }
    if (!found) numbersList.push(num)
  }
  return numbersList
}

export function cacheValidValues(board: Board, smallGridSize: number){
  const cache : SudokuCache = {};
  for (let row=0; row<board.length; row++){
    for (let col=0; col<board.length; col++){
      const cellIndex = row * board.length + col
      if (board[row][col].value === 0) cache[cellIndex] = allowedValues(board, row, col,smallGridSize)
    }
  }
  return cache
}



export default function solveSudoku(board: Board, cache: SudokuCache, smallGridSize: number){
  const blank = findEmpty(board);
  if (!blank){
    return true;
  }
  const {row, column} = blank;
  const cellIndex = row* board.length + column;
  for (let val of cache[cellIndex]){
    if (isValid(board, blank, val, smallGridSize)){
      board[row][column].value = val;

      if (solveSudoku(board, cache, smallGridSize)){
        return true;
      }
      board[row][column].value = 0;
    }
  }

  return false
}