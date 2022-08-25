import React, { useState } from 'react';
import styled from 'styled-components';
import useOuterClick from '../hooks/useOuterClick';


const StyledDropDownMenu = styled.div`
  position: relative;
  .drop-down {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    align-items: center;
    min-width: 16vw;
    background: var(--bgClr);
    border: 2px solid var(--standOutClr);
    border-radius: 1rem;
    padding: 0 .5rem;
    right: 0;
    left: -10vw;

    @media (max-width:820px){
      width: 100%;
      right: 0;
      font-size: 0.875rem;
    }

    &>li{
      position: relative;
      width: 100%;
      height: 3rem;
      font-family: Lato, sans-serif;
      font-size: 1.25rem;
      color: var(--standOutClr);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 .25rem;
      transition: all 250ms ease-in-out;

      @media (max-width:820px){
        height: 2rem;
      }

      :not(:last-child){
        border-bottom: 1px solid var(--standOutClr);
      }

      :hover{
        transform: scale(1.1);
        filter: brightness(1.2) ;
      }

      ::marker {
        content: '';
      }
      .size-selector{
        display: flex;
        align-items: center;
        font-size: 1.5rem;
      }
      .cells-amount{
        all: unset;
        width: 3ch;
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
    }
  }
`

type Props = {
  icon: React.ReactNode;
  listElements?: React.ReactNode | React.ReactNode[];
}


export default function DropDownMenu({icon, listElements}: Props) {

  const [open, setOpen] = useState(false);
  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);
  const selfRef = useOuterClick(closeMenu)


  return (
    <StyledDropDownMenu ref={selfRef} onClick={openMenu}>
      {icon}
      {open &&
        <ul className="drop-down">
          {listElements}
        </ul>
      }
    </StyledDropDownMenu>
  )
}
