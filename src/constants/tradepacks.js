import { ZONE } from 'constants/dailies';

export const PACK_TYPE = Object.freeze({
  NORMAL: 'Specialty',
  GILDA: 'Gilda Speciality',
  LOCAL: 'Local Speciality',
  FERTILIZER: 'Fertilizer Specialty',
  HONEY: 'Aged Honey',
  SALVE: 'Aged Salve',
  CHEESE: 'Aged Cheese',
  BLUE_SALT: 'Blue Salt',
});

export const FRESHNESS = Object.freeze({
  LUXURY: {
    HIGH: {
      name: 'High Profit',
      modifier: 1.3,
      time: 'under 15min',
    },
    REGULAR: {
      modifier: 1.1,
      time: 'under 30min',
    },
    REDUCED: {
      modifier: 0.9,
      time: 'under 60min',
    },
    LOW: {
      modifier: 0.85,
      time: 'after 60min',
    },
  },
  FINE: {
    HIGH: {
      modifier: 1.15,
      time: 'under 15min',
    },
    REGULAR: {
      modifier: 1.05,
      time: 'under 30min',
    },
    REDUCED: {
      modifier: 0.93,
      time: 'under 3hr',
    },
    LOW: {
      modifier: 0.88,
      time: 'after 3hr',
    },
  },
  COMMERCIAL: {
    HIGH: {
      modifier: 1.05,
      time: 'under 30min',
    },
    REGULAR: {
      modifier: 1.02,
      time: 'under 3hr',
    },
    REDUCED: {
      modifier: 0.95,
      time: 'under 12hr',
    },
    LOW: {
      modifier: 0.90,
      time: 'after 12hr',
    },
  },
  PRESERVED: {
    HIGH: {
      modifier: 1.03,
      time: 'under 6hr',
    },
    REGULAR: {
      modifier: 1.01,
      time: 'under 12hr',
    },
    REDUCED: {
      modifier: 0.96,
      time: 'under 24hr',
    },
    LOW: {
      modifier: 0.92,
      time: 'after 24hr',
    },
  },
});

export const TURN_IN_ZONE = Object.freeze([
  ZONE.SOLIS_HEADLANDS,
  ZONE.VILLANELLE,
  ZONE.YNYSTERE,
  ZONE.TWO_CROWNS,
  ZONE.SOLZREED_PENINSULA,
  ZONE.CINDERSTONE_MOOR,
]);
