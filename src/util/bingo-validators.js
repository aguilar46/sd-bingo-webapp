import { bingoTypes } from '../data';

const checkRow = (row) => row.every((space) => space.isSelected);
const checkRows = (board) => board.some(checkRow);
const checkColumns = (board) => {
  const rotatedBoard = board[0].map((val, index) =>
    board.map((row) => row[index]).reverse()
  );

  return rotatedBoard.some(checkRow);
};

const checkCross = (board) => {
  const crosses = [
    board.map((b, i) => board[i][i]),
    board.map((b, i) => board[i][4 - i]),
  ];
  return crosses.some(checkRow);
};
const bingoValidators = {
  [bingoTypes.TRADITIONAL]: (board) =>
    checkRows(board) || checkCross(board) || checkColumns(board),
  [bingoTypes.BLACKOUT]: (board) => board.every(checkRow),
};

export default bingoValidators;
