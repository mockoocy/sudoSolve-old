import React from "react";
import styled from "styled-components";

const StyledInfoBoxes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 2.5vh;
`;

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export default function InfoBoxes({ children }: Props) {
  return <StyledInfoBoxes>{children}</StyledInfoBoxes>;
}
