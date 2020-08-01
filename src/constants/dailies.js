import { CURRENCY } from 'constants/items';

export const QUEST_STATUS = 'QUEST_STATUS';
export const QUEST_RESET = 'QUEST_RESET';
export const QUEST_FACTION = 'QUEST_FACTION';
export const QUEST_REGION = 'QUEST_REGION';
export const QUEST_FILTER_REWARD = 'QUEST_FILTER_REWARD';
export const QUEST_FILTER_CONTINENT = 'QUEST_FILTER_CONTINENT';
export const QUEST_FILTER_TYPE = 'QUEST_FILTER_TYPE';
export const QUEST_HIDE_COMPLETED = 'QUEST_HIDE_COMPLETED';
export const QUEST_HIDE = 'QUEST_HIDE';
export const QUEST_HIDE_MODE = 'QUEST_HIDE_MODE';
export const QUEST_HIDE_RESET = 'QUEST_HIDE_RESET';
export const QUEST_RESET_FILTERS = 'QUEST_RESET_FILTERS';
export const QUEST_SHOW_HIDDEN = 'QUEST_SHOW_HIDDEN';
export const QUEST_HIDE_CATEGORY = 'QUEST_HIDE_CATEGORY';
export const QUEST_COLLAPSE_CATEGORY = 'QUEST_COLLAPSE_CATEGORY';
export const QUEST_LAST_VISIT = 'QUEST_LAST_VISIT';

export const QUEST_INSTANCE_OFFSET = 7000000;

export const QUEST_REGIONS = Object.freeze({
  'NA': 'Gamigo',
  'SEA': 'LINE',
});

export const FLAG_DAILY = 'DLY';
export const FLAG_WEEKLY = 'WKLY';
export const FLAG_ELITE = 'Q_EL';
export const FLAG_EPIC = 'Q_EP';
export const FLAG_LEGENDARY = 'Q_LG';
export const FLAG_MYTHIC = 'Q_MY';
export const FLAG_REPEATABLE = 'RPT';
export const FLAG_MONDAY = 'D_M';
export const FLAG_TUESDAY = 'D_T';
export const FLAG_WEDNESDAY = 'D_W';
export const FLAG_THURSDAY = 'D_TH';
export const FLAG_FRIDAY = 'D_F';
export const FLAG_SATURDAY = 'D_S';
export const FLAG_SUNDAY = 'D_SU';

export const REWARD_ITEM = 'Items';
export const REWARD_XP = 'XP';
export const REWARD_COINS = 'Coins';
export const REWARD_PROFICIENCY = 'Proficiency';
export const REWARD_TITLE = 'Title';

export const CRITERIA_TYPE_CHAT = 'CHAT';
export const CRITERIA_TYPE_COLLECT = 'COLLECT';
export const CRITERIA_TYPE_OTHER = 'OTHER';

export const DAILY_TYPE = Object.freeze({
  BLUE_SALT: 'Blue Salt',
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
  CURRENCY.BLUE_SALT_BOND,
  CURRENCY.GILDA,
  CURRENCY.GUILD_XP,
  CURRENCY.HONOR,
  CURRENCY.ITEM,
  CURRENCY.LEADERSHIP,
  CURRENCY.PRESTIGE,
  CURRENCY.VOCATION,
]);

export const FACTIONS = Object.freeze({
  NUIAN: { id: 1, name: 'Nuian' },
  HARANYAN: { id: 2, name: 'Haranyan' },
  PIRATE: { id: 3, name: 'Pirate' },
});


