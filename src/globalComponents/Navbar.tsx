import React from 'react'
import styled from 'styled-components';
import {Icon} from "@iconify/react";
import { useGlobalContext } from '../globalContext';
import DropDownMenu from './DropDownMenu';
import { Options, Theme } from '../types';
import themes from '../utils/themes';


const StyledNavbar = styled.nav`
  width: 100vw;
  height: 10%;
  padding: 0 5%;
  box-shadow: .125rem 0 .25rem var(--standOutClr);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo-container {
    display: flex;
    align-items: center;
    gap: .25rem;
    #logo-svg {
      width: 2.25rem;
      height: 2.25rem;
      stroke-width: 2px;
      transform: rotate(10deg);
      color: var(--standOutClr)
    }
    h1 {
      font-size: 2rem;
      color: var(--standOutClr);
    }
  }
  .btn-container{
    display: flex;
    align-items: center;
    gap: .25rem;
    .svg {
      width: 2.5rem;
      height: 2.5rem; 
      color: var(--standOutClr)
    }
  }

`

type Props = {
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

export default function Navbar({setTheme}: Props) {

  const {options, setOptions} = useGlobalContext();

  const listEls = Object.values(themes).map((theme, id) => (
    <li 
    key={`themeOption-${id}`}
    onClick={() => setTheme(theme)}>
      {theme.info.displayName}
    </li>
  ))

  function incrementGridSize(){
    const newOptions: Options = {...options, SMALL_GRID_SIZE: options.SMALL_GRID_SIZE + 1,
    SUDOKU_SIZE: (options.SMALL_GRID_SIZE + 1)  * (options.SMALL_GRID_SIZE + 1)}
    setOptions(newOptions)
  }
  function decrementGridSize(){
    const newOptions: Options = {...options,
      SMALL_GRID_SIZE: options.SMALL_GRID_SIZE - 1
    , SUDOKU_SIZE: (options.SMALL_GRID_SIZE -1)  * (options.SMALL_GRID_SIZE -1) }
    setOptions(newOptions)
  }

  function changeFilledCellsAmount(e: React.ChangeEvent<HTMLInputElement>){
    const newAmount = Number(e.target.value);
    if (newAmount < 0 || newAmount > options.SUDOKU_SIZE * options.SUDOKU_SIZE) return;
    const newOptions: Options= {...options, FILLED_CELLS_AMOUNT: newAmount}
    setOptions(newOptions)
  }

  const optionsElements = [
    <li key={"Option-SudokuSize"}>  
      Sudoku Size
      <div className="size-selector">
        <Icon icon="akar-icons:circle-minus" onClick={decrementGridSize} className="sizer"/>
        {options.SMALL_GRID_SIZE}
        <Icon icon="akar-icons:circle-plus" onClick={incrementGridSize} className="sizer"/>
      </div>
    </li>,
    <li key={"Option-filledCells"}>
      Filled cells
      <input type="number" 
      min={0} 
      max={options.SUDOKU_SIZE*options.SUDOKU_SIZE} 
      className="cells-amount" 
      value={options.FILLED_CELLS_AMOUNT} 
      onChange={e => changeFilledCellsAmount(e)}/>
    </li>,
  ]

  return (
    <StyledNavbar>
      <div className="logo-container">
        <Icon icon="arcticons:sudokuoss" id="logo-svg" />
        <h1>Sudoku solver</h1>
      </div>
      <div className="btn-container">
        <DropDownMenu 
          icon={<Icon icon="carbon:color-palette" id="options-btn" className="svg"/>}
          listElements={listEls}
        />
        <DropDownMenu
          icon={<Icon icon="eva:options-2-outline" id="theme-selector-btn" className="svg"/>}
          listElements={optionsElements}
        />

      </div>
    </StyledNavbar>
  )
}
