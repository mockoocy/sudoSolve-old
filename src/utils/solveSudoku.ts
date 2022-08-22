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


// function orderValidValues(board: Board, cache: SudokuCache, smallGridSize: number) : [boolean, SudokuCache]{

//   const cachePriority: SudokuCache = {};
//   const countAppearanceRow: Counter[] = new Array(board.length);
//   const countAppearanceColumn: Counter[] = new Array(board.length);
//   const countAppearanceSmallGrid: Counter[] = new Array(board.length);
//   const tempSmallGridValues: {[key:number]: number[]} = {};

//   let valuesChanged = false;


//   for (let row=0; row<board.length; row++){
//     const tempRowArray: number[] = new Array(board.length);

//     for (let col=0; col<board.length; col++){
//       const cellIndex = row * board.length + col;
//       const smallGridId = Math.floor(col / smallGridSize) + smallGridSize * Math.floor(row / smallGridSize)
//       if (cache[cellIndex]) {
//         for (let val of cache[cellIndex]){
//           tempRowArray.push(val);

//           if (tempSmallGridValues[smallGridId]) {
//             tempSmallGridValues[smallGridId].push(val)
//           } else {
//             tempSmallGridValues[smallGridId] = [val]
//           }
//         }
//       }
//     }
//     countAppearanceRow[row] = counter(tempRowArray)
//   }

//   Object.keys(tempSmallGridValues).forEach(id=>{
//     const smallGridId = Number(id);
//     countAppearanceSmallGrid[smallGridId] = counter(tempSmallGridValues[smallGridId])
//   })

//   for (let col = 0; col < board.length; col++) {
//     const tempColArray: number[] = new Array(board.length);
//     for (let row=0; row<board.length; row++){
//       const cellIndex = row * board.length + col
//       if (cache[cellIndex]) for (let val of cache[cellIndex]){
//         tempColArray.push(val)
//       }
//     }
//   countAppearanceColumn[col] = counter(tempColArray);
//   }

//   for (let row=0; row<board.length; row++){
//     for (let col=0; col<board.length; col++){
//       const tempArray = [];
//       const cellIndex = row * board.length + col;
//       const smallGridId = smallGridSize * Math.floor(row / smallGridSize) 
//         + Math.floor(col / smallGridSize);
//       if (cache[cellIndex]) {
//         for (let val of cache[cellIndex]){
          

//           //to which value present in, we assign frequency in which said value appears
//           //in the cell, row, and small grid in which the current cell is located.
//           //By doing so we look for these values, which appear the least frequent,
//           //as it is most likely to be the value we want to put in our cell.
//           //Then, when we loop by values of cache[cellIndex], said values will be checked first
//           const appearanceFrequency = countAppearanceRow[row][val]
//             + countAppearanceColumn[col][val]
//             + countAppearanceSmallGrid[smallGridId][val];
//           tempArray.push(appearanceFrequency);
//         }
//         cachePriority[cellIndex] = tempArray;
        
//       }
//     }
//   }

//   for (let row=0; row<board.length;row++){
//     for (let col=0; col<board.length; col++){
//       const cellIndex = row * board.length + col;
//       if (cache[cellIndex]){
//         const tuples: [number,number][] = []
//         for (let i=0; i<cache[cellIndex].length; i++){
//           const currentFreq = cachePriority[cellIndex][i]
//           const currentVal = cache[cellIndex][i]
//           tuples.push([currentFreq, currentVal])
//         }
//         const tempArray = []
//         const sortedTuples = tuples.sort((firstTuple, secondTuple) => firstTuple[0] - secondTuple[0]);
//         for (let tuple of sortedTuples){
//           tempArray.push(tuple[1])
//         }
//         cache[cellIndex] = tempArray
//       }
//     }
//   }


//   for (let row=0; row<board.length; row++){
//     for (let col=0; col<board.length; col++){
//       const cellIndex = row * board.length + col;
//       const smallGridId = smallGridSize * Math.floor(row / smallGridSize) + Math.floor(col / smallGridSize)
//       if (cache[cellIndex]){
//         for (let val of cache[cellIndex]){
//           if (
//             countAppearanceColumn[col][val] === 1 
//             ||countAppearanceRow[row][val] === 1
//             ||countAppearanceSmallGrid[smallGridId][val] === 1
//           ){
//             board[row][col].value = val;
//             valuesChanged = true;
//           }
//         }
//       }
//     }
//   }
//   return [valuesChanged, cache]
// }
export default function solveSudoku(board: Board, cache: SudokuCache, smallGridSize: number){
  // let valuesFound = false;
  // while (valuesFound) {
  //   const cacheValid = cacheValidValues(board, smallGridSize);
  //   const orderValidValuesReturn = orderValidValues(board, cacheValid, smallGridSize);
  //   valuesFound = orderValidValuesReturn[0]
  //   cache = orderValidValuesReturn[1];
  // }
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


      if (solveSudoku(board, cache, smallGridSize)){
        return true;
      }
      board[row][column].value = 0;
    }
  }

  return false
}