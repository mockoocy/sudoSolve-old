import React from "react";
import SudokuBoard from "../../globalComponents/SudokuBoard";
import { useGlobalContext } from "../../globalContext";
import getBoardSize from "../../utils/getBoardSize";
import { Theme } from "../../types";
import styled from "styled-components";
import ColorInput from "./ColorInput";

const StyledThemeCreator = styled.section`
  margin: 2.5% 0;
  display: flex;
  align-items: center;
  justify-content: space-around;

  #color-inputs-container {
    width: 20%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

type Props = {
  setCustomTheme: React.Dispatch<React.SetStateAction<Theme>>;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  customTheme: Theme;
};

export default function ThemeCreator({
  setCustomTheme,
  customTheme,
  setTheme,
}: Props) {
  const { options } = useGlobalContext();
  const boardSize = getBoardSize(
    options.SUDOKU_SIZE,
    options.BOARD_SIZE_FACTOR
  );

  const colorInputElements = Object.keys(customTheme.colors).map(
    (propertyName, id) => (
      <ColorInput
        key={`color-input-${id}`}
        propertyKey={propertyName}
        customTheme={customTheme}
        setCustomTheme={setCustomTheme}
        text={propertyName}
        setTheme={setTheme}
      />
    )
  );

  return (
    <StyledThemeCreator>
      <SudokuBoard width={boardSize.width} height={boardSize.height} />
      <div id="color-inputs-container">{colorInputElements}</div>
    </StyledThemeCreator>
  );
}
