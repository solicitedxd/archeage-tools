import { ZONE } from 'constants/map';
import { REGIONS } from 'constants/myGame';

export const BOND_CHANGE_TIME = Object.freeze({
  [REGIONS.NA]: '05:00:00',
  [REGIONS.EU]: '22:00:00',
  [REGIONS.SEA]: '14:00:00',
});

export const BOND_ZONE_MATERIAL = Object.freeze({
  // fabric
  8256: [
    2, 6, 8, 22,
    7, 11,
  ],
  // iron
  8318: [
    3, 10, 20, null,
    4, 13, 24, 99,
  ],
  // lumber
  8337: [
    1, 5, 18, 26,
    15, 17, 23, 25,
  ],
  // leather
  16327: [
    19, 21, 27, 93,
    9, 12, 14, 16,
  ],
});

export const BOND_QUANTITY = Object.freeze({
  20: 25000,
  60: 75000,
  100: 125000,
});

export const CAUTION_ZONES = Object.freeze([
  ZONE.TWO_CROWNS,
  ZONE.WHITE_ARDEN,
  ZONE.DEWSTONE_PLAINS,
]);
