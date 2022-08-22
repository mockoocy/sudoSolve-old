import { Board, SudokuBoard } from "../types";

export default function nestedNumbersToSudoku(board: SudokuBoard) : Board{
// should change these type names someday lol
  return board.map((rows, row) => {
    return rows.map((cell, col)=> (
        {row: row,
        column: col,
        value: cell,
        isSelected: false,
        isHighlighted: false,
        isValid: true,
      }
    ))
  })
}