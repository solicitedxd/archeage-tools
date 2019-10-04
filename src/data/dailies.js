import {
  DIFFICULTY,
  REWARD,
  ZONE,
} from 'constants/dailies';

export default [
  {
    name: 'Enemies of Sea Trade',
    zones: [ZONE.SOLIS_HEADLANDS, ZONE.TWO_CROWNS, ZONE.DIAMOND_SHORES, ZONE.FREEDICH_ISLAND],
    difficulty: DIFFICULTY.ELITE,
    rewards: [{ type: REWARD.COIN, count: 3197 }, { type: REWARD.GILDA, count: 1 }],
  },
];
