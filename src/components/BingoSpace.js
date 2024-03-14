/**
 * Author: RSP Aguilar
 * Created On: 2021-01-15T05:35:26.505Z
 */

import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import redMark from '../images/red_dab.svg';
import orangeMark from '../images/orange_dab.svg';
import yellowMark from '../images/yellow_dab.svg';
import pinkMark from '../images/pink_dab.svg';
import purpleMark from '../images/purple_dab.svg';
import tealMark from '../images/teal_dab.svg';
import PropTypes from 'prop-types';
import { useAtomValue } from 'jotai';
import { atoms, markColors } from '../data';

const Space = styled.button`
  border: solid 1px black;
  text-shadow: 1px 1px white;
  font-size: 1em;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  ${(props) => props.selected && `background-image: url(${props.imageUrl});`}
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
`;

const markImages = {
  [markColors.RED]: redMark,
  [markColors.ORANGE]: orangeMark,
  [markColors.PINK]: pinkMark,
  [markColors.PURPLE]: purpleMark,
  [markColors.TEAL]: tealMark,
  [markColors.YELLOW]: yellowMark,
};

const BingoSpace = (props) => {
  const { label } = props;
  const markColor = useAtomValue(atoms.markColor);
  const image = markImages[markColor];
  return (
    <Space
      {..._.omit(props, ['label'])}
      className="bingo-space"
      imageUrl={image}
      title={label}
    >
      {label}
    </Space>
  );
};

BingoSpace.propTypes = {
  label: PropTypes.string,
  selected: PropTypes.bool,
};

BingoSpace.displayName = 'BingoSpace';
export default BingoSpace;
