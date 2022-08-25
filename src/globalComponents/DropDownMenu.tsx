import React, { useState } from 'react';
import styled from 'styled-components';
import useOuterClick from '../hooks/useOuterClick';


const StyledDropDownMenu = styled.div`
  
`

type Props = {
  icon: React.ReactNode;
  listElements?: React.ReactNode | React.ReactNode[];
}


export default function DropDownMenu({icon, listElements}: Props) {

  const [open, setOpen] = useState(false);
  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);
  const selfRef = useOuterClick(closeMenu)


  return (
    <StyledDropDownMenu ref={selfRef} onClick={openMenu}>
      {icon}
      {open &&
        <ul>
          {listElements}
        </ul>
      }
    </StyledDropDownMenu>
  )
}
