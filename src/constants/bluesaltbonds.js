import { REGIONS } from 'constants/myGame';

export const BOND_CHANGE_TIME = Object.freeze({
  [REGIONS.NA]: '05:00:00',
  [REGIONS.EU]: '22:00:00',
  [REGIONS.SEA]: '14:00:00',
});

export const BOND_ZONE_MATERIAL = Object.freeze({
  // fabric
  8256: [2, 6, 8, 22, 7, 11],
  // iron
  8318: [3, 10, 20, 4, 24, 13, 99],
  // lumber
  8337: [5, 1, 18, 26, 25, 17, 15, 23],
  // leather
  16327: [9, 12, 14, 16, 19, 21, 27, 93],
});

export const BOND_QUANTITY = Object.freeze({
  20: 25000,
  60: 75000,
  100: 125000,
});
