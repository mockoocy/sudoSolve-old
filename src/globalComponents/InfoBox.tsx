import React from "react";
import styled from "styled-components";

const StyledInfoBox = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 5%;
  width: 80%;
  padding: 1.25%;
  border-top: 1px solid #0f0f0f2f;

  @media (max-width: 820px) {
    flex-direction: column;
    justify-content: space-between;
    width: 90%;
    padding: 5ch 1.25%;
  }

  * {
    font-family: Lato, sans-serif;
    font-size: 1.125rem;

    @media (max-width: 820px) {
      font-size: 0.875rem;
    }
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .visual-content-container {
    > img {
      min-height: 25%;
      max-height: 75%;
      min-width: 25%;
      max-width: 75%;
      border-radius: 1rem;
      @media (max-width: 820px) {
        mix-width: 100%;
      }
    }
  }
  .description-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .heading {
      font-size: 1.5rem;
      font-family: Roboto, Lato, sans-serif;
      font-weight: 700;
      color: var(--standOutClr);
    }

    > * {
      max-width: 45ch;
      color: var(--textClr);
      @media (max-width: 820px) {
        max-width: 80%;
      }
    }
    p {
      word-wrap: break-word;
    }
    > ul {
      padding: 0;
      > li {
        margin-left: 4ch;

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
  heading?: string;
};

export default function InfoBox({ visualChild, description, heading }: Props) {
  return (
    <StyledInfoBox>
      <div className="container visual-content-container">{visualChild}</div>
      <div className="container description-container">
        <h2 className="heading">{heading}</h2>
        {description}
      </div>
    </StyledInfoBox>
  );
}
