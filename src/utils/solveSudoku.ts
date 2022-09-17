import { Coords, Counter, Matrix2D, SudokuCache } from "../types";
import isValid from "./isValid";
import getCurrentGrid from "./getCurrentGrid";
import counter from "./counter";

const getCellIndex = (row: number, col: number, sudokuSize: number) =>
  row * sudokuSize + col;

export function findEmpty(board: Matrix2D): Coords | null {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      if (board[row][col] === 0) return { row, column: col };
    }
  }
  return null;
}

function allowedValues(
  board: Matrix2D,
  currentRow: number,
  currentCol: number,
  smallGridSize: number
) {
  const numbersList: number[] = [];

  for (let num = 1; num <= board.length; num++) {
    let found = false;

    for (let row = 0; row < board.length; row++) {
      if (board[row][currentCol] === num) {
        found = true;
        break;
      }
    }

    if (!found) {
      for (let col = 0; col < board.length; col++) {
        if (board[currentRow][col] === num) {
          found = true;
          break;
        }
      }
    }
    if (!found) {
      const currentGrid = getCurrentGrid(currentRow, currentCol, smallGridSize);
      for (let row = currentGrid.rowStart; row < currentGrid.rowEnd; row++) {
        for (let col = currentGrid.colStart; col < currentGrid.colEnd; col++) {
          if (board[row][col] === num) {
            found = true;
            break;
          }
        }
      }
    }
    if (!found) numbersList.push(num);
  }
  return numbersList;
}

export function cacheValidValues(board: Matrix2D, smallGridSize: number) {
  const cache: SudokuCache = {};
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      const cellIndex = getCellIndex(row, col, board.length);
      if (board[row][col] === 0)
        cache[cellIndex] = allowedValues(board, row, col, smallGridSize);
    }
  }
  return cache;
}

function orderValidValues(
  board: Matrix2D,
  cache: SudokuCache,
  smallGridSize: number
): [boolean, SudokuCache] {
  const cachePriority: SudokuCache = {};
  const countAppearanceRow: Counter[] = new Array(board.length);
  const countAppearanceColumn: Counter[] = new Array(board.length);
  const countAppearanceSmallGrid: Counter[] = new Array(board.length);
  const tempSmallGridValues: { [key: number]: number[] } = {};

  let valuesChanged = false;

  for (let row = 0; row < board.length; row++) {
    const tempRowArray: number[] = new Array(board.length);

    for (let col = 0; col < board.length; col++) {
      const cellIndex = getCellIndex(row, col, board.length);
      const smallGridId =
        Math.floor(col / smallGridSize) +
        smallGridSize * Math.floor(row / smallGridSize);
      if (cache[cellIndex]) {
        for (let val of cache[cellIndex]) {
          tempRowArray.push(val);

          if (tempSmallGridValues[smallGridId]) {
            tempSmallGridValues[smallGridId].push(val);
          } else {
            tempSmallGridValues[smallGridId] = [val];
          }
        }
      }
    }
    countAppearanceRow[row] = counter(tempRowArray);
  }

  Object.keys(tempSmallGridValues).forEach((id) => {
    const smallGridId = Number(id);
    countAppearanceSmallGrid[smallGridId] = counter(
      tempSmallGridValues[smallGridId]
    );
  });

  for (let col = 0; col < board.length; col++) {
    const tempColArray: number[] = new Array(board.length);
    for (let row = 0; row < board.length; row++) {
      const cellIndex = getCellIndex(row, col, board.length);
      if (cache[cellIndex])
        for (let val of cache[cellIndex]) {
          tempColArray.push(val);
        }
    }
    countAppearanceColumn[col] = counter(tempColArray);
  }

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      const tempArray = [];
      const cellIndex = getCellIndex(row, col, board.length);
      const smallGridId =
        smallGridSize * Math.floor(row / smallGridSize) +
        Math.floor(col / smallGridSize);
      if (cache[cellIndex]) {
        for (let val of cache[cellIndex]) {
          //to which value present in, we assign frequency in which said value appears
          //in the cell, row, and small grid in which the current cell is located.
          //By doing so we look for these values, which appear the least frequent,
          //as it is most likely to be the value we want to put in our cell.
          //Then, when we loop by values of cache[cellIndex], said values will be checked first
          const appearanceFrequency =
            countAppearanceRow[row][val] +
            countAppearanceColumn[col][val] +
            countAppearanceSmallGrid[smallGridId][val];
          tempArray.push(appearanceFrequency);
        }
        cachePriority[cellIndex] = tempArray;
      }
    }
  }

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      const cellIndex = getCellIndex(row, col, board.length);
      if (cache[cellIndex]) {
        const tuples: [number, number][] = [];
        for (let i = 0; i < cache[cellIndex].length; i++) {
          const currentFreq = cachePriority[cellIndex][i];
          const currentVal = cache[cellIndex][i];
          tuples.push([currentFreq, currentVal]);
        }
        const tempArray = [];
        const sortedTuples = tuples.sort(
          (firstTuple, secondTuple) => firstTuple[0] - secondTuple[0]
        );
        for (let tuple of sortedTuples) {
          tempArray.push(tuple[1]);
        }
        cache[cellIndex] = tempArray;
      }
    }
  }

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      const cellIndex = getCellIndex(row, col, board.length);
      const smallGridId =
        smallGridSize * Math.floor(row / smallGridSize) +
        Math.floor(col / smallGridSize);
      if (cache[cellIndex]) {
        for (let val of cache[cellIndex]) {
          if (
            countAppearanceColumn[col][val] === 1 ||
            countAppearanceRow[row][val] === 1 ||
            countAppearanceSmallGrid[smallGridId][val] === 1
          ) {
            board[row][col] = val;
            valuesChanged = true;
          }
        }
      }
    }
  }
  return [valuesChanged, cache];
}
export default function solveSudoku(
  board: Matrix2D,
  smallGridSize: number,
  cache = cacheValidValues(board, smallGridSize),
  valuesFound = true
): boolean {
  while (valuesFound) {
    const cacheValid = cacheValidValues(board, smallGridSize);
    const orderedCacheReturn = orderValidValues(
      board,
      cacheValid,
      smallGridSize
    );
    valuesFound = orderedCacheReturn[0];
    cache = orderedCacheReturn[1];
  }
  const blank = findEmpty(board);
  if (!blank) {
    return true;
  }

  const { row, column } = blank;
  const cellIndex = getCellIndex(row, column, board.length);
  for (let val of cache[cellIndex]) {
    if (isValid(board, blank, val, smallGridSize)) {
      board[row][column] = val;

      if (solveSudoku(board, smallGridSize, cache, valuesFound)) {
        return true;
      }
      board[row][column] = 0;
    }
  }
  return false;
}
