import { Coords, SudokuBoard } from "../types";
import getCurrentGrid from "./getCurrentGrid";

export default function isValid(board: SudokuBoard, currentCell: Coords, value: number, smallGridSize: number){


  const sudokuSize = smallGridSize * smallGridSize;
  const {row: currentRow, column: currentColumn} = currentCell


  let valid = true;
  const currentGrid = getCurrentGrid(currentRow, currentColumn, smallGridSize);
  for (let row=0; row<sudokuSize; row++){
    if (board[row][currentColumn] === value) {
      valid = false
      break}
  }
  if (valid) for (let col=0; col<sudokuSize; col++){
    if (board[currentRow][col] === value) {
      valid = false;
      break;
    }
  }
  if (valid) for (let row=currentGrid.rowStart; row<currentGrid.rowEnd; row++){
    for (let col=currentGrid.colStart; col<currentGrid.colEnd; col++){
      if (board[row][col] === value) {
        valid= false; 
        break;
      }
    }
  }
  return valid
}