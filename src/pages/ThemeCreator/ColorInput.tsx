import React, { useState } from "react";
import { ChromePicker, ColorResult } from "react-color";
import styled from "styled-components";
import useOuterClick from "../../hooks/useOuterClick";
import { Theme } from "../../types";
import { textShadowOutline } from "../../utils/css-mixins";

type StyledProps = {
  bgClr: string;
};

const StyledColorInput = styled.div<StyledProps>`
  width: 22ch;
  height: 3rem;
  background-color: ${(props) => props.bgClr};
  outline: 1px solid var(--textClr);
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .picker {
    z-index: 100;
    * {
      z-index: 100;
    }
  }

  .caption {
    ${textShadowOutline(0.0625, 0, "var(--bgClr)")};
    font-size: 1.25rem;
    font-family: Lato, sans-serif;
  }
`;

type Props = {
  propertyKey: string;
  // key matches the name of the property in Theme.colors of Theme type.
  customTheme: Theme;
  setCustomTheme: React.Dispatch<React.SetStateAction<Theme>>;
  text: string;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

export default function ColorInput({
  propertyKey,
  customTheme,
  setCustomTheme,
  text,
  setTheme,
}: Props) {
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const hide = () => setColorPickerVisible(false);
  function show(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    setColorPickerVisible(true);
  }

  const decimalToHex = (alpha: number) =>
    alpha === 0 ? "00" : Math.round(255 * alpha).toString(16);

  function changeCustomTheme(propertyKey: string, color: ColorResult) {
    const newCustomThemeColors = structuredClone(customTheme.colors);
    const newColorHex = `${color.hex}${
      color.rgb.a && decimalToHex(color.rgb.a)
    }`;
    newCustomThemeColors[propertyKey] = newColorHex;
    const newCustomTheme = { ...customTheme, colors: newCustomThemeColors };
    setCustomTheme(newCustomTheme);
    setTheme(customTheme);
  }

  const PickerRef = useOuterClick(hide);
  return (
    <StyledColorInput
      ref={PickerRef}
      onClick={(e) => show(e)}
      bgClr={customTheme.colors[propertyKey]}
    >
      {colorPickerVisible ? (
        <ChromePicker
          className="picker"
          color={customTheme.colors[propertyKey]}
          onChangeComplete={(color) => changeCustomTheme(propertyKey, color)}
          disableAlpha={false}
        />
      ) : (
        <div className="caption" onClick={() => {}}>
          {text}
        </div>
      )}
    </StyledColorInput>
  );
}
