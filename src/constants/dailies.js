import { CURRENCY } from 'constants/items';

export const QUEST_STATUS = 'QUEST_STATUS';
export const QUEST_RESET = 'QUEST_RESET';
export const QUEST_FILTER_FACTION = 'QUEST_FILTER_FACTION';
export const QUEST_FILTER_REWARD = 'QUEST_FILTER_REWARD';
export const QUEST_FILTER_CONTINENT = 'QUEST_FILTER_CONTINENT';
export const QUEST_FILTER_TYPE = 'QUEST_FILTER_TYPE';
export const QUEST_FILTER_COMPLETE = 'QUEST_FILTER_COMPLETE';
export const QUEST_HIDE = 'QUEST_HIDE';
export const QUEST_HIDE_MODE = 'QUEST_HIDE_MODE';
export const QUEST_HIDE_RESET = 'QUEST_HIDE_RESET';

export const DAILY_TYPE = Object.freeze({
  BLUE_SALT: 'Blue Salt',
  SUPPLY_DEMAND: 'Bonds',
  HUNTING_REQUEST: 'Hunting Request',
  WORLD_BOSS: 'World Boss',
  DUNGEON: 'Dungeon',
  FAMILY: 'Family',
  GUILD: 'Guild Mission',
  OTHER: 'Other',
  RIFT: 'Rift',
  HIRAM: 'Hiram',
});

export const DIFFICULTY = Object.freeze({
  ELITE: 'Elite',
  EPIC: 'Epic',
  LEGENDARY: 'Legendary',
  MYTHIC: 'Mythic',
});

export const CURRENCY_DISPLAY = Object.freeze([
  CURRENCY.COIN,
  CURRENCY.FAMILY_XP,
  CURRENCY.GILDA,
  CURRENCY.GUILD_XP,
  CURRENCY.HONOR,
  CURRENCY.ITEM,
  CURRENCY.LEADERSHIP,
  CURRENCY.PRESTIGE,
  CURRENCY.VOCATION,
]);


