import { atomWithStorage } from 'jotai/utils';

const PREFIX = 'SD';

export const touchTypes = {
  SELECT: 'select',
  VIEW: 'view',
};

export const bingoTypes = {
  TRADITIONAL: 'traditional',
  BLACKOUT: 'blackout',
  DOUBLE: 'double',
  TRIPLE: 'triple',
};

export const dataTypes = {
  GAME: 'game',
  LONG_PRESS: 'long-press-action',
  BINGO_TYPE: 'bingo-type',
  MARK_COLOR: 'mark-color',
};

export const markColors = {
  RED: 'red',
  ORANGE: 'orange',
  PINK: 'pink',
  TEAL: 'teal',
  PURPLE: 'purple',
  YELLOW: 'yellow',
};

const markColor = atomWithStorage(
  `${PREFIX}-${dataTypes.MARK_COLOR}`,
  markColors.RED,
  undefined,
  { getOnInit: true }
);

const board = atomWithStorage(`${PREFIX}-${dataTypes.GAME}`, null, undefined, {
  getOnInit: true,
});

const bingoType = atomWithStorage(
  `${PREFIX}-${dataTypes.BINGO_TYPE}`,
  bingoTypes.TRADITIONAL,
  undefined,
  { getOnInit: true }
);

export const atoms = {
  board,
  bingoType,
  markColor,
};
