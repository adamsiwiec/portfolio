import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }

  .rhap_container {
    margin-top: 30px;
    border-radius: 20px;
  }
`;

const Podcast = () => {
  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

  return (
    <StyledContactSection id="podcast" ref={revealContainer}>
      <h2 className="numbered-heading overline">Audio Snippet</h2>

      <h2 className="title">A Quick Hello</h2>

      <p>Time is of the essence. So, I boiled myself down into an mp3 of me!</p>
      <AudioPlayer src="https://siwiec.us/artifact_mixdown.mp3" />
    </StyledContactSection>
  );
};

export default Podcast;
