import _ from 'lodash';

import spacesCfg from '../spaces.json';

export const getBingoTypeDisplayName = (key) =>
  key[0].toUpperCase() + key.slice(1);

const buildDefaultFreeSpace = () => ({
  short: 'Free Space',
  full: 'Free Space',
  isSelected: true,
});

export const createNewBoard = () => {
  const { options, customFreeSpace } = spacesCfg;
  const boardSpaces = _.shuffle(options);
  const newBoard = _.chunk(boardSpaces, 5).slice(0, 5);

  newBoard[2][2] = customFreeSpace
    ? { short: customFreeSpace, full: customFreeSpace }
    : buildDefaultFreeSpace();

  return newBoard;
};

export const generateClassname = (...names) => names.filter(Boolean).join(' ');
