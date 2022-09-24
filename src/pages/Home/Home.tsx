import React from "react";
import SudokuMenu from "./components/SudokuMenu";
import InfoBox from "../../globalComponents/InfoBox";

const sudokuGridTip = require("../../assets/sudokuImage1.png");

export default function Home() {
  return (
    <>
      <SudokuMenu />
      <InfoBox
        visualChild={<img src={sudokuGridTip} alt="image of a sudoku booard" />}
        description={
          <ul>
            There are three main rules to follow in a game of Sudoku:
            <li>In every column, every number may appear only once</li>
            <li>In every row, every number may appear only once</li>
            <li>In every square, every number may appear only once</li>
            In other words, on the selected cell (the one with an "X") you can
            put a number that does not appear on any other highlighted cell
          </ul>
        }
      />
    </>
  );
}
