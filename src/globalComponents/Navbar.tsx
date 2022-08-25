import React from 'react'
import styled from 'styled-components';
import {Icon} from "@iconify/react";
import { useGlobalContext } from '../globalContext';
import DropDownMenu from './DropDownMenu';


const StyledNavbar = styled.nav`
  width: 100vw;
  height: 10%;
  padding: 0 2.5%;
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

export default function Navbar() {

  const {options, setOptions} = useGlobalContext();

  const listEls = [   <li> 
    elo
  </li>,
     <li> 
     elo
   </li>,
      <li> 
      elo
    </li>,
       <li> 
       elo
     </li>,
        <li> 
        elo
      </li>]

  return (
    <StyledNavbar>
      <div className="logo-container">
        <Icon icon="arcticons:sudokuoss" id="logo-svg" />
        <h1>Sudoku solver</h1>
      </div>
      <div className="btn-container">
        <DropDownMenu 
          icon={<Icon icon="eva:options-2-outline" id="options-btn" className="svg"/>}
          listElements={listEls}
        />
        <DropDownMenu
          icon={<Icon icon="carbon:color-palette" id="theme-selector-btn" className="svg"/>}
        />

      </div>
    </StyledNavbar>
  )
}
