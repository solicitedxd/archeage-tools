import ITEM from 'data/items';
import { ZONE } from './map';

export const SET_CONTINENT = 'SET_CONTINENT';
export const SET_CRAFT_LARDER = 'SET_CRAFT_LARDER';
export const SET_DEGRADATION = 'SET_DEGRADATION';
export const SET_FRESHNESS = 'SET_FRESHNESS';
export const SET_INTEREST = 'SET_INTEREST';
export const SET_PERCENTAGE = 'SET_PERCENTAGE';
export const SET_PERCENTAGE_DEFAULT = 'SET_PERCENTAGE_DEFAULT';
export const SET_PRICE = 'SET_PRICE';
export const SET_PROFICIENCY = 'SET_PROFICIENCY';
export const SET_QUANTITY = 'SET_QUANTITY';
export const SET_SUPPLY = 'SET_SUPPLY';
export const SET_TRANSPORTATION_QUANTITY = 'SET_TRANSPORTATION_QUANTITY';
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
  ANTIQUITIES: 'Antiquities',
});

export const NO_FRESHNESS = Object.freeze([
  PACK_TYPE.BLUE_SALT,
  PACK_TYPE.ANTIQUITIES,
  PACK_TYPE.SPECIAL,
]);

export const TRANSPORTATION_FUEL = Object.freeze([
  ITEM.CARROT,
  ITEM.ECO_FRIENDLY_FUEL,
  ITEM.AXLE_GREASE,
]);

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
      time: 'within 1hr',
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
  CARGO: {
    name: 'Cargo',
    HIGH: {
      modifier: 1.15,
      time: 'within 30min',
    },
    REGULAR: {
      modifier: 1,
      time: 'within 2hr',
    },
    REDUCED: {
      modifier: 0.80,
      time: 'within 6hr',
    },
    LOW: {
      modifier: 0.60,
      time: 'after 6hr',
    },
  },
});

export const CARGO = 'Cargo';

export const CARGO_SUPPLY = Object.freeze({
  LIMITED: {
    percent: 130,
    price: 260000,
  },
  INSUFFICIENT: {
    percent: 110,
    price: 220000,
  },
  NORMAL: {
    percent: 90,
    price: 180000,
  },
  ABUNDANT: {
    percent: 70,
    price: 140000,
  },
});

export const OUTLET_ZONE = Object.freeze([
  ZONE.SOLIS_HEADLANDS,
  ZONE.VILLANELLE,
  ZONE.YNYSTERE,
  ZONE.TWO_CROWNS,
  ZONE.SOLZREED_PENINSULA,
  ZONE.CINDERSTONE_MOOR,
]);

export const CARGO_OUTLET = Object.freeze([
  ZONE.SOLIS_HEADLANDS,
  ZONE.TWO_CROWNS,
  ZONE.DIAMOND_SHORES,
  ZONE.FREEDICH_ISLAND,
]);
