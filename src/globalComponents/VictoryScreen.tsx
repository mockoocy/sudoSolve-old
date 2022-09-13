import React, { useRef } from 'react'
import styled from 'styled-components'
import {ReactComponent as Celebration} from "../assets/celebration.svg"
import { useGlobalContext } from '../globalContext';

type StyledProps = {
  height: string;
  width: string
}

const StyledVictoryScreen = styled.div<StyledProps>`
  --height: ${props => props.height};
  --width: ${props => props.width};

  width: var(--width);
  height: var(--height);
  padding: 5%;
  background: var(--victoryScreenBgClr);
  color: var(--textClr);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-family: Lato, sans-serif;
  border-radius: 2rem;
  .svg {
    height: 75%;
    width: 75%;
  }
  .main-text{
    font-size: 3rem;
  }
  .stats {
    padding: 0;
    li::marker {
      content: none;
    }
    >li {
      font-size: 2rem;
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
      <h1 className="main-text">You've won!</h1>
      <ul className="stats">
        <li className="sub-text">Initial cell amount: {options.FILLED_CELLS_AMOUNT}</li>
        <li className="sub-text">Finished in: {getLongTimeString(timeFinished)}</li>
      </ul>
      <button id="restart" onClick={restartGame}>New game</button>
      <Celebration className="svg" />
    </StyledVictoryScreen>
  )
}
