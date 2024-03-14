/**
 * Author: RSP Aguilar
 * Create Date: 2021-01-30T04:47:49.214Z
 */
//3rd party
import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import BingoTypeCombo from '../BingoTypeCombo';
//local
import { CloseBtn, ModalBtn } from './ModalComponents';
import { Combobox } from 'react-widgets';
import { atoms, markColors } from '../../data';
import { useAtom } from 'jotai';

const InnerView = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: white;
  padding: 20px;
  border: solid 1px black;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
`;

const StyledText = styled.div`
  margin-top: 5px;
  text-align: center;
  font-weight: bold;
`;
export const hamburgerReturnOptions = {
  NEW_GAME: 'new-game',
  CLEAR_BOARD: 'clear-board',
  VIEW_ALL_OPTIONS: 'view-all-options',
  BINGO_TYPE: 'change-bingo-type',
  ABOUT: 'about',
  EXPORT: 'export',
};

const displayNameMap = {
  [hamburgerReturnOptions.NEW_GAME]: 'New Game',
  [hamburgerReturnOptions.CLEAR_BOARD]: 'Clear Board',
  [hamburgerReturnOptions.VIEW_ALL_OPTIONS]: 'View All Options',
  [hamburgerReturnOptions.EXPORT]: 'Copy to Clipboard',
  [hamburgerReturnOptions.ABOUT]: 'About',
};

const markColorOptions = Object.values(markColors).map((color) => ({
  value: color,
  label: `${color[0].toUpperCase()}${color.slice(1)}`,
}));

const HamburgerModal = (props) => {
  const { onRequestClose, bingoType } = props;
  const [markColor, setMarkColor] = useAtom(atoms.markColor);

  const onClose = (action, payload) =>
    onRequestClose({ returnValue: { action, payload } });

  const buttons = Object.values(hamburgerReturnOptions)
    .filter((option) => option !== hamburgerReturnOptions.BINGO_TYPE)
    .map((key) => (
      <ModalBtn key={key} onClick={() => onClose(key)}>
        {displayNameMap[key]}
      </ModalBtn>
    ));

  const onColorChange = ({ value }) => {
    setMarkColor(value);
    onClose('nothing', null);
  };

  return (
    <Modal {...props} className="hamburger-modal">
      <InnerView className="hamburger-inner">
        {buttons}
        <StyledText>Bingo Type</StyledText>
        <BingoTypeCombo
          defaultValue={bingoType}
          onChange={(type) => onClose(hamburgerReturnOptions.BINGO_TYPE, type)}
        />
        <StyledText>Mark Color</StyledText>
        <Combobox
          value={markColor}
          data={markColorOptions}
          dataKey="value"
          textField="label"
          onChange={onColorChange}
        />
        <CloseBtn onClick={onClose}>Cancel</CloseBtn>
      </InnerView>
    </Modal>
  );
};

export default HamburgerModal;
