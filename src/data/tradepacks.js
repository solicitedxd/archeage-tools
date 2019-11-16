import {
  CARGO,
  FRESHNESS,
  PACK_TYPE,
} from 'constants/tradepacks';
import { ZONE } from 'constants/map';
import ITEM from './items';
import { CONTINENT } from 'constants/dailies';

const sellLabor = 70;

const cargoPack = {
  labor: 70,
  sellLabor,
};

export const PACK_COSTS = {
  [PACK_TYPE.NORMAL]: {
    gold: 5000,
    labor: 50,
    sellLabor,
  },
  [PACK_TYPE.GILDA]: {
    gold: 5000,
    labor: 180,
    sellLabor,
  },
  [PACK_TYPE.LOCAL]: {
    gold: 7500,
    labor: 60,
    sellLabor,
  },
  [PACK_TYPE.FERTILIZER]: {
    gold: 7500,
    labor: 60,
    sellLabor,
  },
  [PACK_TYPE.HONEY]: {
    gold: 0,
    labor: 65,
    sellLabor,
  },
  [PACK_TYPE.CHEESE]: {
    gold: 0,
    labor: 65,
    sellLabor,
  },
  [PACK_TYPE.SALVE]: {
    gold: 0,
    labor: 65,
    sellLabor,
  },
  [PACK_TYPE.BLUE_SALT]: {
    gold: 0,
    labor: 600,
    sellLabor,
  },
  [ZONE.SOLIS_HEADLANDS]: {
    ...cargoPack,
  },
  [ZONE.TWO_CROWNS]: {
    ...cargoPack,
  },
  [ZONE.DIAMOND_SHORES]: {
    ...cargoPack,
  },
  [ZONE.FREEDICH_ISLAND]: {
    ...cargoPack,
  },
};

const FERTILIZER_PACK = {
  materials: [{ item: ITEM.CHOPPED_PRODUCE, count: 50 }, { item: ITEM.GROUND_GRAIN, count: 50 },
    { item: ITEM.TRIMMED_MEAT, count: 50 }, { item: ITEM.DRIED_FLOWERS, count: 50 }],
};

const SALVE_PACK = {
  materials: [{ item: ITEM.MULTI_PURPOSE_AGING_LARDER, count: 1 }, { item: ITEM.CULTIVATED_GINSENG, count: 20 },
    { item: ITEM.OLIVE, count: 30 }],
};

const CHEESE_PACK = {
  materials: [{ item: ITEM.MULTI_PURPOSE_AGING_LARDER, count: 1 }, { item: ITEM.MILK, count: 50 },
    { item: ITEM.LEMON, count: 30 }],
};

const HONEY_PACK = {
  materials: [{ item: ITEM.MULTI_PURPOSE_AGING_LARDER, count: 1 }, { item: ITEM.HONEY, count: 4 },
    { item: ITEM.HAY_BALE, count: 20 }],
};

const BLUE_SALT_PACK = {
  materials: [{ item: ITEM.BLUE_SALT_BOND, count: 1 }, { item: ITEM.SMALL_ROOT_PIGMENT, count: 1 },
    { item: ITEM.SMALL_SEED_OIL, count: 1 }, { item: ITEM.OPAQUE_POLISH, count: 1 }],
};

export const MULTIPURPOSE_AGING_LARDER = {
  materials: [{ item: ITEM.LUMBER, count: 5 }, { item: ITEM.STONE_BRICK, count: 10 },
    { item: ITEM.IRON_INGOT, count: 10 }, { item: ITEM.ROYAL_SEED, count: 1 }],
  gold: 9000,
  labor: 65,
};

export default Object.freeze({
  // Haranya
  [ZONE.ARCUM_IRIS]: {
    freshness: FRESHNESS.COMMERCIAL,
    packs: {
      [PACK_TYPE.NORMAL]: {
        materials: [{ item: ITEM.DRIED_FLOWERS, count: 180 }, { item: ITEM.TURMERIC, count: 3 }],
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 14.4258,
          [ZONE.VILLANELLE]: 14.4261,
          [ZONE.YNYSTERE]: 15.9173,
        },
      },
      [PACK_TYPE.GILDA]: {
        materials: [{ item: ITEM.GROUND_SPICES, count: 300 }, { item: ITEM.EGG, count: 10 },
          { item: ITEM.GILDA_STAR, count: 2 }],
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 35.4716,
          [ZONE.VILLANELLE]: 35.4258,
          [ZONE.YNYSTERE]: 40.6232,
        },
      },
      [PACK_TYPE.LOCAL]: {
        materials: [{ item: ITEM.GROUND_GRAIN, count: 150 }, { item: ITEM.SUNFLOWER, count: 5 }],
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 15.8685,
          [ZONE.VILLANELLE]: 15.8685,
          [ZONE.YNYSTERE]: 17.5091,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        ...FERTILIZER_PACK,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 16.5897,
          [ZONE.VILLANELLE]: 16.5899,
          [ZONE.YNYSTERE]: 18.3050,
        },
      },
      [PACK_TYPE.SALVE]: {
        ...SALVE_PACK,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 24.1309,
          [ZONE.VILLANELLE]: 22.2298,
          [ZONE.YNYSTERE]: 22.2295,
        },
      },
      [PACK_TYPE.CHEESE]: {
        ...CHEESE_PACK,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 24.2035,
          [ZONE.VILLANELLE]: 22.2968,
          [ZONE.YNYSTERE]: 22.1848,
        },
      },
      [PACK_TYPE.HONEY]: {
        ...HONEY_PACK,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 24.0335,
          [ZONE.VILLANELLE]: 23.2024,
          [ZONE.YNYSTERE]: 22.2748,
        },
      },
    },
  },
  [ZONE.FALCORTH_PLAINS]: {
    freshness: FRESHNESS.FINE,
    packs: {
      [PACK_TYPE.NORMAL]: {
        materials: [{ item: ITEM.GROUND_GRAIN, count: 180 }, { item: ITEM.APPLE, count: 5 }],
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 14.7768,
          [ZONE.VILLANELLE]: 14.7768,
          [ZONE.YNYSTERE]: 16.0753,
        },
      },
      [PACK_TYPE.GILDA]: {
        materials: [{ item: ITEM.MEDICINAL_POWDER, count: 300 }, { item: ITEM.GOOSE_DOWN, count: 10 },
          { item: ITEM.GILDA_STAR, count: 2 }],
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 36.3463,
          [ZONE.VILLANELLE]: 36.3001,
          [ZONE.YNYSTERE]: 41.4976,
        },
      },
      [PACK_TYPE.LOCAL]: {
        materials: [{ item: ITEM.DRIED_FLOWERS, count: 150 }, { item: ITEM.CARROT, count: 15 }],
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 16.2546,
          [ZONE.VILLANELLE]: 16.2544,
          [ZONE.YNYSTERE]: 17.6828,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        ...FERTILIZER_PACK,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 16.9933,
          [ZONE.VILLANELLE]: 16.9933,
          [ZONE.YNYSTERE]: 18.4866,
        },
      },
      [PACK_TYPE.SALVE]: {
        ...SALVE_PACK,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 17.7775,
          [ZONE.VILLANELLE]: 21.3895,
          [ZONE.YNYSTERE]: 24.2035,
        },
      },
      [PACK_TYPE.CHEESE]: {
        ...CHEESE_PACK,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 17.7775,
          [ZONE.VILLANELLE]: 21.3465,
          [ZONE.YNYSTERE]: 24.2035,
        },
      },
      [PACK_TYPE.HONEY]: {
        ...HONEY_PACK,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 18.2226,
          [ZONE.VILLANELLE]: 21.3465,
          [ZONE.YNYSTERE]: 24.2035,
        },
      },
      [PACK_TYPE.BLUE_SALT]: {
        ...BLUE_SALT_PACK,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 93.2792,
          [ZONE.VILLANELLE]: 93.2193,
          [ZONE.YNYSTERE]: 95.1837,
        },
      },
    },
  },
  [ZONE.SUNBITE_WILDS]: {
    freshness: FRESHNESS.COMMERCIAL,
    packs: {},
  },
  [ZONE.TIGERSPINE_MOUNTAINS]: {
    freshness: FRESHNESS.FINE,
    packs: {},
  },
  [ZONE.MAHADEVI]: {
    freshness: FRESHNESS.FINE,
    packs: {},
  },
  [ZONE.SOLIS_HEADLANDS]: {
    freshness: FRESHNESS.LUXURY,
    packs: {},
  },
  [ZONE.VILLANELLE]: {
    freshness: FRESHNESS.LUXURY,
    packs: {},
  },
  [ZONE.SILENT_FOREST]: {
    freshness: FRESHNESS.COMMERCIAL,
    packs: {},
  },
  [ZONE.YNYSTERE]: {
    freshness: FRESHNESS.COMMERCIAL,
    packs: {
      [PACK_TYPE.BLUE_SALT]: {
        ...BLUE_SALT_PACK,
        sell: {
          [ZONE.VILLANELLE]: 91.7807,
        },
      },
    },
  },
  [ZONE.ROOKBORNE_BASIN]: {
    freshness: FRESHNESS.PRESERVED,
    packs: {},
  },
  [ZONE.WINDSCOUR_SAVANNAH]: {
    freshness: FRESHNESS.PRESERVED,
    packs: {},
  },
  [ZONE.PERINOOR_RUINS]: {
    freshness: FRESHNESS.PRESERVED,
    packs: {},
  },
  [ZONE.HASLA]: {
    freshness: FRESHNESS.PRESERVED,
    packs: {},
  },
  [ZONE.ROKHALA_MOUNTAINS]: {
    freshness: FRESHNESS.PRESERVED,
    packs: {},
  },
  // Nuia
  [ZONE.SOLZREED_PENINSULA]: {
    freshness: FRESHNESS.LUXURY,
    packs: {},
  },
  [ZONE.GWEONID_FOREST]: {
    freshness: FRESHNESS.COMMERCIAL,
    packs: {},
  },
  [ZONE.LILYUT_HILLS]: {
    freshness: FRESHNESS.FINE,
    packs: {},
  },
  [ZONE.AIRAIN_ROCK]: {
    freshness: FRESHNESS.COMMERCIAL,
    packs: {},
  },
  [ZONE.AUBRE_CRADLE]: {
    freshness: FRESHNESS.COMMERCIAL,
    packs: {},
  },
  [ZONE.DEWSTONE_PLAINS]: {
    freshness: FRESHNESS.FINE,
    packs: {},
  },
  [ZONE.WHITE_ARDEN]: {
    freshness: FRESHNESS.FINE,
    packs: {},
  },
  [ZONE.MARIANOPLE]: {
    freshness: FRESHNESS.FINE,
    packs: {},
  },
  [ZONE.TWO_CROWNS]: {
    freshness: FRESHNESS.LUXURY,
    packs: {},
  },
  [ZONE.CINDERSTONE_MOOR]: {
    freshness: FRESHNESS.LUXURY,
    packs: {},
  },
  [ZONE.HALCYONA]: {
    freshness: FRESHNESS.PRESERVED,
    packs: {},
  },
  [ZONE.HELLSWAMP]: {
    freshness: FRESHNESS.PRESERVED,
    packs: {},
  },
  [ZONE.SANDDEEP]: {
    freshness: FRESHNESS.PRESERVED,
    packs: {},
  },
  [ZONE.KARKASSE_RIDGELANDS]: {
    freshness: FRESHNESS.COMMERCIAL,
    packs: {},
  },
  [ZONE.AHNIMAR]: {
    freshness: FRESHNESS.PRESERVED,
    packs: {},
  },
  // Cargo
  [CONTINENT.HARANYA.name]: {
    freshness: FRESHNESS.CARGO,
    packs: {
      [ZONE.TWO_CROWNS]: {
        item: ITEM.ONYX_ARCHEUM_ESSENCE,
        sell: {
          [CARGO]: 13,
        },
      },
      [ZONE.DIAMOND_SHORES]: {
        item: ITEM.ONYX_ARCHEUM_ESSENCE,
        sell: {
          [CARGO]: 26,
        },
      },
      [ZONE.FREEDICH_ISLAND]: {
        item: ITEM.DRAGON_ESSENCE_STABILIZER,
        sell: {
          [CARGO]: 3.4,
        },
      },
    },
  },
  [CONTINENT.NUIA.name]: {
    freshness: FRESHNESS.CARGO,
    packs: {
      [ZONE.SOLIS_HEADLANDS]: {
        item: ITEM.ONYX_ARCHEUM_ESSENCE,
        sell: {
          [CARGO]: 13,
        },
      },
      [ZONE.DIAMOND_SHORES]: {
        item: ITEM.ONYX_ARCHEUM_ESSENCE,
        sell: {
          [CARGO]: 26,
        },
      },
      [ZONE.FREEDICH_ISLAND]: {
        item: ITEM.DRAGON_ESSENCE_STABILIZER,
        sell: {
          [CARGO]: 3.4,
        },
      },
    },
  },
});
