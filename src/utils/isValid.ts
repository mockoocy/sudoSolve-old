import { Board, Cell } from "../types";
import getCurrentGrid from "./getCurrentGrid";

export default function isValid(board: Board, currentCell: Cell, value: number, smallGridSize: number){

  const sudokuSize = smallGridSize * smallGridSize;
  const {row: currentRow, column: currentColumn} = currentCell


  let valid = true;
  const currentGrid = getCurrentGrid(currentRow, currentColumn, smallGridSize);
  for (let row=0; row<sudokuSize; row++){
    if (board[row][currentColumn].value === value) {
      valid = false}
  }
  for (let col=0; col<sudokuSize; col++){
    if (board[currentRow][col].value === value) valid = false
  }
  for (let row=currentGrid.rowStart; row<currentGrid.rowEnd; row++){
    for (let col=currentGrid.colStart; col<currentGrid.colEnd; col++){
      if (board[row][col].value === value) valid = false
    }
  }
  return valid
}