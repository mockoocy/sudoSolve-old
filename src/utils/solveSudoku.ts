import { Board, Counter, SudokuCache } from "../types";
import isValid from "./isValid";
import getCurrentGrid from "./getCurrentGrid";
import counter from "./counter";


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

function getAppearanceCounts(board: Board, cache: SudokuCache, smallGridSize: number){
  const countAppearanceRow: Counter[] = [];
  const countAppearanceColumn: Counter[] = [];
  const countAppearanceSmallGrid: Counter[] = [];

  const tempArraySmallGrid: number[][] = new Array(board.length).fill([]);
  for (let row=0; row<board.length; row++){
    const tempArrayRow: number[] = new Array(board.length);
    for (let col=0; col<board.length; col++){
      const cellIndex = row * board.length + col;
      const smallGridId = Math.floor(col / smallGridSize) + smallGridSize * Math.floor(row / smallGridSize)
      if (cache[cellIndex]) for (let val of cache[cellIndex]){
        tempArrayRow.push(val);
        tempArraySmallGrid[smallGridId].push(val)
      }
    }
    countAppearanceRow[row] = counter(tempArrayRow)
  }

  tempArraySmallGrid.forEach((smallGrid, id)=> {
    countAppearanceSmallGrid[id] = counter(smallGrid)
  })

  for (let col=0; col<board.length; col++){
    const tempArray = [];
    for (let row=0; row<board.length; row++){
      const cellIndex = row * board.length + col 
      if (cache[cellIndex]) for (let val of cache[cellIndex]){
        tempArray.push(val)
      }
    }
    countAppearanceColumn[col] = counter(tempArray)
  }

  return {
    countAppearanceRow,
    countAppearanceColumn,
    countAppearanceSmallGrid
  }
}

export function preFillSudoku(board: Board, cache: SudokuCache, smallGridSize: number){
  const AppearanceCounts = getAppearanceCounts(board, cache, smallGridSize);
  const {countAppearanceColumn, countAppearanceRow, countAppearanceSmallGrid} = AppearanceCounts;

  for (let row=0; row<board.length; row++){
    for (let col=0; col<board.length; col++){
      const cellIndex = row * board.length + col;
      const smallGridId = smallGridSize * Math.floor(row / smallGridSize) + Math.floor(col / smallGridSize)
      if (cache[cellIndex]) for (let val of cache[cellIndex]){
        if (
          countAppearanceColumn[col][val] === 1 
          ||countAppearanceRow[row][val] === 1
          ||countAppearanceSmallGrid[smallGridId][val] === 1
          ){
            board[row][col].value = val
          }
      }
    }
  }

}

export default function solveSudoku(board: Board, cache: SudokuCache, smallGridSize: number){
  const blank = findEmpty(board);
  if (!blank){
    return true;
  }

  const {row, column} = blank;
  const cellIndex = row* board.length + column;
  //console.log(`current Cell:${cellIndex}`)
  for (let val of cache[cellIndex]){
    if (isValid(board, blank, val, smallGridSize)){
      board[row][column].value = val;
      cache = cacheValidValues(board, smallGridSize);
      preFillSudoku(board, cache, smallGridSize)


      if (solveSudoku(board, cache, smallGridSize)){
        return true;
      }
      board[row][column].value = 0;
    }
  }

  return false
}