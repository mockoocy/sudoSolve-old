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
    prefilledCellClr: '#f0f0ff ',
    victoryScreenBgClr: 'linear-gradient(to bottom, #9796f0, #fbc7d4)'
    
  }
}

const darkTheme: Theme = {
  info: {
    displayName: "dark"
  },
  colors: {
    bgClr: '#0e0e10',
    textClr: '#765',
    standOutClr: '#FCE694',
    notSelectedCellClr: '#272729',
    selectedCellClr: '#F8FEC2',
    gridGapClr: '#373737',
    highlightCellClr: '#EAF7CF',
    invalidCellClr: '#FF708A',
    prefilledCellClr: '#1f1f1a ',
    victoryScreenBgClr: 'linear-gradient(to bottom, #9796f0, #fbc7d4)'
  }
}

const themes = {
  lightTheme,
  darkTheme
}

export default themes;