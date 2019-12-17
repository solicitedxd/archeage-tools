import { CURRENCY } from 'constants/items';

export const SET_DISPLAY_GRID = 'SET_DISPLAY_GRID';
export const SET_ONLY_OBTAINABLE = 'SET_ONLY_OBTAINABLE';

export const MOUNT_TYPE = Object.freeze({
  STARTER: 'Starter Mount',
  STANDARD: 'Standard Mount',
  CLIMBING: 'Climbing Mount',
  AQUATIC: 'Aquatic Mount',
  FLYING: 'Flying Mount',
  DONKEY: 'Donkey',
});

export const CRAFTED = 'Crafted';
export const HUSBANDRY = 'Husbandry';
export const QUEST = 'Quest';

export const OBTAIN_TYPES = [
  CURRENCY.COIN,
  CURRENCY.VOCATION,
  CURRENCY.DILIGENCE,
  CURRENCY.MANASTORM,
  CURRENCY.CREDIT,
  CURRENCY.LOYALTY,
  CURRENCY.GILDA,
  CURRENCY.KYRIOS,
  CRAFTED,
  HUSBANDRY,
  QUEST,
];
