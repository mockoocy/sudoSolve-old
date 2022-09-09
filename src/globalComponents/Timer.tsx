import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useGlobalContext } from '../globalContext';

const StyledTimer = styled.div`
  background-color: var(--prefilledCellClr);
  text-align: center;
  font-family: aboreto;
  height: 3rem;
  font-size: 2rem;
  padding: 0 0.25rem;
  border-radius: .5rem;
  color: var(--standOutClr);
  display: flex;
  align-items: center;
  gap: .125rem;

`

type Props = {
  paused: boolean
}

export default function Timer({paused} : Props) {
  const [timeString, setTimeString] = useState("")
  const [startTime, setStartTime] = useState(new Date().getTime())
  const {initialBoardInfo} = useGlobalContext();

  useEffect(()=> {
    setStartTime(new Date().getTime())
  }, [initialBoardInfo])

  function getStringTime(startTime: number){
    const timeElapsed = new Date().getTime() - startTime
    let sliceRange: [number, number] = [0,0]
    // slices range in the following if / else statement are responsible for 
    // HH:MM:SS:sss / MM:SS:sss / SS:sss formats
    if (timeElapsed > 1000 * 60 * 60) {
      sliceRange = [11,23]
    } 
    else if (timeElapsed > 1000 * 60){
      sliceRange = [14,23]
    }
    else {
      sliceRange = [17,23]
    }

    return new Date(new Date().getTime() - startTime).toISOString().slice(...sliceRange)
  }

  setTimeout(()=> setTimeString(getStringTime(startTime)), 4)

  

  return (
    <StyledTimer>
      <Icon id="hourglass" icon="ic:baseline-hourglass-top" />
      {timeString}
    </StyledTimer>
  )
}
