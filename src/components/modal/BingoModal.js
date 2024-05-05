/**
 * Author: RSP Aguilar
 * Create Date: 2021-01-16T20:20:25.254Z
 */
//3rd Party
import React from 'react';
import Modal from 'react-modal';
import _ from 'lodash';
import styled from 'styled-components';
import { toBlob } from 'html-to-image';
//local
import { ModalBtn, ModalInfoText, CloseBtn } from './ModalComponents';
import BingoTypeCombo from '../BingoTypeCombo';
import ModalView from './ModalView';
import { toast } from 'react-toastify';

export const returnOptions = {
  NEW_GAME: 'newGame',
  CHANGE_TYPE: 'changeType',
};

const StyledInfoText = styled(ModalInfoText)`
  text-align: center;
  font-size: 15px;
  font-weight: bold;
`;

const StyledCombo = styled(BingoTypeCombo)`
  width: 300px;
`;

const StyledModal = styled(Modal)`
  button {
    margin-right: 24px;
  }
`;
const BingoModal = (props) => {
  const { onRequestClose, bingoType, boardRef } = props;

  return (
    <StyledModal {..._.omit(props, ['bingoType'])} className="bingo-modal">
      <ModalView>
        <StyledInfoText>BINGO!</StyledInfoText>
        <ModalBtn
          onClick={() =>
            onRequestClose({
              returnValue: { selectedOption: returnOptions.NEW_GAME },
            })
          }
        >
          New Game
        </ModalBtn>
        <ModalBtn
          onClick={async () => {
            const blob = await toBlob(boardRef.current, { cacheBust: true });
            navigator.clipboard.write([
              new ClipboardItem({
                [blob.type]: blob,
              }),
            ]);
            toast('Image copied to clipboard');
          }}
        >
          Copy to Clipboard
        </ModalBtn>
        <StyledCombo
          className="bingo-modal-change-type"
          placeholder="Change Game Type"
          excludeType={bingoType}
          onChange={({ value }) =>
            onRequestClose({
              returnValue: {
                selectedOption: returnOptions.CHANGE_TYPE,
                bingoType: value,
              },
            })
          }
        />
        <CloseBtn onClick={onRequestClose}>Close </CloseBtn>
      </ModalView>
    </StyledModal>
  );
};

export default BingoModal;
