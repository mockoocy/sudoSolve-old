import React, { useState } from "react";
import styled from "styled-components";
import useOuterClick from "../hooks/useOuterClick";

const StyledDropDownMenu = styled.div`
  position: relative;
  --min-width: 20vw;

  .drop-down {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    align-items: center;
    min-width: var(--min-width);
    background: var(--bgClr);
    border: 2px solid var(--standOutClr);
    border-radius: 1rem;
    padding: 0 0.5rem;
    right: 0;
    left: calc(-0.75 * var(--min-width));

    @media (max-width: 820px) {
      --min-width: 60vw;
      min-width: 50vw;
      font-size: 0.875rem;
    }

    & > li {
      position: relative;
      width: 95%;
      height: 3rem;
      font-family: Lato, sans-serif;
      font-size: 1.25rem;
      color: var(--standOutClr);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2.5%;
      transition: all 250ms ease-in-out;

      @media (max-width: 820px) {
        font-size: 1rem;
        height: 3rem;
      }

      :not(:last-child) {
        border-bottom: 1px solid var(--standOutClr);
      }

      :hover {
        transform: scale(1.1);
        filter: brightness(1.2);
      }

      ::marker {
        content: "";
      }
      .cells-amount {
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
`;

type Props = {
  icon: React.ReactNode;
  listElements?: React.ReactNode | React.ReactNode[];
};

export default function DropDownMenu({ icon, listElements }: Props) {
  const [open, setOpen] = useState(false);
  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);
  const selfRef = useOuterClick(closeMenu);

  return (
    <StyledDropDownMenu ref={selfRef} onClick={openMenu}>
      {icon}
      {open && <ul className="drop-down">{listElements}</ul>}
    </StyledDropDownMenu>
  );
}
