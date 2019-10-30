import {
  FRESHNESS,
  PACK_TYPE,
} from 'constants/tradepacks';

export default Object.freeze({
  [ZONE.ARCUM_IRIS]: {
    freshness: FRESHNESS.COMMERCIAL,
    packs: {
      [PACK_TYPE.NORMAL]: {
        materials: [{ item: 'Dried Flowers', count: 180 }, { item: 'Turmeric', count: 3 }],
        labor: 50,
        cost: 0.5,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 14.4258,
          [ZONE.VILLANELLE]: 14.4261,
          [ZONE.YNYSTERE]: 15.9173,
        },
      },
      [PACK_TYPE.GILDA]: {
        materials: [{ item: 'Ground Spices', count: 300 }, { item: 'Egg', count: '10' },
          { item: ITEM.GILDA_STAR, count: 2 }],
        labor: 180,
        cost: 0.5,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 35.4716,
          [ZONE.VILLANELLE]: 35.4258,
          [ZONE.YNYSTERE]: 40.6232,
        },
      },
      [PACK_TYPE.PLAZA]: {
        materials: [{ item: 'Ground Grain', count: 150 }, { item: 'Sunflower', count: 5 }],
        labor: 60,
        cost: 0.75,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 15.8685,
          [ZONE.VILLANELLE]: 15.8685,
          [ZONE.YNYSTERE]: 17.5091,
        },
      },
      [PACK_TYPE.PLAZA]: {
        materials: [{ item: 'Chopped Produce', count: 50 }, { item: 'Ground Grain', count: 50 },
          { item: 'Trimmed Meat', count: 50 }, { item: 'Dried Flowers', count: 50 }],
        labor: 60,
        cost: 0.75,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 16.5897,
          [ZONE.VILLANELLE]: 16.5899,
          [ZONE.YNYSTERE]: 18.3050,
        },
      },
    },
  },
});
