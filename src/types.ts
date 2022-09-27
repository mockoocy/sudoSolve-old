export type Theme = {
  info: {
    displayName: string;
  };
  colors: {
    [key: string]: string;
    bgClr: string;
    textClr: string;
    standOutClr: string;
    notSelectedCellClr: string;
    selectedCellClr: string;
    gridGapClr: string;
    highlightCellClr: string;
    invalidCellClr: string;
    prefilledCellClr: string;
  };
  gradientColors: {
    victoryScreenBgClr: string;
  };
  utils?: {
    hueRotationDeg: string;
    // degree to rotate from hsl(0, 100%, 65%)
  };
};

export type Cell = {
  row: number;
  column: number;
  value: number;
  isSelected: boolean;
  isHighlighted: boolean;
  isValid: boolean;
  isRemovable: boolean;
};

export type Coords = {
  row: number;
  column: number;
};

type Row = Cell[];
export type Board = Row[];

export type Matrix2D = number[][];

export type Options = {
  SUDOKU_SIZE: number;
  SMALL_GRID_SIZE: number;
  FILLED_CELLS_AMOUNT: number;
  BOARD_SIZE_FACTOR: number;
};

export type SmallGrid = {
  rowStart: number;
  rowEnd: number;
  colStart: number;
  colEnd: number;
};

export type SudokuCache = {
  [key: number]: number[];
};

export type Counter = {
  [key: number | string]: number;
};

export enum Colors {
  bgClr = "var(--bgClr)",
  standOutClr = "var(--standOutClr)",
  notSelectedCellClr = "var(--notSelectedCellClr)",
  selectedCellClr = "var(--selectedCellClr)",
  gridGapClr = "var(--gridGapClr)",
  highlightCellClr = "var(--highlightCellClr)",
  invalidCellClr = "var(--invalidCellClr)",
  prefilledCellClr = "var(--prefilledCellClr)",
}

export enum FontsEnum {
  Caveat = "Caveat",
  Inter = "Inter",
  JetBrainsMono = "JetBrains Mono",
  Lato = "Lato",
  Roboto = "Roboto",
  Rubik = "Rubik",
  DancingScript = "Dancing Script",
}

export enum FontWeights {
  light = 300,
  regular = 400,
  medium = 500,
  semiBold = 600,
  bold = 700,
}
