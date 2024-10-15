/**
 * Author: RSP Aguilar
 * Created On: 2021-01-15T05:35:26.505Z
 */

import React, { useCallback, useEffect, useState } from 'react';
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
import { useWindowSize } from '../util/useWindowSize';

const Space = styled.button`
  position: relative;
  border: solid 1px black;
  text-shadow: 1px 1px white;
  font-size: 1em;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const StyledImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  ${(props) => {
    const { x, y } = props.clientXY;
    return `
    left: ${x}px;
    top: ${y}px;
    `;
  }}
  transform: rotate(${(props) => props.rotation}turn);
`;
const LabeDiv = styled.div`
  position: relative;
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
  const { label, selected, onClick } = props;
  const markColor = useAtomValue(atoms.markColor);
  const image = markImages[markColor];
  const [rotation, setRotation] = useState(0);
  const [clientXY, setClientXY] = useState({ x: 0, y: 0 });
  const onUpdateSize = useCallback(() => setClientXY({ x: 0, y: 0 }), []);
  useWindowSize(onUpdateSize);

  //initialize rotation
  useEffect(() => {
    setRotation(Math.random());
  }, []);

  return (
    <Space
      {..._.omit(props, ['label', 'onClick', 'selected'])}
      className="bingo-space"
      title={label}
      onClick={(e) => {
        const { x, y, width, height } = e.target.getBoundingClientRect();
        const x_m = x + width / 2;
        const y_m = y + height / 2;
        const x_l = e.clientX - x_m;
        const y_t = e.clientY - y_m;
        setClientXY({ x: x_l, y: y_t });
        onClick(e);
      }}
    >
      {selected && (
        <StyledImg
          src={image}
          className="background-div"
          selected={selected}
          imageUrl={image}
          rotation={rotation}
          clientXY={clientXY}
        />
      )}
      <LabeDiv rotation={1 - rotation}>{label}</LabeDiv>
    </Space>
  );
};

BingoSpace.propTypes = {
  label: PropTypes.string,
  selected: PropTypes.bool,
};

BingoSpace.displayName = 'BingoSpace';
export default BingoSpace;
