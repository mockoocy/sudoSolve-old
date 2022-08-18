import React from 'react';
import styled from "styled-components";
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
  value: number | "";
  cell: Cell;
  modifyBoard: (arg0: number, arg1: number, arg2: number) => void;
}

export default function SudokuCell({maxNumber, cell, value, modifyBoard}: Props) {
  const {row, column} = cell;


  const SIZE_SMALL = 3;


  function getBorderStyles(row: number, column: number) : string{
    const borderBottom = `${(row + 1) % SIZE_SMALL === 0 ? "border-bottom: 3px solid var(--gridGapClr);": ""}`;
    const borderRight = `${(column + 1) % SIZE_SMALL === 0 ? "border-right: 3px solid var(--gridGapClr);": ""}`;
    const borderStyles = borderBottom + borderRight;
    return borderStyles ?  borderStyles : ""
  }

  return (
    <StyledSudokuCell bgClr="var(--standOutClr)" border={getBorderStyles(row, column)} >
      <input className={`number-input`} 
      type="number" 
      min={1} 
      max={maxNumber}
      value={value}
      onChange={(e) => modifyBoard(row, column, Number(e.target.value)) }/>
    </StyledSudokuCell>
  )
}
