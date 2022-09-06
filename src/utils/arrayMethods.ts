import { Board, Matrix2D } from "../types";

export function nestedNumbersToSudoku(board: Matrix2D) : Board{
// should change these type names someday lol
  return board.map((rows, row) => {
    return rows.map((cell, col)=> (
        {row: row,
        column: col,
        value: cell,
        isSelected: false,
        isHighlighted: false,
        isValid: true,
        isRemovable: cell === 0 ? true : false
      }
    ))
  })
}


export function sudokuToNestedNumbers(board: Board): Matrix2D{
  return board.map((rows, _)=>{
    return rows.map((cell, _)=> cell.value)
  })
}

export function arrayToSquareMatrix(arr: any[]){
  const rowSize = Math.sqrt(arr.length)
  const newMatrix = Array.from(new Array(rowSize), _ => Array(rowSize).fill(0));

  for (let cell=0; cell< rowSize * rowSize; cell++){
    const row = Math.floor(cell / rowSize)
    const col = cell % rowSize
    newMatrix[row][col] = arr[cell]
  }
  console.log(newMatrix)
  return newMatrix
}

