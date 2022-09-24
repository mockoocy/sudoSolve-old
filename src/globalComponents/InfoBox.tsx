import React from "react";
import styled from "styled-components";
import { boxShadowOutline } from "../utils/css-mixins";

const StyledInfoBox = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  margin: 1.25% 10%;
  padding: 1.25% 0;
  ${boxShadowOutline(0.0625, 0.125, "var(--gridGapClr)")};
  border-radius: 0.25rem;
  height: 50vh;

  @media (max-width: 820px) {
    flex-direction: column;
    justify-content: space-between;
    height: 80%;
    width: 90%;
    margin: 1.25% 5%;
    padding: 0;
  }

  * {
    font-family: Lato, sans-serif;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .visual-content-container {
    height: 100%;
    > img {
      height: 100%;
      border-radius: 1rem;
      @media (max-width: 820px) {
        height: 80%;
      }
    }
  }
  .description-container {
    > ul {
      color: var(--textClr);
      max-width: 40ch;
      padding: 0;
      @media (max-width: 820px) {
        max-width: 90%;
      }
      > li {
        margin-left: 4ch;
        font-size: 1.25rem;

        @media (max-width: 820px) {
          font-size: 0.875rem;
        }
        :first-child {
          margin-top: 0.25rem;
        }
        ::marker {
          content: "✅";
        }
        :last-child {
          margin-bottom: 0.25rem;
        }
      }
    }
  }
`;

type Props = {
  visualChild?: React.ReactNode;
  // it will be an image or a svg
  description: React.ReactNode;
  // it doesnt matter if you send an <ul> or a heading, css will handle it at ease
};

export default function InfoBox({ visualChild, description }: Props) {
  return (
    <StyledInfoBox>
      <div className="container visual-content-container">{visualChild}</div>
      <div className="container description-container">{description}</div>
    </StyledInfoBox>
  );
}
