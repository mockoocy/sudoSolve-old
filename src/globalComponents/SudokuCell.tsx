import React from 'react';
import styled from "styled-components";
import { useGlobalContext } from '../globalContext';
import {Cell, Colors} from "../types"
type StyledProps = {
  cellClr: string;
  border: string;
  sudokuSize: number;
  radiuses: string;
}

const StyledSudokuCell = styled.div<StyledProps>`
  /* outline: 1px solid var(--gridGapClr); */
  background-color: ${props => props.cellClr};
  aspect-ratio: 1;
  border-top: 3px solid black;
  border-left: 3px solid black;
  --sudokuSize: ${props => props.sudokuSize};

  ${props => props.border}
  ${props => props.radiuses}

  .number-input{
    all: unset;
    width: 100%;
    height: 100%;
    font-size: calc(2rem * 5 / var(--sudokuSize));
    color: var(--gridGapClr);
    text-align: center;
    font-family: "jetbrains mono", "Lato", sans-serif;
    -moz-appearance: textfield;

    @media (max-width:820px){
      font-size: calc(2rem * 3 / var(--sudokuSize));

    }
    
  } 
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

type Props = {
  maxNumber: number;
  cell: Cell;
  moveOnBoard: Function;
}

const  SudokuCell = React.forwardRef<HTMLInputElement, Props>(({maxNumber, cell, moveOnBoard}: Props, ref) =>{
  const {row, column} = cell;
  const {modifyBoard, selectCell, options} = useGlobalContext();

  const CELL_BORDER_RADIUS = "1.625rem"
  const CELL_BORDER_WIDTH = "3px" 


  function getBorderStyles(row: number, column: number, smallGridSize: number) : string{
    if (smallGridSize === 1) return ""
    const borderBottom = `${(row + 1) % smallGridSize === 0 ? `border-bottom: ${CELL_BORDER_WIDTH} solid var(--gridGapClr);`: ""}`;
    const borderRight = `${(column + 1) % smallGridSize === 0 ? `border-right: ${CELL_BORDER_WIDTH} solid var(--gridGapClr);`: ""}`;
    const borderLeft = `${(column + 1) % smallGridSize === 1 ? `border-left: ${CELL_BORDER_WIDTH} solid var(--gridGapClr);` : ""}`
    const borderTop = `${(row + 1 ) % smallGridSize === 1 ? `border-top: ${CELL_BORDER_WIDTH} solid var(--gridGapClr);` : ""}`
    
    return  borderBottom + borderRight + borderLeft + borderTop;
  }

  function getCellClr(cell:Cell): string{

    if (!cell.isValid){
      return Colors.invalidCellClr
    } else if(cell.isSelected){
      return Colors.selectedCellClr
    }
    else if (cell.isHighlighted) {
      return Colors.highlightCellClr
    } else if (!cell.isRemovable){
      return Colors.prefilledCellClr
    }
    return Colors.notSelectedCellClr
  }

  function getBorderRadius(row: number, col: number, smallGridSize: number): string {
    if (smallGridSize === 1) return ""
    const radiusTopLeft = `${
      (row + 1 ) % smallGridSize === 1 && (col + 1) % smallGridSize === 1
      ? `border-top-left-radius: ${CELL_BORDER_RADIUS};`
      : ""
    }`
    const radiusTopRight = `${
      (row + 1 ) % smallGridSize === 1 && (col + 1) % smallGridSize === 0
      ? `border-top-right-radius: ${CELL_BORDER_RADIUS};`
      : ""
    }`
    const radiusBottomRight = `${
      (row + 1 ) % smallGridSize === 0 && (col + 1) % smallGridSize === 0
      ? `border-bottom-right-radius: ${CELL_BORDER_RADIUS};`
      : ""
    }`
    const radiusBottomLeft = `${
      (row + 1 ) % smallGridSize === 0 && (col + 1) % smallGridSize === 1
      ? `border-bottom-left-radius: ${CELL_BORDER_RADIUS};`
      : ""
    }`
    return radiusTopLeft + radiusTopRight + radiusBottomLeft + radiusBottomRight
  }


  return (
    <StyledSudokuCell 
    cellClr={getCellClr(cell)}
    border={getBorderStyles(row, column, options.SMALL_GRID_SIZE)} 
    sudokuSize={options.SMALL_GRID_SIZE}
    radiuses={getBorderRadius(row, column, options.SMALL_GRID_SIZE)}
    onFocus={() => selectCell(row, column, cell)}
    // Using onKeyDown event, because then I can prevent numbers from (in/de)crementing on pressing
    // up/down arrow
    onKeyDown={e => moveOnBoard(e, row, column)}
    >
      <input className={`number-input`} 
      type="number" 
      min={1} 
      ref={ref}
      max={maxNumber}
      value={cell.value > 0 ? cell.value : " "}
      onChange={(e) => modifyBoard(row, column, e.target.valueAsNumber) }/>
    </StyledSudokuCell>
  )
})

export default SudokuCell;