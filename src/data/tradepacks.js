import {
  FRESHNESS,
  PACK_TYPE,
} from 'constants/tradepacks';
import ITEM from './items';

export const PACK_COSTS = {
  [PACK_TYPE.NORMAL]: {
    gold: 0.5,
    labor: 50,
  },
  [PACK_TYPE.GILDA]: {
    gold: 0.5,
    labor: 180,
  },
  [PACK_TYPE.LOCAL]: {
    gold: 0.75,
    labor: 60,
  },
  [PACK_TYPE.FERTILIZER]: {
    gold: 0.75,
    labor: 60,
  },
  [PACK_TYPE.HONEY]: {
    gold: 0,
    labor: 65,
  },
  [PACK_TYPE.CHEESE]: {
    gold: 0,
    labor: 65,
  },
  [PACK_TYPE.SALVE]: {
    gold: 0,
    labor: 65,
  },
  [PACK_TYPE.BLUE_SALT]: {
    gold: 0,
    labor: 600,
  },
};

const FERTILIZER_PACK = {
  materials: [{ item: ITEM.CHOPPED_PRODUCE, count: 50 }, { item: ITEM.GROUND_GRAIN, count: 50 },
    { item: ITEM.TRIMMED_MEAT, count: 50 }, { item: ITEM.DRIED_FLOWERS, count: 50 }],
};

const SALVE_PACK = {
  materials: [{ item: ITEM.CULTIVATED_GINSENG, count: 20 }, { item: ITEM.OLIVE, count: 30 }],
};

const CHEESE_PACK = {
  materials: [{ item: ITEM.MILK, count: 50 }, { item: ITEM.LEMON, count: 30 }],
};

const HONEY_PACK = {
  materials: [{ item: ITEM.HONEY, count: 4 }, { item: ITEM.HAY_BALE, count: 20 }],
};

const BLUE_SALT_PACK = {
  materials: [{ item: ITEM.BLUE_SALT_BOND, count: 1 }, { item: ITEM.SMALL_ROOT_PIGMENT, count: 1 },
    { item: ITEM.SMALL_SEED_OIL, count: 1 }, { item: ITEM.OPAQUE_POLISH, count: 1 }],
};

export const MULTIPURPOSE_AGING_LARDER = {
  materials: [{ item: 'Lumber', count: 5 }, { item: 'Stone Brick', count: 10 }, { item: 'Iron Ingot', count: 10 },
    { item: 'Royal Seed', count: 1 }],
  cost: 0.9,
  labor: 65,
};

export default Object.freeze({
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
          [ZONE.SOLIS_HEADLANDS]: 13.1731,
          [ZONE.VILLANELLE]: 14.7768,
          [ZONE.YNYSTERE]: 16.0753,
        },
      },
      [PACK_TYPE.GILDA]: {
        materials: [{ item: ITEM.MEDICINAL_POWDER, count: 300 }, { item: ITEM.GOOSE_DOWN, count: 10 },
          { item: ITEM.GILDA_STAR, count: 2 }],
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 36.3462,
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
});
