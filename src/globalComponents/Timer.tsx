import { Icon } from '@iconify/react'
import styled from 'styled-components';

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
  timeElapsed: number;
}

export default function Timer({timeElapsed} : Props) {



  function getStringTime(timeElapsed: number){
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

    return new Date(timeElapsed).toISOString().slice(...sliceRange)
  }


  

  return (
    <StyledTimer>
      <Icon id="hourglass" icon="ic:baseline-hourglass-top" />
      {getStringTime(timeElapsed)}
    </StyledTimer>
  )
}
