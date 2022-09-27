import React from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";

const StyledOptionButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem;

  .icon-container {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .sizer:hover {
    cursor: pointer;
    transform: scale(1.15);
    transition: all 250ms ease-in-out;
  }
`;

type Props = {
  text: string;
  value: number | string;
  incrementFunction: () => void;
  decrementFunction: () => void;
};

export default function OptionButton({
  text,
  value,
  incrementFunction,
  decrementFunction,
}: Props) {
  // represents button which changes values in options object using the increment/decrement buttons

  return (
    <StyledOptionButton>
      <p>{text}</p>
      <div className="icon-container">
        <Icon
          icon="akar-icons:circle-minus"
          onClick={decrementFunction}
          className="sizer"
        />
        {value}
        <Icon
          icon="akar-icons:circle-plus"
          onClick={incrementFunction}
          className="sizer"
        />
      </div>
    </StyledOptionButton>
  );
}
