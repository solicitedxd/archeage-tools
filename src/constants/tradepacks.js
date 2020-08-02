import { ITEM } from 'constants/items';
import {
  CONTINENT,
  ZONE,
} from './map';

export const SET_CONTINENT = 'SET_CONTINENT';
export const SET_OUTLET = 'SET_OUTLET';
export const SET_CRAFT_LARDER = 'SET_CRAFT_LARDER';
export const SET_DEGRADATION = 'SET_DEGRADATION';
export const SET_FRESHNESS = 'SET_FRESHNESS';
export const SET_INTEREST = 'SET_INTEREST';
export const SET_PERCENTAGE = 'SET_PERCENTAGE';
export const SET_PERCENTAGE_DEFAULT = 'SET_PERCENTAGE_DEFAULT';
export const SET_QUANTITY = 'SET_QUANTITY';
export const SET_SUPPLY = 'SET_SUPPLY';
export const SET_TRANSPORTATION_QUANTITY = 'SET_TRANSPORTATION_QUANTITY';
export const SET_WAR = 'SET_WAR';
export const SET_AH_CUT = 'SET_AH_CUT';
export const TRADE_PACK_RESET = 'TRADE_PACK_RESET';

export const SELL_LABOR = 70;
export const BUY_CARGO_LABOR = 75;
export const SELL_CARGO_LABOR = 175;
export const LARDER_HARVEST_LABOR = 65;

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
  DISGUISED: 'Disguised',
});

export const AGED_PACK = Object.freeze([
  PACK_TYPE.SALVE,
  PACK_TYPE.CHEESE,
  PACK_TYPE.HONEY,
]);

export const AGED_PACK_RECIPE = Object.freeze({
  [PACK_TYPE.SALVE]: 11294,
  [PACK_TYPE.CHEESE]: 11293,
  [PACK_TYPE.HONEY]: 11292,
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

const REGULAR_PACK_TYPES = Object.freeze([
  PACK_TYPE.NORMAL,
  PACK_TYPE.GILDA,
  PACK_TYPE.LOCAL,
  PACK_TYPE.FERTILIZER,
  PACK_TYPE.SALVE,
  PACK_TYPE.CHEESE,
  PACK_TYPE.HONEY,
  PACK_TYPE.BLUE_SALT,
  PACK_TYPE.SPECIAL,
  PACK_TYPE.ANTIQUITIES,
]);

export const FRESHNESS = Object.freeze({
  LUXURY: {
    name: 'Luxury',
    STANDARD: {
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
      DIMINISHED: {
        modifier: 0.85,
        time: 'within 2hr',
      },
      LOW: {
        modifier: 0.65,
        time: 'after 2hr',
      },
    },
    AGED: {
      REDUCED: {
        modifier: 0.9,
        time: 'within 24hr',
      },
      HIGH: {
        modifier: 1.3,
        time: 'within 48hr',
      },
      REGULAR: {
        modifier: 1.1,
        time: 'within 51h',
      },
      DIMINISHED: {
        modifier: 0.85,
        time: 'within 56hr',
      },
      LOW: {
        modifier: 0.65,
        time: 'after 56h',
      },
    },
  },
  FINE: {
    name: 'Fine',
    STANDARD: {
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
      DIMINISHED: {
        modifier: 0.88,
        time: 'within 24hr',
      },
      LOW: {
        modifier: 0.65,
        time: 'after 24hr',
      },
    },
    AGED: {
      REDUCED: {
        modifier: 0.82,
        time: 'within 24hr',
      },
      HIGH: {
        modifier: 1.15,
        time: 'within 48hr',
      },
      REGULAR: {
        modifier: 1.02,
        time: 'within 52hr',
      },
      DIMINISHED: {
        modifier: 0.88,
        time: 'within 60hr',
      },
      LOW: {
        modifier: 0.65,
        time: 'after 60hr',
      },
    },
  },
  COMMERCIAL: {
    name: 'Commercial',
    STANDARD: {
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
      DIMINISHED: {
        modifier: 0.90,
        time: 'within 24hr',
      },
      LOW: {
        modifier: 0.65,
        time: 'after 24hr',
      },
    },
    AGED: {
      REDUCED: {
        modifier: 0.75,
        time: 'within 24hr',
      },
      HIGH: {
        modifier: 1.05,
        time: 'within 60hr',
      },
      REGULAR: {
        modifier: 1.02,
        time: 'within 62hr',
      },
      DIMINISHED: {
        modifier: 0.90,
        time: 'within 96hr',
      },
      LOW: {
        modifier: 0.65,
        time: 'after 96hr',
      },
    },
  },
  PRESERVED: {
    name: 'Preserved',
    STANDARD: {
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
      DIMINISHED: {
        modifier: 0.92,
        time: 'within 72hr',
      },
      LOW: {
        modifier: 0.65,
        time: 'after 72hr',
      },
    },
    AGED: {
      REDUCED: {
        modifier: 0.73,
        time: 'within 24hr',
      },
      HIGH: {
        modifier: 1.03,
        time: 'within 72hr',
      },
      REGULAR: {
        modifier: 1.01,
        time: 'within 88hr',
      },
      DIMINISHED: {
        modifier: 0.92,
        time: 'within 120hr',
      },
      LOW: {
        modifier: 0.65,
        time: 'after 120hr',
      },
    },
  },
  CARGO: {
    name: 'Cargo',
    STANDARD: {
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
  },
  DISGUISED: {
    name: 'Disguised',
    STANDARD: {
      HIGH: {
        modifier: 1.0,
        time: 'anytime',
      },
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

export const CONTINENT_PACKS = {
  [CONTINENT.NUIA.name]: REGULAR_PACK_TYPES,
  [CONTINENT.HARANYA.name]: REGULAR_PACK_TYPES,
  [CARGO]: CARGO_OUTLET,
  [CONTINENT.AURORIA.name]: [
    PACK_TYPE.DISGUISED,
  ],
};
