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
    gap: .25rem;
    align-items: center;
    justify-content: center;

    .icon {
      width: 1.375em;
      height: 1.375em;
      stroke-width: 2px;
    }
    .btn {
      min-width: 12%;
      max-width: 20ch;
      height: 3rem;
      padding: 0 1rem;
      font-size: 1.5rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: .25rem;
      background-color: var(--standOutClr);
      border: 0;
      margin: .25rem;
      border-radius: 1rem;

      :hover {
        transform: scale(1.1);
        transition: all 250ms ease-in-out;
        filter: brightness(1.2);
      }
    }
    #file-label {
      opacity: 0.8;
      background-color: var(--standOutClr);

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