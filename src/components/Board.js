/**
 * Author: RSP Aguilar
 * Created On: 2021-01-15T03:51:09.320Z
 */
//3rd Party
import React, { forwardRef } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { useAtom } from 'jotai';
//local
import BingoSpace from './BingoSpace';
import { atoms } from '../data';
import { createNewBoard } from '../util';
import { useModal } from '../util/useModal';
import bingoValidators from '../util/bingo-validators';
import BingoModal, { returnOptions } from './modal/BingoModal';

const MainView = styled.div`
  height: 100%;
  flex: 1;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background-color: white;
  /* flex-direction: column; */
`;

const StyledSpace = styled(BingoSpace)`
  width: 20%;
`;

const Board = forwardRef((props, ref) => {
  const [bingoType, setBingoType] = useAtom(atoms.bingoType);
  const [board, setBoard] = useAtom(atoms.board);
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

  const onPress = (row, column) => toggleSelect(row, column);

  return (
    <MainView className="top-view" ref={ref}>
      {board.map((row, rowIdx) =>
        row.map((space, colIdx) => (
          <StyledSpace
            key={`board-space-row-${rowIdx}-col-${colIdx}`}
            selected={space.isSelected}
            label={space.full}
            onClick={() => onPress(rowIdx, colIdx)}
          />
        ))
      )}
      {bingoModal}
    </MainView>
  );
});

export default Board;
