import React from 'react'
import styled from 'styled-components';
import {Icon} from "@iconify/react";

const StyledNavbar = styled.nav`
  width: 100vw;
  height: 10%;
  padding: 0 2.5%;
  border-bottom: 2px solid var(--standOutClr);
  display: flex;
  align-items: center;

  .logo-container {
    display: flex;
    align-items: center;
    gap: .25rem;
    .svg {
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

`

export default function Navbar() {
  return (
    <StyledNavbar>
      <div className="logo-container">
        <Icon icon="arcticons:sudokuoss" className="svg" />
        <h1>Sudoku solver</h1>
      </div>
    </StyledNavbar>
  )
}
