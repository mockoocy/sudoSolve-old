export type Theme = {
  colors: {
    bgClr: string;
    standOutClr: string;
    emptyCellClr: string;
    filledCellClr: string;
    gridGapClr: string;
  }
}

export type Cell = {
  row: number;
  column: number;
}

type row = number[];
export type Board = row[];


export type Options = {
  SUDOKU_SIZE: number;
  SMALL_GRID_SIZE: number;
}