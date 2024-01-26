/**
 * Author: RSP Aguilar
 * Created Date: 2024-01-02T00:18:17.231Z
 */

import React from 'react';
import styled from 'styled-components';

import packageInfo from '../package.alias.json';
import logo from '../images/sd-bingo-logo.png';

const StyledImage = styled.img`
  height: 3em;
`;
const AboutView = (props) => {
  return (
    <div>
      <StyledImage src={logo} alt="sd bingo logo" />
      <br />
      <br />
      <div>SD Bingo</div>
      <div>by Scott Aguilar</div>
      <br />
      <div>email: aguilar46@gmail.com</div>
      <br />
      <div>version: {packageInfo.version}</div>
    </div>
  );
};

export default AboutView;
