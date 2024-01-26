/**
 * Author: RSP Aguilar
 * Created Date: 2024-01-02T00:18:17.231Z
 */

import React from 'react';
import styled from 'styled-components';

import packageInfo from '../package.alias.json';
import jazzLogo from '../images/jazz-logo-mark.png';

const StyledImage = styled.img`
  height: 3em;
`;
const AboutView = (props) => {
  return (
    <div>
      <StyledImage src={jazzLogo} alt="jazz logo" />
      <br />
      <br />
      <div>Utah Jazz Bingo</div>
      <div>by Scott Aguilar</div>
      <br />
      <div>email: aguilar46@gmail.com</div>
      <div>Twitter (X): @RSP_aguilar</div>
      <br />
      <div>version: {packageInfo.version}</div>
    </div>
  );
};

export default AboutView;
