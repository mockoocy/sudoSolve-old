import styled from "styled-components"

type StyledProps = {
  sudokuSize: number
}

const StyledSudokuMenu = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  padding: 0;
  justify-content: space-around;
  gap: 2rem; 
  margin-top: 2.5%;
  @media (max-width: 1200px){
    flex-direction: column;
    justify-content: space-between  ;
    overflow-x: scroll;
    min-width: 95vw;
  }
    .buttons {
    display: grid;
    grid-auto-flow: row;
    grid-auto-columns: calc(30ch);
    gap: .25rem;
    justify-content: center;

    #file-label {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 1rem;
      height: 3rem;
      font-size: 1.5rem;
      background-color: var(--standOutClr);
      :hover {
        transform: scale(1.1);
        transition: all 250ms ease-in-out;
        filter: brightness(1.2);
      }

    }
    #file-selector {
      display: none;
    }
    #file-submit{
      width: auto;
      padding: 0.5rem;

      h5 {
        font-size: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .25rem
      }
    }
  }
`

export default StyledSudokuMenu