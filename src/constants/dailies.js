export const QUEST_STATUS = 'QUEST_STATUS';
export const QUEST_FACTION = 'QUEST_FACTION';
export const QUEST_REGION = 'QUEST_REGION';
export const QUEST_REWARDS = 'QUEST_REWARDS';
export const QUEST_HIDE_COMPLETED = 'QUEST_HIDE_COMPLETED';
export const QUEST_HIDE = 'QUEST_HIDE';
export const QUEST_SHOW_HIDDEN = 'QUEST_SHOW_HIDDEN';
export const QUEST_HIDE_CATEGORY = 'QUEST_HIDE_CATEGORY';
export const QUEST_COLLAPSE_CATEGORY = 'QUEST_COLLAPSE_CATEGORY';
export const QUEST_LAST_VISIT = 'QUEST_LAST_VISIT';

export const QUEST_INSTANCE_OFFSET = 7000000;

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
export const REWARD_FAMILY_XP = 'Family XP';

export const REWARD_GILDA = 101;
export const REWARD_BSB = 102;

export const CRITERIA_TYPE_CHAT = 'CHAT';
export const CRITERIA_TYPE_COLLECT = 'COLLECT';
export const CRITERIA_TYPE_OTHER = 'OTHER';

export const QUEST_REGIONS = Object.freeze({
  'NA': 'Gamigo',
  'SEA': 'LINE',
});

export const FACTIONS = Object.freeze({
  NUIAN: { id: 1, name: 'Nuian' },
  HARANYAN: { id: 2, name: 'Haranyan' },
  PIRATE: { id: 3, name: 'Pirate' },
});

export const HIDDEN_REWARDS = Object.freeze([
  REWARD_XP,
  REWARD_COINS,
  REWARD_PROFICIENCY,
  REWARD_TITLE,
  REWARD_FAMILY_XP,
]);

export const CUSTOM_REWARDS = Object.freeze([
  { id: REWARD_GILDA, name: 'Gilda Stars', icon: 'gilda' },
  { id: REWARD_BSB, name: 'Blue Salt Bonds', icon: 'bsb' },
]);

export const QUEST_CATEGORY = Object.freeze({
  AURORIA_TERRITORIES: 155,
  ALL_IN_THE_FAMILY: 160,
});

export const QUEST_COMPLETE_GROUPS = Object.freeze([
  // cargo delivery
  [8635, 8636],
  // blue salt dailies
  [5077, 5078],
  [5079, 5080],
]);

export const RESIDENCE_QUESTS = Object.freeze({
  8345: [5, 6, 21, 3, 13, 4, 9, 7, 24, 10], // Chipping In
  8347: [1, 12, 93, 99, 25, 19], // Weave No Man Behind
  8348: [18, 8, 15, 23], // Building a Reputation
  8349: [17, 20], // Smelting Hearts
  8350: [27, 26, 22, 11, 16, 14, 2], // Lend Me a Tanner

  8559: [24, 9, 4, 13, 7], // Trade Outlet: Ynystere or Villanelle
  8560: [12, 25, 99], // Trade Outlet: Austera or Ynystere
  8561: [11, 16, 14], // Trade Outlet: Haranya
  8562: [17], // Trade Outlet: Austera or Villanelle
  8588: [5, 6, 3, 10, 21], // Trade Outlet: Cinderstone or Two Crowns
  8589: [1, 19, 93], // Trade Outlet: Nuia
  8590: [2, 23, 26, 27], // Trade Outlet: Nuia
  8591: [20], // Trade Outlet: Solzreed or Two Crowns
  8592: [23, 15], // Trade Outlet: Haranya
  8593: [8, 18], // Trade Outlet: Solzreed or Cinderstone
});

export const CASTLE_QUESTS = Object.freeze({
  // Calmlands
  10145: [44],
  9381: [44],
  9386: [44],
  9380: [44],
  10156: [44],
  9385: [44],
  9604: [44],
  10153: [44],
  // Marcala
  10146: [43],
  9372: [43],
  9373: [43],
  9378: [43],
  10155: [43],
  9377: [43],
  9603: [43],
  10152: [43],
  // Heedmar
  10147: [33],
  9356: [33],
  9357: [33],
  9362: [33],
  10144: [33],
  9361: [33],
  9601: [33],
  10149: [33],
  // Nuimari
  10148: [34],
  9364: [34],
  9365: [34],
  9370: [34],
  10154: [34],
  9369: [34],
  9602: [34],
  10151: [34],
});

export const BOND_BOARDS = Object.freeze([
  // Fabric
  { questIds: [9044, 9147, 9148], boardIds: [13520, 13524, 13525, 13526, 13529, 13540] },
  // Leather
  { questIds: [9046, 9142, 9143], boardIds: [13527, 13530, 13532, 13534, 13537, 13539, 13545, 13546] },
  // Iron Ingots
  { questIds: [9047, 9137, 9138], boardIds: [13521, 13528, 13538, 11665, 13542, 13531, 13547] },
  // Lumber
  { questIds: [9049, 9152, 9153], boardIds: [13523, 13509, 13536, 13544, 13543, 13535, 13533, 13541] },
]);
