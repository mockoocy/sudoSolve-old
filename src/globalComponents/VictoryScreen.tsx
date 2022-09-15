import React, { useRef } from 'react'
import styled from 'styled-components'
import {ReactComponent as Celebration} from "../assets/celebration.svg"
import { useGlobalContext } from '../globalContext';
import { boxShadowOutline, textShadowOutline } from '../utils/css-mixins';

type StyledProps = {
  height: string;
  width: string
}

const StyledVictoryScreen = styled.div<StyledProps>`
  --height: ${props => props.height};
  --width: ${props => props.width};

  width: var(--width);
  height: var(--height);
  padding: 2.5%;

  ${boxShadowOutline(.0625, .125, 'var(--standOutClr)')};
  background: var(--victoryScreenBgClr);
  color: var(--textClr);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-family: Lato, sans-serif;
  border-radius: 2rem;
  .svg {
    height: 100%;
    width: 100%;
    filter: hue-rotate(var(--hueRotationDeg));
  }
  .main-text{
    color: var(--textClr);
    ${textShadowOutline(.0625, .125, 'var(--standOutClr)')};
    font-size: 3rem;
  }
  .stats {
    ${textShadowOutline(.0625, .125, 'var(--standOutClr)')};

    padding: 0;
    li::marker {
      content: none;
    }
    >li {
      font-size: 2rem;
    }
  }

  #restart{
    background-image: linear-gradient(
      to right,
      var(--standOutClr) 0%,
      var(--selectedCellClr) 51%,
      var(--standOutClr) 100%
    );
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    width: 18ch;
    height: 4rem;
    text-align: center;
    text-transform: uppercase;
    transition: 0.25s ease-in-out;
    background-size: 200% auto;
    color: var(--textClr);            
    box-shadow: 
      0 .25rem var(--textClr);
    border-radius: 1rem;
    cursor: pointer;
  
    &:hover {
      background-position: right center; /* change the direction of the change here */
      color: var(--boringClr);
      text-decoration: none;
      transform: translateY(.5rem);
      box-shadow: none;
    }

  }
`

type Props = {
  height: string;
  width: string;
  timeFinished: number;
}


export default function VictoryScreen({height, width, timeFinished}: Props) {
  const dupaRef = useRef<HTMLDivElement>(null)
  const {options, restartGame} = useGlobalContext();
  function displayHeight(){
    console.log(dupaRef.current?.clientHeight, height)
  }

  function getLongTimeString(time: number){
    const timeString = new Date(time).toISOString().slice(11,23)
    // returns string formated like HH:MM:SS:sss
    const [hours, minutes, seconds] = timeString.split(':')
    return `${hours < "01" ? "" : hours + "h"} ${minutes < "01" ? "" : minutes + "m"} ${seconds}s
    `
  }
  return (
    <StyledVictoryScreen height={height} width={width} ref={dupaRef} onClick={displayHeight} onMouseDown={() => getLongTimeString(timeFinished)}>
      <h1 className="main-text">Well done!</h1>
      <ul className="stats">
        <li className="sub-text">Initial cell amount: {options.FILLED_CELLS_AMOUNT}</li>
        <li className="sub-text">Finished in: {getLongTimeString(timeFinished)}</li>
      </ul>
      <button id="restart" onClick={restartGame}>New game</button>
      <Celebration className="svg" />
    </StyledVictoryScreen>
  )
}
