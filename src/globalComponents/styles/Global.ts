import { createGlobalStyle } from "styled-components";
import { Theme } from "../../types";

const GlobalStyle = createGlobalStyle<{theme: Theme}>`
  :root{
  --bgClr: ${({theme})=> theme.colors.bgClr};
  --standOutClr: ${({theme})=> theme.colors.standOutClr}; 
  --gridGapClr: ${({theme})=> theme.colors.gridGapClr}; 

  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    line-height: 1.5;
    background: var(--bgClr);
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  #root {
    isolation: isolate;
  }
`

export default GlobalStyle;