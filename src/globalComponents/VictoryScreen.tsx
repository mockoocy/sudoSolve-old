import React, { useRef } from 'react'
import styled from 'styled-components'
// import {ReactComponent as Celebration} from "../assets/aaa.svg"

type StyledProps = {
  height: string;
  width: string
}

const StyledVictoryScreen = styled.div<StyledProps>`
  --height: ${props => props.height};
  --width: ${props => props.width};

  width: var(--width);
  height: var(--height);
  background-color: var(--standOutClr);
  color: blue;
`

type Props = {
  height: string;
  width: string
}


export default function VictoryScreen({height, width}: Props) {
  const dupaRef = useRef<HTMLDivElement>(null)
  function displayHeight(){
    console.log(dupaRef.current?.clientHeight, height)
  }
  return (
    <StyledVictoryScreen height={height} width={width} ref={dupaRef} onClick={displayHeight}>
      {/* <Celebration /> */}
      VictoryScreen
    </StyledVictoryScreen>
  )
}
