/**
 * Author: RSP Aguilar
 * Created On: 2021-01-15T03:51:09.320Z
 */
//3rd Party
import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { useAtom } from 'jotai';
//local
import BingoSpace from './BingoSpace';
import { touchTypes, atoms } from '../data';
import { createNewBoard } from '../util';
import { useModal } from '../util/useModal';
import InfoModal from './modal/InfoModal';
import bingoValidators from '../util/bingo-validators';
import BingoModal, { returnOptions } from './modal/BingoModal';

const MainView = styled.div`
  height: 100%;
  flex: 1;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  /* flex-direction: column; */
`;

const RowView = styled.div`
  height: 20%;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const StyledSpace = styled(BingoSpace)`
  width: 20%;
`;

const Board = (props) => {
  const [bingoType, setBingoType] = useAtom(atoms.bingoType);
  const [longPressAction] = useAtom(atoms.longPressAction);
  const [board, setBoard] = useAtom(atoms.board);
  const { modal: infoModal, show: showInfo } = useModal(InfoModal);
  const { modal: bingoModal, show: showBingoAndAsk } = useModal(BingoModal);

  if (!board) {
    return null;
  }

  const toggleSelect = (row, column) => {
    const newBoard = _.cloneDeep(board);
    const space = newBoard[row][column];

    space.isSelected = !space.isSelected;

    const hasBingo = bingoType && bingoValidators[bingoType](newBoard);

    hasBingo &&
      showBingoAndAsk({
        bingoType,
      }).then((result = {}) => {
        const { selectedOption } = result;
        switch (selectedOption) {
          case returnOptions.NEW_GAME:
            setBoard(createNewBoard());
            break;
          case returnOptions.CHANGE_TYPE:
            setBingoType(result.bingoType);
            break;
          default:
            break;
        }
      });

    setBoard(newBoard);
  };

  const viewInfo = (row, column) => {
    const space = board[row][column];
    showInfo({ message: space.full });
  };

  const onPress = (row, column) =>
    longPressAction === touchTypes.VIEW
      ? toggleSelect(row, column)
      : viewInfo(row, column);

  const onLongPress = (row, column) =>
    longPressAction === touchTypes.SELECT
      ? toggleSelect(row, column)
      : viewInfo(row, column);

  return (
    <MainView className="top-view">
      {board.map((row, rowIdx) =>
        row.map((space, colIdx) => (
          <StyledSpace
            key={`board-space-row-${rowIdx}-col-${colIdx}`}
            selected={space.isSelected}
            label={space.short}
            onClick={() => onPress(rowIdx, colIdx)}
          />
        ))
      )}
      {infoModal}
      {bingoModal}
    </MainView>
  );
};

export default Board;
