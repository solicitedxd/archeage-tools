import {
  DIFFICULTY,
  REWARD,
  TYPE,
  ZONE,
} from 'constants/dailies';
import ITEM from 'constants/items';

export default [
  {
    name: 'Enemies of Sea Trade',
    zones: [ZONE.SOLIS_HEADLANDS, ZONE.TWO_CROWNS, ZONE.DIAMOND_SHORES, ZONE.FREEDICH_ISLAND],
    difficulty: DIFFICULTY.ELITE,
    rewards: [{ type: REWARD.COIN, count: 3197 }, { type: REWARD.GILDA, count: 1 }],
  },
  {
    name: 'Decorated Warrior',
    zones: [ZONE.SOLIS_HEADLANDS, ZONE.YNYSTERE, ZONE.MARIANOPLE, ZONE.CINDERSTONE_MOOR, ZONE.DIAMOND_SHORES],
    rewards: [{ type: REWARD.ITEM, item: ITEM.LABOR_RECHARGE }],
  },
  {
    name: 'Battle of Mistmerrow',
    zones: [ZONE.SOLIS_HEADLANDS, ZONE.YNYSTERE, ZONE.MARIANOPLE, ZONE.CINDERSTONE_MOOR, ZONE.DIAMOND_SHORES],
    rewards: [{ type: REWARD.ITEM, item: ITEM.LABOR_RECHARGE }],
  },
  {
    name: 'Crimson Omens 1',
    zones: [ZONE.YNYSTERE, ZONE.CINDERSTONE_MOOR, ZONE.SUNGOLD_FIELDS],
    difficulty: DIFFICULTY.ELITE,
    rewards: [{ type: REWARD.ITEM, item: ITEM.IMPROVED_INFUSION_KIT, count: 2 }, { type: REWARD.HONOR, count: 100 }],
  },
  {
    name: 'Crimson Omens 2',
    zones: [ZONE.YNYSTERE, ZONE.CINDERSTONE_MOOR, ZONE.SUNGOLD_FIELDS],
    difficulty: DIFFICULTY.ELITE,
    rewards: [{ type: REWARD.ITEM, item: ITEM.IMPROVED_INFUSION_KIT, count: 3 }, { type: REWARD.HONOR, count: 300 }],
  },
  {
    name: 'Crimson Omens 3',
    zones: [ZONE.YNYSTERE, ZONE.CINDERSTONE_MOOR, ZONE.SUNGOLD_FIELDS],
    difficulty: DIFFICULTY.ELITE,
    rewards: [{ type: REWARD.ITEM, item: ITEM.IMPROVED_INFUSION_KIT, count: 4 }, { type: REWARD.HONOR, count: 500 },
      { type: REWARD.LEADERSHIP, count: 10 }],
  },
  {
    name: 'Supply Demand: Lumber',
    idx: 1,
    zones: [ZONE.SILENT_FOREST],
    rewards: [{ type: REWARD.COIN, count: 25000 }, { type: REWARD.ITEM, item: ITEM.BLUE_SALT_BOND }],
    type: TYPE.BLUE_SALT,
  },
  {
    name: 'Supply Demand: Lumber',
    idx: 2,
    zones: [ZONE.YNYSTERE],
    rewards: [{ type: REWARD.COIN, count: 25000 }, { type: REWARD.ITEM, item: ITEM.BLUE_SALT_BOND }],
    type: TYPE.BLUE_SALT,
  },
  {
    name: 'Supply Demand: Lumber',
    idx: 3,
    zones: [ZONE.PERINOOR_RUINS],
    rewards: [{ type: REWARD.COIN, count: 25000 }, { type: REWARD.ITEM, item: ITEM.BLUE_SALT_BOND }],
    type: TYPE.BLUE_SALT,
  },
  {
    name: 'Supply Demand: Lumber',
    idx: 4,
    zones: [ZONE.HASLA],
    rewards: [{ type: REWARD.COIN, count: 25000 }, { type: REWARD.ITEM, item: ITEM.BLUE_SALT_BOND }],
    type: TYPE.BLUE_SALT,
  },
  {
    name: 'Ghosts from the Depths',
    zones: [ZONE.SOLIS_HEADLANDS, ZONE.YNYSTERE, ZONE.MARIANOPLE, ZONE.TWO_CROWNS, ZONE.DIAMOND_SHORES],
    rewards: [{ type: REWARD.COIN, count: 3618 }, { type: REWARD.GILDA, count: 1 }],
    type: TYPE.WORLD_BOSS,
    difficulty: DIFFICULTY.EPIC,
  },
  {
    name: 'Ghost Ships of Delphinad',
    zones: [ZONE.SOLIS_HEADLANDS, ZONE.YNYSTERE, ZONE.MARIANOPLE, ZONE.TWO_CROWNS, ZONE.DIAMOND_SHORES],
    rewards: [{ type: REWARD.COIN, count: 5427 }, { type: REWARD.GILDA, count: 3 }, { type: REWARD.HONOR, count: 200 }],
    type: TYPE.WORLD_BOSS,
    difficulty: DIFFICULTY.LEGENDARY,
  },
];
