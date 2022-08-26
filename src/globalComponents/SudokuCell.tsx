import React from 'react';
import styled from "styled-components";
import { useGlobalContext } from '../globalContext';
import {Cell, Colors} from "../types"
type StyledProps = {
  cellClr: string;
  border: string;
}

const StyledSudokuCell = styled.div<StyledProps>`
  outline: 1px solid var(--gridGapClr);
  background-color: ${props => props.cellClr};
  aspect-ratio: 1;
  border-top: 3px solid black;
  border-left: 3px solid black;

  ${props => props.border}

  .number-input{
    all: unset;
    width: 100%;
    height: 100%;
    font-size: 2rem;
    color: var(--gridGapClr);
    text-align: center;
    font-family: var(--fontDefault);
    -moz-appearance: textfield;
    
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



  function getBorderStyles(row: number, column: number) : string{
    const borderBottom = `${(row + 1) % options.SMALL_GRID_SIZE === 0 ? "border-bottom: 3px solid var(--gridGapClr);": ""}`;
    const borderRight = `${(column + 1) % options.SMALL_GRID_SIZE === 0 ? "border-right: 3px solid var(--gridGapClr);": ""}`;
    const borderLeft = `${column === 0 ? "border-left: 3px solid var(--gridGapClr);" : ""}`
    const borderTop = `${row === 0 ? "border-top: 3px solid var(--gridGapClr);" : ""}`
    
    const borderStyles = borderBottom + borderRight + borderLeft + borderTop;
    return borderStyles ?? ""
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


  return (
    <StyledSudokuCell 
    cellClr={getCellClr(cell)}
    border={getBorderStyles(row, column)} 
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