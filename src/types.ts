export type Theme = {
  colors: {
    bgClr: string;
    standOutClr: string;
    notSelectedCellClr: string;
    selectedCellClr: string;
    gridGapClr: string;
    highlightCellClr: string;
    invalidCellClr: string;
  }
}

export type Cell = {
  row: number;
  column: number;
  value: number ;
  isSelected: boolean;
  isHighlighted: boolean;
  isValid: boolean;
}

type row = Cell[];
export type Board = row[];


export type Options = {
  SUDOKU_SIZE: number;
  SMALL_GRID_SIZE: number;
}