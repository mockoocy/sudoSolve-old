import React, { useState } from 'react'
import { ChromePicker } from 'react-color'
import styled from 'styled-components'
import useOuterClick from '../../hooks/useOuterClick'

const StyledColorInput = styled.div`
  width: 15ch;
  height: 3rem;
  background-color: blue;
  .dd {
    width: 100%;
  }

`

export default function ColorInput() {
  const [colorPickerVisible, setColorPickerVisible] = useState(false)
  const hide = () => setColorPickerVisible(false)
  function show(e: React.MouseEvent<HTMLDivElement, MouseEvent>){
    e.stopPropagation();
    setColorPickerVisible(true)
  }

  const PickerRef = useOuterClick(hide)
  return (
    <StyledColorInput ref={PickerRef} onClick={e => show(e)}>
      {colorPickerVisible 
      ? <ChromePicker />
      : <div className="dd" onClick={() => {
      }}>SHOW ME THIS</div>
      }

    </StyledColorInput>
  )
}
