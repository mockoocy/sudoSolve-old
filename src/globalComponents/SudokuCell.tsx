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
}

const  SudokuCell = React.forwardRef<HTMLInputElement, Props>(({maxNumber, cell}: Props, ref) =>{
  const {row, column} = cell;
  const {modifyBoard, selectCell} = useGlobalContext();

  const SIZE_SMALL = 3;



  function getBorderStyles(row: number, column: number) : string{
    const borderBottom = `${(row + 1) % SIZE_SMALL === 0 ? "border-bottom: 3px solid var(--gridGapClr);": ""}`;
    const borderRight = `${(column + 1) % SIZE_SMALL === 0 ? "border-right: 3px solid var(--gridGapClr);": ""}`;
    const borderStyles = borderBottom + borderRight;
    return borderStyles ?  borderStyles : ""
  }

  function getCellClr(cell:Cell): string{
    if (cell.isSelected) {
      return "var(--selectedCellClr)"
    } else if (cell.isHighlighted) {
      return "var(--highlightCellClr)"
    }
    return 'var(--notSelectedCellClr)'
  }


  return (
    <StyledSudokuCell 
    bgClr={getCellClr(cell)}
    border={getBorderStyles(row, column)} 
    onFocus={() => selectCell(row, column, cell)}
    >
      <input className={`number-input`} 
      type="number" 
      min={1} 
      ref={ref}
      max={maxNumber}
      value={cell.value > 0 ? cell.value : " "}
      onChange={(e) => modifyBoard(row, column, Number(e.target.value)) }/>
    </StyledSudokuCell>
  )
})

export default SudokuCell;