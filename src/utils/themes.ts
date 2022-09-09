import { Theme } from "../types";

const lightTheme: Theme = {
  info: {
    displayName: "light"
  },
  colors: {
    bgClr: '#f0f8f5',
    textClr: '#0f0f0f',
    standOutClr: '#0066FF',
    notSelectedCellClr: '#f0f8f5',
    selectedCellClr: '#00BDFF',
    gridGapClr: '#272729',
    highlightCellClr: '#92BDFF',
    invalidCellClr: '#f04848',
    prefilledCellClr: '#f0f0ff '
  }
}

const darkTheme: Theme = {
  info: {
    displayName: "dark"
  },
  colors: {
    bgClr: '#0e0e10',
    textClr: '#f0f8f5',
    standOutClr: '#7b2df5',
    notSelectedCellClr: '#272729',
    selectedCellClr: '#9B2CF5',
    gridGapClr: '#373737',
    highlightCellClr: '#E02CF5',
    invalidCellClr: '#f04848',
    prefilledCellClr: '#1f1f1a '
  }
}

const themes = {
  lightTheme,
  darkTheme
}

export default themes;