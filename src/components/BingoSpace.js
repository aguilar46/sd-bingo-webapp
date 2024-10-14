/**
 * Author: RSP Aguilar
 * Created On: 2021-01-15T05:35:26.505Z
 */

import React, { useEffect, useState } from 'react';
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
  background-color: transparent;
  overflow: hidden;
`;

const BackgroundDiv = styled.div`
  width: 100%;
  height: 100%;
  z-index: -1;
  background: url(${(props) => props.selected && props.imageUrl}) 0 0 no-repeat;
  transform: rotate(${(props) => props.rotation}turn);
  background-position: center;
`;

const LabeDiv = styled.div`
  transform: rotate(${(props) => props.rotation}turn);
  height: 100%;
  align-content: center;
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
  const { label, selected } = props;
  const markColor = useAtomValue(atoms.markColor);
  const image = markImages[markColor];
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    setRotation(Math.random());
  }, []);

  return (
    <Space {..._.omit(props, ['label'])} className="bingo-space" title={label}>
      <BackgroundDiv
        className="background-div"
        selected={selected}
        imageUrl={image}
        rotation={rotation}
      >
        <LabeDiv rotation={1 - rotation}>{label}</LabeDiv>
      </BackgroundDiv>
    </Space>
  );
};

BingoSpace.propTypes = {
  label: PropTypes.string,
  selected: PropTypes.bool,
};

BingoSpace.displayName = 'BingoSpace';
export default BingoSpace;
