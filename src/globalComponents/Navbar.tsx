import React from 'react'
import styled from 'styled-components';
import {Icon} from "@iconify/react";
import { useGlobalContext } from '../globalContext';
import DropDownMenu from './DropDownMenu';
import { Theme } from '../types';
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
    #logo-text {
      font-size: 2rem;
      color: var(--standOutClr);
      @media (max-width: 820px){
        display: none;
      }
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

  const maxGridSize = 6 // Not sure if a cap is a good idea, but on the other hand - who wants to solve 64x64 sudoku or bigger, seems "a bit" hard
  const BOARD_SIZE_FACTOR_INCREMENT_VALUE = .125
  const BOARD_SIZE_FACTOR_MIN = .5
  const BOARD_SIZE_FACTOR_MAX = 1.5


  const listEls = Object.values(themes).map((theme, id) => (
    <li 
    key={`themeOption-${id}`}
    onClick={() => setTheme(theme)}>
      {theme.info.displayName}
    </li>
  ))

  function incrementGridSize(){
    if (options.SMALL_GRID_SIZE >= maxGridSize) return;
    setOptions(prevOptions => (
      {
        ...prevOptions,
        SMALL_GRID_SIZE: options.SMALL_GRID_SIZE + 1,
        SUDOKU_SIZE: (options.SMALL_GRID_SIZE + 1) * (options.SMALL_GRID_SIZE + 1)
      }
    ))
  }
  function decrementGridSize(){
    if (options.SMALL_GRID_SIZE <= 1) return;
    setOptions(prevOptions => (
      {
        ...prevOptions,
        SMALL_GRID_SIZE: options.SMALL_GRID_SIZE - 1,
        SUDOKU_SIZE: (options.SMALL_GRID_SIZE - 1) * (options.SMALL_GRID_SIZE - 1)
      }
    ))
  }

  function changeFilledCellsAmount(e: React.ChangeEvent<HTMLInputElement>){
    const newAmount = Number(e.target.value);
    if (newAmount < 0 || newAmount > options.SUDOKU_SIZE * options.SUDOKU_SIZE) return;
    setOptions(prevOptions => (
      {
        ...prevOptions,
        FILLED_CELLS_AMOUNT: newAmount
      }
    ))
  }

  function incrementBoardSizeFactor(){
    if (options.BOARD_SIZE_FACTOR >= BOARD_SIZE_FACTOR_MAX) return;

    setOptions({
      ...options, BOARD_SIZE_FACTOR: options.BOARD_SIZE_FACTOR + BOARD_SIZE_FACTOR_INCREMENT_VALUE
    })
  }

  function decrementBoardSizeFactor(){
    if (options.BOARD_SIZE_FACTOR <= BOARD_SIZE_FACTOR_MIN) return;
    setOptions({
      ...options, BOARD_SIZE_FACTOR: options.BOARD_SIZE_FACTOR - BOARD_SIZE_FACTOR_INCREMENT_VALUE
    })
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
        <li key={"Option-boardSizeFactor"}>  
        Board Size
        <div className="size-selector">
          <Icon icon="akar-icons:circle-minus" onClick={decrementBoardSizeFactor} className="sizer"/>
          {options.BOARD_SIZE_FACTOR}
          <Icon icon="akar-icons:circle-plus" onClick={incrementBoardSizeFactor} className="sizer"/>
        </div>
      </li>,
  ]

  return (
    <StyledNavbar>
      <div className="logo-container">
        <Icon icon="arcticons:sudokuoss" id="logo-svg" />
        <h1 id='logo-text'>Sudoku solver</h1>
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
