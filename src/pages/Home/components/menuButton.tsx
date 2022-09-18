import React, { useState } from "react";
import styled from "styled-components";

const StyledMenuButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .btn {
    width: 100%;
    height: 3rem;
    padding: 0 1rem;
    font-size: 1.5rem;
    background-color: var(--standOutClr);
    border-radius: 1rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    border: 0;
    margin: 0.25rem;

    @media (max-width: 820px) {
      font-size: 1rem;
    }
    :hover {
      transform: scale(1.1);
      transition: all 250ms ease-in-out;
      filter: brightness(1.2);
    }
  }

  .icon {
    width: 1.375em;
    height: 1.375em;
    stroke-width: 2px;
  }
  .tooltip-container {
    display: flex;
    width: 90%;
    align-items: center;
    justify-content: center;
    .tooltip {
      padding: 0 5%;
      color: var(--standOutClr);
      font-size: 1.125rem;
      font-family: Lato, sans-serif;
    }
  }
`;

type Props = {
  text: string;
  tooltip: string;
  icon?: React.ReactNode;
  clickHandler?: () => void;
};

export default function MenuButton({
  tooltip,
  icon,
  clickHandler,
  text,
}: Props) {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <StyledMenuButton
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
      onTouchStart={() => setTooltipVisible(true)}
      onTouchEnd={() => setTooltipVisible(false)}
    >
      <button className="btn" onClick={clickHandler}>
        {text}
        {icon}
      </button>
      {tooltipVisible && (
        <div className="tooltip-container">
          <span className="tooltip">{tooltip}</span>
        </div>
      )}
    </StyledMenuButton>
  );
}
