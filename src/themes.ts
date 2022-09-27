import { Theme } from "./types";

const lightTheme: Theme = {
  info: {
    displayName: "light",
  },
  colors: {
    bgClr: "#f0f8f5",
    textClr: "#0f0f0f",
    standOutClr: "#0066FF",
    notSelectedCellClr: "#f0f8f5",
    selectedCellClr: "#00BDFF",
    gridGapClr: "#272729",
    highlightCellClr: "#92BDFF",
    invalidCellClr: "#f04848",
    prefilledCellClr: "#f0f0ff ",
  },
  gradientColors: {
    victoryScreenBgClr: "linear-gradient(to bottom, #9796f0, #fbc7d4)",
  },
  utils: {
    hueRotationDeg: "190deg",
  },
};

const darkTheme: Theme = {
  info: {
    displayName: "dark",
  },
  colors: {
    bgClr: "#0e0e10",
    textClr: "#765",
    standOutClr: "#FCE694",
    notSelectedCellClr: "#272729",
    selectedCellClr: "#F8FEC2",
    gridGapClr: "#373737",
    highlightCellClr: "#EAF7CF",
    invalidCellClr: "#FF708A",
    prefilledCellClr: "#1f1f1a ",
  },
  gradientColors: {
    victoryScreenBgClr: "linear-gradient(to bottom, #9796f0, #fbc7d4)",
  },
  utils: {
    hueRotationDeg: "45deg",
  },
};

const crimsonTheme: Theme = {
  info: {
    displayName: "crimson",
  },
  colors: {
    bgClr: "rgb(255,170,187)",
    textClr: "#FFE1E7",
    standOutClr: "rgb(255,0,51)",
    notSelectedCellClr: "rgb(85,0,17)",
    selectedCellClr: "#D9002B",
    gridGapClr: "#373737",
    highlightCellClr: "rgb(170,0,34)",
    invalidCellClr: "#242436",
    prefilledCellClr: "#470F1B ",
  },
  gradientColors: {
    victoryScreenBgClr: "linear-gradient(to bottom, #FFE0F6, #FFEAE0)",
  },
};

const themes = {
  lightTheme,
  darkTheme,
  crimsonTheme,
};

export default themes;
