import React from 'react';
import styled from "styled-components";
import { useGlobalContext } from '../globalContext';
import {Cell} from "../types"
type StyledProps = {
  bgClr: string;
  border: string;
}

const StyledSudokuCell = styled.div<StyledProps>`
  outline: 1px solid var(--gridGapClr);
  background-color: ${props => props.bgClr};
  aspect-ratio: 1;
  border-top: 3px solid black;
  border-left: 3px solid black;

  ${props => props.border}

  .number-input{
    all: unset;
    width: 100%;
    height: 100%;
    font-size: 2rem;
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
    const borderStyles = borderBottom + borderRight;
    return borderStyles ?  borderStyles : ""
  }

  function getCellClr(cell:Cell): string{

    if (cell.isHighlighted){
      return "var(--highlightCellClr)"
    }else if (!cell.isRemovable) {
      return "var(--prefilledCellClr)"
    } else if (!cell.isValid){
      return "var(--invalidCellClr)"
    } else if (cell.isSelected) {
      return "var(--selectedCellClr)"
    } 
    return 'var(--notSelectedCellClr)'
  }


  return (
    <StyledSudokuCell 
    bgClr={getCellClr(cell)}
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