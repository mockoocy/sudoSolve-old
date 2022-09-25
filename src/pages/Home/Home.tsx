import React from "react";
import SudokuMenu from "./components/SudokuMenu";
import InfoBox from "../../globalComponents/InfoBox";

const sudokuGridTip = require("../../assets/sudokuImage1.png");
const sudokuInstructions = require("../../assets/sudokuImage2.png");
const sudokuUploadImage = require("../../assets/sudokuImage3.png");
const navbarOptions = require("../../assets/navbarImage1.png");

export default function Home() {
  return (
    <>
      <SudokuMenu />
      <InfoBox
        visualChild={<img src={sudokuGridTip} alt="Sudoku Board" />}
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
        heading="The rules of Sudoku"
      />
      <InfoBox
        visualChild={<img src={sudokuInstructions} alt="Game screen" />}
        description={
          <p>
            To play you just select a sell and put a number in the cell using
            your keyboard or mousewheel. You may also use the buttons below the
            timer to modify the board for you. Upon hovering on the buttons, you
            will get a little tooltip with more details on how it works
          </p>
        }
        heading="How to play"
      />
      <InfoBox
        visualChild={
          <img src={sudokuUploadImage} alt="Instructions on uploading board" />
        }
        description={
          <p>
            You can upload a sudoku Board from image, and the board state read
            from it will be put into the game. You can then play like it was
            there from the beggining. To do it just press "From image" button,
            select a file and then press "Submit image". This feature currently
            supports only 9x9 sudoku grids.
          </p>
        }
        heading="How to play"
      />
      <InfoBox
        visualChild={
          <img src={navbarOptions} alt="showcase of nanvar options" />
        }
        description={
          <p>
            Using the buttons in the navbar, you can change the theme of the
            website or the options of your sudoku game to fully personalize your
            experience with Sudoku. It's also worth noting, that the last theme
            option is a link, which takes you to the theme creator page, where
            you can fully customize the appearance of the website
          </p>
        }
        heading="How to play"
      />
    </>
  );
}
