import { ZONE } from './map';

export const SET_PERCENTAGE = 'SET_PERCENTAGE';
export const SET_PERCENTAGE_DEFAULT = 'SET_PERCENTAGE_DEFAULT';
export const SET_PRICE = 'SET_PRICE';
export const SET_PROFICIENCY = 'SET_PROFICIENCY';
export const SET_WAR = 'SET_WAR';
export const TRADE_PACK_RESET = 'TRADE_PACK_RESET';

export const PACK_TYPE = Object.freeze({
  NORMAL: 'Normal',
  GILDA: 'Gilda',
  LOCAL: 'Local',
  FERTILIZER: 'Fertilizer',
  SALVE: 'Salve',
  CHEESE: 'Cheese',
  HONEY: 'Honey',
  BLUE_SALT: 'Blue Salt',
  SPECIAL: 'Special',
});

export const FRESHNESS = Object.freeze({
  LUXURY: {
    name: 'Luxury',
    HIGH: {
      modifier: 1.3,
      time: 'within 15min',
    },
    REGULAR: {
      modifier: 1.1,
      time: 'within 30min',
    },
    REDUCED: {
      modifier: 0.9,
      time: 'within 60min',
    },
    LOW: {
      modifier: 0.85,
      time: 'after 60min',
    },
  },
  FINE: {
    name: 'Fine',
    HIGH: {
      modifier: 1.15,
      time: 'within 15min',
    },
    REGULAR: {
      modifier: 1.05,
      time: 'within 30min',
    },
    REDUCED: {
      modifier: 0.93,
      time: 'within 3hr',
    },
    LOW: {
      modifier: 0.88,
      time: 'after 3hr',
    },
  },
  COMMERCIAL: {
    name: 'Commercial',
    HIGH: {
      modifier: 1.05,
      time: 'within 30min',
    },
    REGULAR: {
      modifier: 1.02,
      time: 'within 3hr',
    },
    REDUCED: {
      modifier: 0.95,
      time: 'within 12hr',
    },
    LOW: {
      modifier: 0.90,
      time: 'after 12hr',
    },
  },
  PRESERVED: {
    name: 'Preserved',
    HIGH: {
      modifier: 1.03,
      time: 'within 6hr',
    },
    REGULAR: {
      modifier: 1.01,
      time: 'within 12hr',
    },
    REDUCED: {
      modifier: 0.96,
      time: 'within 24hr',
    },
    LOW: {
      modifier: 0.92,
      time: 'after 24hr',
    },
  },
});

export const CARGO = 'Cargo';

export const OUTLET_ZONE = Object.freeze([
  ZONE.SOLIS_HEADLANDS,
  ZONE.VILLANELLE,
  ZONE.YNYSTERE,
  ZONE.TWO_CROWNS,
  ZONE.SOLZREED_PENINSULA,
  ZONE.CINDERSTONE_MOOR,
]);
