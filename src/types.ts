export type Theme = {
  colors: {
    bgClr: string;
    standOutClr: string;
    notSelectedCellClr: string;
    selectedCellClr: string;
    gridGapClr: string;
    highlightCellClr: string;
    invalidCellClr: string;
    prefilledCellClr: string;
  }
}

export type Cell = {
  row: number;
  column: number;
  value: number ;
  isSelected: boolean;
  isHighlighted: boolean;
  isValid: boolean;
  isRemovable: boolean;
}

export type Coords = {
  row: number;
  column: number;
}

type Row = Cell[];
export type Board = Row[];

export type SudokuBoard = number[][];


export type Options = {
  SUDOKU_SIZE: number;
  SMALL_GRID_SIZE: number;
  FILLED_CELLS_AMOUNT: number;
  SELECTED_FONT: string;
}

export type SmallGrid = {
  rowStart: number;
  rowEnd: number;
  colStart: number;
  colEnd: number
}

export type SudokuCache = {
  [key: number] : number[]
}

export type Counter = {
  [key: (number | string) ] : number
}