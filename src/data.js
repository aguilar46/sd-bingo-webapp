import { atomWithStorage } from 'jotai/utils';

const PREFIX = 'SD';

export const touchTypes = {
  SELECT: 'select',
  VIEW: 'view',
};

export const bingoTypes = {
  TRADITIONAL: 'traditional',
  BLACKOUT: 'blackout',
};

export const dataTypes = {
  GAME: 'game',
  LONG_PRESS: 'long-press-action',
  BINGO_TYPE: 'bingo-type',
};

const board = atomWithStorage(`${PREFIX}-${dataTypes.GAME}`, null, undefined, {
  getOnInit: true,
});

const bingoType = atomWithStorage(
  `${PREFIX}-${dataTypes.BINGO_TYPE}`,
  bingoTypes.TRADITIONAL,
  undefined,
  { getOnInit: true }
);

const longPressAction = atomWithStorage(
  `${PREFIX}-${dataTypes.LONG_PRESS}`,
  touchTypes.VIEW
);

export const atoms = {
  board,
  bingoType,
  longPressAction,
};
