import _ from 'lodash';

import spacesCfg from '../spaces.json';

export const getBingoTypeDisplayName = (key) =>
  key[0].toUpperCase() + key.slice(1);

const buildDefaultFreeSpace = () => ({
  full: 'Free Space',
  isSelected: true,
});

export const createNewBoard = () => {
  const { options, customFreeSpace } = spacesCfg;
  const boardSpaces = _.shuffle(options).map((label) => ({ full: label }));
  const newBoard = _.chunk(boardSpaces, 5).slice(0, 5);

  newBoard[2][2] = customFreeSpace
    ? { full: customFreeSpace }
    : buildDefaultFreeSpace();

  return newBoard;
};

export const generateClassname = (...names) => names.filter(Boolean).join(' ');
