import { atomWithStorage } from 'jotai/utils';

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

const board = atomWithStorage(dataTypes.GAME, null, undefined, {
  getOnInit: true,
});

const bingoType = atomWithStorage(
  dataTypes.BINGO_TYPE,
  bingoTypes.TRADITIONAL,
  undefined,
  { getOnInit: true }
);

const longPressAction = atomWithStorage(dataTypes.LONG_PRESS, touchTypes.VIEW);

export const atoms = {
  board,
  bingoType,
  longPressAction,
};
