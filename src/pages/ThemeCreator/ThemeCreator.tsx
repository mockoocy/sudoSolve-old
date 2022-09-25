import React from "react";
import SudokuBoard from "../../globalComponents/SudokuBoard";
import { useGlobalContext } from "../../globalContext";
import getBoardSize from "../../utils/getBoardSize";
import { Theme } from "../../types";
import styled from "styled-components";
import ColorInput from "./ColorInput";
import InfoBox from "../../globalComponents/InfoBox";

const themeCreatorOverview = require(`../../assets/themeCreatorImage1.png`);
const colorInputOverview = require(`../../assets/ColorInputImage.png`);

const StyledThemeCreator = styled.section`
  margin: 2.5% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  .main-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;

    @media (max-width: 820px) {
      flex-direction: column;
      gap: 1vh;
    }
  }

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
      <div className="main-container">
        <SudokuBoard width={boardSize.width} height={boardSize.height} />
        <div id="color-inputs-container">{colorInputElements}</div>
      </div>
      <InfoBox
        visualChild={
          <img src={themeCreatorOverview} alt="Theme Creator page screenshot" />
        }
        description={
          <p>
            In the Theme Creator, you have a preview of the board and the color
            inputs, which change appearance of certain elements of the website.
          </p>
        }
        heading="How to use Theme Creator"
      />
      <InfoBox
        visualChild={
          <img src={colorInputOverview} alt="Theme Creator page screenshot" />
        }
        description={
          <p>
            This is how the color input looks. You can select which color you
            want using sliders or input the color code in hex, hsla or rgba.
          </p>
        }
        heading="How to choose colors"
      />
    </StyledThemeCreator>
  );
}
