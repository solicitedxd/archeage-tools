import { ITEM } from 'constants/items';
import {
  CONTINENT,
  ZONE,
} from 'constants/map';
import {
  CARGO,
  FRESHNESS,
  PACK_TYPE,
} from 'constants/tradepacks';

export default Object.freeze({
  // Haranya
  [ZONE.ARCUM_IRIS]: {
    freshness: FRESHNESS.COMMERCIAL,
    packs: {
      [PACK_TYPE.NORMAL]: {
        recipeId: 6237,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 14.4258,
          [ZONE.VILLANELLE]: 14.4261,
          [ZONE.YNYSTERE]: 15.9173,
        },
      },
      [PACK_TYPE.GILDA]: {
        recipeId: 6214,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 35.4716,
          [ZONE.VILLANELLE]: 35.4258,
          [ZONE.YNYSTERE]: 40.6232,
        },
      },
      [PACK_TYPE.LOCAL]: {
        recipeId: 9608,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 15.8685,
          [ZONE.VILLANELLE]: 15.8685,
          [ZONE.YNYSTERE]: 17.5091,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        recipeId: 7783,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 16.5897,
          [ZONE.VILLANELLE]: 16.5899,
          [ZONE.YNYSTERE]: 18.3050,
        },
      },
      [PACK_TYPE.SALVE]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 24.1309,
          [ZONE.VILLANELLE]: 22.2298,
          [ZONE.YNYSTERE]: 22.2295,
        },
      },
      [PACK_TYPE.CHEESE]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 24.2035,
          [ZONE.VILLANELLE]: 22.2968,
          [ZONE.YNYSTERE]: 22.1848,
        },
      },
      [PACK_TYPE.HONEY]: {
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
        recipeId: 6239,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 14.7768,
          [ZONE.VILLANELLE]: 14.7768,
          [ZONE.YNYSTERE]: 16.0753,
        },
      },
      [PACK_TYPE.GILDA]: {
        recipeId: 6216,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 36.3463,
          [ZONE.VILLANELLE]: 36.3001,
          [ZONE.YNYSTERE]: 41.4976,
        },
      },
      [PACK_TYPE.LOCAL]: {
        recipeId: 9618,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 16.2546,
          [ZONE.VILLANELLE]: 16.2544,
          [ZONE.YNYSTERE]: 17.6828,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        recipeId: 7785,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 16.9933,
          [ZONE.VILLANELLE]: 16.9933,
          [ZONE.YNYSTERE]: 18.4866,
        },
      },
      [PACK_TYPE.SALVE]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 17.7775,
          [ZONE.VILLANELLE]: 21.3895,
          [ZONE.YNYSTERE]: 24.2035,
        },
      },
      [PACK_TYPE.CHEESE]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 17.7775,
          [ZONE.VILLANELLE]: 21.3465,
          [ZONE.YNYSTERE]: 24.2035,
        },
      },
      [PACK_TYPE.HONEY]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 18.2226,
          [ZONE.VILLANELLE]: 21.3465,
          [ZONE.YNYSTERE]: 24.2035,
        },
      },
      [PACK_TYPE.BLUE_SALT]: {
        recipeId: 11037,
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
    packs: {
      [PACK_TYPE.NORMAL]: {
        recipeId: 9348,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 15.0609,
          [ZONE.VILLANELLE]: 15.0609,
          [ZONE.YNYSTERE]: 17.2025,
        },
      },
      [PACK_TYPE.GILDA]: {
        recipeId: 9347,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 37.1424,
          [ZONE.VILLANELLE]: 37.0964,
          [ZONE.YNYSTERE]: 42.2944,
        },
      },
      [PACK_TYPE.LOCAL]: {
        recipeId: 9612,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 16.5669,
          [ZONE.VILLANELLE]: 16.5667,
          [ZONE.YNYSTERE]: 20.0016,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        recipeId: 9350,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 17.3199,
          [ZONE.VILLANELLE]: 17.3201,
          [ZONE.YNYSTERE]: 20.9106,
        },
      },
      [PACK_TYPE.SALVE]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 26.0393,
          [ZONE.VILLANELLE]: 23.2259,
          [ZONE.YNYSTERE]: 28.7713,
        },
      },
      [PACK_TYPE.CHEESE]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 25.9348,
          [ZONE.VILLANELLE]: 23.2728,
          [ZONE.YNYSTERE]: 28.8869,
        },
      },
      [PACK_TYPE.HONEY]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 26.0393,
          [ZONE.VILLANELLE]: 24.1550,
          [ZONE.YNYSTERE]: 28.8294,
        },
      },
    },
  },
  [ZONE.TIGERSPINE_MOUNTAINS]: {
    freshness: FRESHNESS.FINE,
    packs: {
      [PACK_TYPE.NORMAL]: {
        recipeId: 6240,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 13.1731,
          [ZONE.VILLANELLE]: 13.1731,
          [ZONE.YNYSTERE]: 15.6657,
        },
      },
      [PACK_TYPE.GILDA]: {
        recipeId: 6217,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 34.2737,
          [ZONE.VILLANELLE]: 34.2277,
          [ZONE.YNYSTERE]: 39.4253,
        },
      },
      [PACK_TYPE.LOCAL]: {
        recipeId: 9609,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 14.4904,
          [ZONE.VILLANELLE]: 14.4904,
          [ZONE.YNYSTERE]: 17.2325,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        recipeId: 7786,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 15.1491,
          [ZONE.VILLANELLE]: 15.1491,
          [ZONE.YNYSTERE]: 18.0157,
        },
      },
      [PACK_TYPE.SALVE]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 21.4538,
          [ZONE.VILLANELLE]: 21.2820,
          [ZONE.YNYSTERE]: 21.4540,
        },
      },
      [PACK_TYPE.CHEESE]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 21.3248,
          [ZONE.VILLANELLE]: 21.4537,
          [ZONE.YNYSTERE]: 21.2820,
        },
      },
      [PACK_TYPE.HONEY]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 21.3248,
          [ZONE.VILLANELLE]: 21.4324,
          [ZONE.YNYSTERE]: 21.2820,
        },
      },
    },
  },
  [ZONE.MAHADEVI]: {
    freshness: FRESHNESS.FINE,
    packs: {
      [PACK_TYPE.NORMAL]: {
        recipeId: 6238,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 9.2793,
          [ZONE.VILLANELLE]: 9.2793,
          [ZONE.YNYSTERE]: 15.1726,
        },
      },
      [PACK_TYPE.GILDA]: {
        recipeId: 6215,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 32.3630,
          [ZONE.VILLANELLE]: 32.3171,
          [ZONE.YNYSTERE]: 37.5149,
        },
      },
      [PACK_TYPE.LOCAL]: {
        recipeId: 9610,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 10.2070,
          [ZONE.VILLANELLE]: 10.2072,
          [ZONE.YNYSTERE]: 16.6899,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        recipeId: 7784,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 10.6711,
          [ZONE.VILLANELLE]: 10.6709,
          [ZONE.YNYSTERE]: 17.4485,
        },
      },
      [PACK_TYPE.SALVE]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 20.3976,
          [ZONE.VILLANELLE]: 20.3978,
          [ZONE.YNYSTERE]: 21.3034,
        },
      },
      [PACK_TYPE.CHEESE]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 20.5006,
          [ZONE.VILLANELLE]: 20.3568,
          [ZONE.YNYSTERE]: 21.2605,
        },
      },
      [PACK_TYPE.HONEY]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 20.4594,
          [ZONE.VILLANELLE]: 20.3978,
          [ZONE.YNYSTERE]: 21.3892,
        },
      },
      [PACK_TYPE.BLUE_SALT]: {
        recipeId: 11035,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 88.0827,
          [ZONE.VILLANELLE]: 88.0228,
          [ZONE.YNYSTERE]: 94.8038,
        },
      },
    },
  },
  [ZONE.SOLIS_HEADLANDS]: {
    freshness: FRESHNESS.LUXURY,
    packs: {
      [PACK_TYPE.NORMAL]: {
        recipeId: 6236,
        sell: {
          [ZONE.VILLANELLE]: 13.9452,
          [ZONE.YNYSTERE]: 14.5529,
        },
      },
      [PACK_TYPE.GILDA]: {
        recipeId: 6213,
        sell: {
          [ZONE.VILLANELLE]: 34.6798,
          [ZONE.YNYSTERE]: 35.7619,
        },
      },
      [PACK_TYPE.LOCAL]: {
        recipeId: 9611,
        sell: {
          [ZONE.VILLANELLE]: 15.3397,
          [ZONE.YNYSTERE]: 16.0080,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        recipeId: 7782,
        sell: {
          [ZONE.VILLANELLE]: 16.0369,
          [ZONE.YNYSTERE]: 16.7357,
        },
      },
      [PACK_TYPE.SALVE]: {
        sell: {
          [ZONE.VILLANELLE]: 22.2074,
          [ZONE.YNYSTERE]: 21.2607,
        },
      },
      [PACK_TYPE.CHEESE]: {
        sell: {
          [ZONE.VILLANELLE]: 22.3418,
          [ZONE.YNYSTERE]: 21.3036,
        },
      },
      [PACK_TYPE.HONEY]: {
        sell: {
          [ZONE.VILLANELLE]: 22.1850,
          [ZONE.YNYSTERE]: 21.4538,
        },
      },
    },
  },
  [ZONE.VILLANELLE]: {
    freshness: FRESHNESS.LUXURY,
    packs: {
      [PACK_TYPE.NORMAL]: {
        recipeId: 6242,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 13.9452,
          [ZONE.YNYSTERE]: 14.2856,
        },
      },
      [PACK_TYPE.GILDA]: {
        recipeId: 6219,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 34.6798,
          [ZONE.YNYSTERE]: 35.1977,
        },
      },
      [PACK_TYPE.LOCAL]: {
        recipeId: 9613,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 15.3397,
          [ZONE.YNYSTERE]: 15.7142,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        recipeId: 7788,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 16.0369,
          [ZONE.YNYSTERE]: 16.4284,
        },
      },
      [PACK_TYPE.SALVE]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 23.2027,
          [ZONE.YNYSTERE]: 20.3771,
        },
      },
      [PACK_TYPE.CHEESE]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 23.2027,
          [ZONE.YNYSTERE]: 20.5209,
        },
      },
      [PACK_TYPE.HONEY]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 23.3194,
          [ZONE.YNYSTERE]: 19.4510,
        },
      },
    },
  },
  [ZONE.SILENT_FOREST]: {
    freshness: FRESHNESS.COMMERCIAL,
    packs: {
      [PACK_TYPE.NORMAL]: {
        recipeId: 6241,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 15.1452,
          [ZONE.VILLANELLE]: 10.1214,
          [ZONE.YNYSTERE]: 10.7154,
        },
      },
      [PACK_TYPE.GILDA]: {
        recipeId: 6218,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 37.3823,
          [ZONE.VILLANELLE]: 32.7020,
          [ZONE.YNYSTERE]: 32.4957,
        },
      },
      [PACK_TYPE.LOCAL]: {
        recipeId: 9614,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 16.6600,
          [ZONE.VILLANELLE]: 11.2677,
          [ZONE.YNYSTERE]: 12.8871,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        recipeId: 7787,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 17.4171,
          [ZONE.VILLANELLE]: 11.7798,
          [ZONE.YNYSTERE]: 13.4729,
        },
      },
      [PACK_TYPE.SALVE]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 25.1345,
          [ZONE.VILLANELLE]: 19.5687,
          [ZONE.YNYSTERE]: 19.4705,
        },
      },
      [PACK_TYPE.CHEESE]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 24.9833,
          [ZONE.VILLANELLE]: 19.5489,
          [ZONE.YNYSTERE]: 19.4313,
        },
      },
      [PACK_TYPE.HONEY]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 25.0841,
          [ZONE.VILLANELLE]: 19.4706,
          [ZONE.YNYSTERE]: 19.4118,
        },
      },
      [PACK_TYPE.BLUE_SALT]: {
        recipeId: 11036,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 94.6308,
          [ZONE.VILLANELLE]: 88.5251,
          [ZONE.YNYSTERE]: 88.2557,
        },
      },
    },
  },
  [ZONE.YNYSTERE]: {
    freshness: FRESHNESS.COMMERCIAL,
    packs: {
      [PACK_TYPE.NORMAL]: {
        recipeId: 6246,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 15.5331,
          [ZONE.VILLANELLE]: 15.8069,
        },
      },
      [PACK_TYPE.GILDA]: {
        recipeId: 6223,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 35.7619,
          [ZONE.VILLANELLE]: 35.1977,
        },
      },
      [PACK_TYPE.LOCAL]: {
        recipeId: 9617,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 18.1647,
          [ZONE.VILLANELLE]: 18.4662,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        recipeId: 7792,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 18.9908,
          [ZONE.VILLANELLE]: 19.3055,
        },
      },
      [PACK_TYPE.SALVE]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 23.1558,
          [ZONE.VILLANELLE]: 23.2025,
        },
      },
      [PACK_TYPE.CHEESE]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 23.1328,
          [ZONE.VILLANELLE]: 23.2727,
        },
      },
      [PACK_TYPE.HONEY]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 23.2262,
          [ZONE.VILLANELLE]: 23.3193,
        },
      },
      [PACK_TYPE.BLUE_SALT]: {
        recipeId: 11042,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 92.5172,
          [ZONE.VILLANELLE]: 91.7807,
        },
      },
      [PACK_TYPE.SPECIAL]: {
        name: 'Ynystere Space-Time Fragment',
        recipeId: 10314,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 37.6694,
          [ZONE.VILLANELLE]: 34.1068,
        },
      },
    },
  },
  [ZONE.ROOKBORNE_BASIN]: {
    freshness: FRESHNESS.PRESERVED,
    packs: {
      [PACK_TYPE.NORMAL]: {
        recipeId: 6245,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 19.3118,
          [ZONE.VILLANELLE]: 16.0288,
          [ZONE.YNYSTERE]: 15.7586,
        },
      },
      [PACK_TYPE.GILDA]: {
        recipeId: 6222,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 40.8900,
          [ZONE.VILLANELLE]: 36.0698,
          [ZONE.YNYSTERE]: 35.8571,
        },
      },
      [PACK_TYPE.LOCAL]: {
        recipeId: 9619,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 21.2424,
          [ZONE.VILLANELLE]: 18.7422,
          [ZONE.YNYSTERE]: 18.4453,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        recipeId: 7791,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 22.2084,
          [ZONE.VILLANELLE]: 19.5941,
          [ZONE.YNYSTERE]: 19.2836,
        },
      },
      [PACK_TYPE.SALVE]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 25.1698,
          [ZONE.VILLANELLE]: 22.9197,
          [ZONE.YNYSTERE]: 21.9645,
        },
      },
      [PACK_TYPE.CHEESE]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 25.1698,
          [ZONE.VILLANELLE]: 22.8503,
          [ZONE.YNYSTERE]: 21.9645,
        },
      },
      [PACK_TYPE.HONEY]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 25.8139,
          [ZONE.VILLANELLE]: 23.0350,
          [ZONE.YNYSTERE]: 22.0972,
        },
      },
      [PACK_TYPE.SPECIAL]: {
        name: 'Rookborne Hide Rug',
        recipeId: 10315,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 48.9158,
          [ZONE.VILLANELLE]: 25.9383,
          [ZONE.YNYSTERE]: 24.9282,
        },
      },
    },
  },
  [ZONE.WINDSCOUR_SAVANNAH]: {
    freshness: FRESHNESS.PRESERVED,
    packs: {
      [PACK_TYPE.NORMAL]: {
        recipeId: 6243,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 17.7168,
          [ZONE.VILLANELLE]: 17.7167,
          [ZONE.YNYSTERE]: 19.1607,
        },
      },
      [PACK_TYPE.GILDA]: {
        recipeId: 6220,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 38.2522,
          [ZONE.VILLANELLE]: 38.2062,
          [ZONE.YNYSTERE]: 40.3453,
        },
      },
      [PACK_TYPE.LOCAL]: {
        recipeId: 9620,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 19.4882,
          [ZONE.VILLANELLE]: 19.4882,
          [ZONE.YNYSTERE]: 21.0769,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        recipeId: 7789,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 20.3743,
          [ZONE.VILLANELLE]: 20.3741,
          [ZONE.YNYSTERE]: 22.0350,
        },
      },
      [PACK_TYPE.SALVE]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 22.5701,
          [ZONE.VILLANELLE]: 24.0334,
          [ZONE.YNYSTERE]: 29.5798,
        },
      },
      [PACK_TYPE.CHEESE]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 22.5701,
          [ZONE.VILLANELLE]: 24.0334,
          [ZONE.YNYSTERE]: 29.5793,
        },
      },
      [PACK_TYPE.HONEY]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 23.1447,
          [ZONE.VILLANELLE]: 24.1794,
          [ZONE.YNYSTERE]: 29.5798,
        },
      },
      [PACK_TYPE.SPECIAL]: {
        name: 'Windscour Concentrated Antidote',
        recipeId: 10316,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 41.8132,
          [ZONE.VILLANELLE]: 41.5857,
          [ZONE.YNYSTERE]: 52.0871,
        },
      },
    },
  },
  [ZONE.PERINOOR_RUINS]: {
    freshness: FRESHNESS.PRESERVED,
    packs: {
      [PACK_TYPE.NORMAL]: {
        recipeId: 6244,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 18.7490,
          [ZONE.VILLANELLE]: 18.6887,
          [ZONE.YNYSTERE]: 18.5037,
        },
      },
      [PACK_TYPE.GILDA]: {
        recipeId: 6221,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 39.7172,
          [ZONE.VILLANELLE]: 39.6716,
          [ZONE.YNYSTERE]: 39.3631,
        },
      },
      [PACK_TYPE.LOCAL]: {
        recipeId: 9616,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 20.6239,
          [ZONE.VILLANELLE]: 20.5573,
          [ZONE.YNYSTERE]: 20.3545,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        recipeId: 7790,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 21.5614,
          [ZONE.VILLANELLE]: 21.4917,
          [ZONE.YNYSTERE]: 21.2796,
        },
      },
      [PACK_TYPE.SALVE]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 28.6845,
          [ZONE.VILLANELLE]: 26.8066,
          [ZONE.YNYSTERE]: 29.3822,
        },
      },
      [PACK_TYPE.CHEESE]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 28.8002,
          [ZONE.VILLANELLE]: 26.8337,
          [ZONE.YNYSTERE]: 29.1473,
        },
      },
      [PACK_TYPE.HONEY]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 28.7134,
          [ZONE.VILLANELLE]: 26.8066,
          [ZONE.YNYSTERE]: 29.3822,
        },
      },
      [PACK_TYPE.BLUE_SALT]: {
        recipeId: 11044,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 97.6775,
          [ZONE.VILLANELLE]: 97.6174,
          [ZONE.YNYSTERE]: 97.2148,
        },
      },
      [PACK_TYPE.ANTIQUITIES]: {
        recipeId: 9383,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 14.1536,
          [ZONE.VILLANELLE]: 14.0869,
          [ZONE.YNYSTERE]: 13.8835,
        },
      },
      [PACK_TYPE.SPECIAL]: {
        name: 'Perinoor Ghost Light',
        recipeId: 10317,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 49.0068,
          [ZONE.VILLANELLE]: 48.7792,
          [ZONE.YNYSTERE]: 47.2641,
        },
      },
    },
  },
  [ZONE.HASLA]: {
    freshness: FRESHNESS.PRESERVED,
    packs: {
      [PACK_TYPE.NORMAL]: {
        recipeId: 6247,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 20.2894,
          [ZONE.VILLANELLE]: 20.2386,
          [ZONE.YNYSTERE]: 20.1368,
        },
      },
      [PACK_TYPE.GILDA]: {
        recipeId: 6224,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 42.3719,
          [ZONE.VILLANELLE]: 42.2717,
          [ZONE.YNYSTERE]: 42.0647,
        },
      },
      [PACK_TYPE.LOCAL]: {
        recipeId: 9615,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 22.3188,
          [ZONE.VILLANELLE]: 22.2630,
          [ZONE.YNYSTERE]: 22.1503,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        recipeId: 7793,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 23.3328,
          [ZONE.VILLANELLE]: 23.2748,
          [ZONE.YNYSTERE]: 23.1572,
        },
      },
      [PACK_TYPE.SALVE]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 36.0504,
          [ZONE.VILLANELLE]: 34.2015,
          [ZONE.YNYSTERE]: 35.6601,
        },
      },
      [PACK_TYPE.CHEESE]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 36.2323,
          [ZONE.VILLANELLE]: 34.3398,
          [ZONE.YNYSTERE]: 35.7323,
        },
      },
      [PACK_TYPE.HONEY]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 36.1963,
          [ZONE.VILLANELLE]: 34.4781,
          [ZONE.YNYSTERE]: 35.8759,
        },
      },
      [PACK_TYPE.ANTIQUITIES]: {
        recipeId: 9378,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 15.8482,
          [ZONE.VILLANELLE]: 15.7924,
          [ZONE.YNYSTERE]: 15.6797,
        },
      },
      [PACK_TYPE.SPECIAL]: {
        name: 'Hasla Scimitar',
        recipeId: 10318,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 62.0380,
          [ZONE.VILLANELLE]: 61.5466,
          [ZONE.YNYSTERE]: 60.5319,
        },
      },
    },
  },
  [ZONE.ROKHALA_MOUNTAINS]: {
    freshness: FRESHNESS.PRESERVED,
    packs: {
      [PACK_TYPE.NORMAL]: {
        recipeId: 9352,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 19.1029,
          [ZONE.VILLANELLE]: 16.9847,
          [ZONE.YNYSTERE]: 16.8278,
        },
      },
      [PACK_TYPE.GILDA]: {
        recipeId: 9351,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 40.3343,
          [ZONE.VILLANELLE]: 37.3360,
          [ZONE.YNYSTERE]: 37.1299,
        },
      },
      [PACK_TYPE.LOCAL]: {
        recipeId: 9621,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 21.0137,
          [ZONE.VILLANELLE]: 18.6832,
          [ZONE.YNYSTERE]: 18.5106,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        recipeId: 9354,
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 21.9688,
          [ZONE.VILLANELLE]: 21.4323,
          [ZONE.YNYSTERE]: 21.3892,
        },
      },
      [PACK_TYPE.SALVE]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 36.2886,
          [ZONE.VILLANELLE]: 24.1790,
          [ZONE.YNYSTERE]: 27.3518,
        },
      },
      [PACK_TYPE.CHEESE]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 36.2886,
          [ZONE.VILLANELLE]: 24.0577,
          [ZONE.YNYSTERE]: 27.4067,
        },
      },
      [PACK_TYPE.HONEY]: {
        sell: {
          [ZONE.SOLIS_HEADLANDS]: 37.2339,
          [ZONE.VILLANELLE]: 24.1552,
          [ZONE.YNYSTERE]: 27.3792,
        },
      },
    },
  },
  // Nuia
  [ZONE.SOLZREED_PENINSULA]: {
    freshness: FRESHNESS.LUXURY,
    packs: {
      [PACK_TYPE.NORMAL]: {
        recipeId: 6228,
        sell: {
          [ZONE.TWO_CROWNS]: 12.0228,
          [ZONE.CINDERSTONE_MOOR]: 10.6411,
        },
      },
      [PACK_TYPE.GILDA]: {
        recipeId: 6205,
        sell: {
          [ZONE.TWO_CROWNS]: 33.7826,
          [ZONE.CINDERSTONE_MOOR]: 32.5661,
        },
      },
      [PACK_TYPE.LOCAL]: {
        recipeId: 9593,
        sell: {
          [ZONE.TWO_CROWNS]: 13.2248,
          [ZONE.CINDERSTONE_MOOR]: 12.7837,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        recipeId: 7774,
        sell: {
          [ZONE.TWO_CROWNS]: 13.8262,
          [ZONE.CINDERSTONE_MOOR]: 13.3647,
        },
      },
      [PACK_TYPE.SALVE]: {
        sell: {
          [ZONE.TWO_CROWNS]: 19.4313,
          [ZONE.CINDERSTONE_MOOR]: 23.1792,
        },
      },
      [PACK_TYPE.CHEESE]: {
        sell: {
          [ZONE.TWO_CROWNS]: 19.5296,
          [ZONE.CINDERSTONE_MOOR]: 23.1093,
        },
      },
      [PACK_TYPE.HONEY]: {
        sell: {
          [ZONE.TWO_CROWNS]: 19.4901,
          [ZONE.CINDERSTONE_MOOR]: 23.2027,
        },
      },
    },
  },
  [ZONE.GWEONID_FOREST]: {
    freshness: FRESHNESS.COMMERCIAL,
    packs: {
      [PACK_TYPE.NORMAL]: {
        recipeId: 6225,
        sell: {
          [ZONE.TWO_CROWNS]: 14.7315,
          [ZONE.SOLZREED_PENINSULA]: 14.3808,
          [ZONE.CINDERSTONE_MOOR]: 15.8434,
        },
      },
      [PACK_TYPE.GILDA]: {
        recipeId: 6202,
        sell: {
          [ZONE.TWO_CROWNS]: 38.8415,
          [ZONE.SOLZREED_PENINSULA]: 35.3302,
          [ZONE.CINDERSTONE_MOOR]: 40.3069,
        },
      },
      [PACK_TYPE.LOCAL]: {
        recipeId: 9596,
        sell: {
          [ZONE.TWO_CROWNS]: 15.3417,
          [ZONE.SOLZREED_PENINSULA]: 15.819,
          [ZONE.CINDERSTONE_MOOR]: 17.4278,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        recipeId: 7771,
        sell: {
          [ZONE.TWO_CROWNS]: 16.0388,
          [ZONE.SOLZREED_PENINSULA]: 16.538,
          [ZONE.CINDERSTONE_MOOR]: 18.2198,
        },
      },
      [PACK_TYPE.SALVE]: {
        sell: {
          [ZONE.TWO_CROWNS]: 23.1793,
          [ZONE.SOLZREED_PENINSULA]: 22.2523,
          [ZONE.CINDERSTONE_MOOR]: 23.2258,
        },
      },
      [PACK_TYPE.CHEESE]: {
        sell: {
          [ZONE.TWO_CROWNS]: 23.2027,
          [ZONE.SOLZREED_PENINSULA]: 22.2746,
          [ZONE.CINDERSTONE_MOOR]: 23.1561,
        },
      },
      [PACK_TYPE.HONEY]: {
        sell: {
          [ZONE.TWO_CROWNS]: 23.1793,
          [ZONE.SOLZREED_PENINSULA]: 22.2072,
          [ZONE.CINDERSTONE_MOOR]: 23.1327,
        },
      },
      [PACK_TYPE.BLUE_SALT]: {
        recipeId: 11039,
        sell: {
          [ZONE.TWO_CROWNS]: 96.5346,
          [ZONE.SOLZREED_PENINSULA]: 91.9539,
          [ZONE.CINDERSTONE_MOOR]: 98.4466,
        },
      },
    },
  },
  [ZONE.LILYUT_HILLS]: {
    freshness: FRESHNESS.FINE,
    packs: {
      [PACK_TYPE.NORMAL]: {
        recipeId: 6230,
        sell: {
          [ZONE.TWO_CROWNS]: 13.8642,
          [ZONE.SOLZREED_PENINSULA]: 10.2765,
          [ZONE.CINDERSTONE_MOOR]: 15.3026,
        },
      },
      [PACK_TYPE.GILDA]: {
        recipeId: 6207,
        sell: {
          [ZONE.TWO_CROWNS]: 36.4784,
          [ZONE.SOLZREED_PENINSULA]: 32.9671,
          [ZONE.CINDERSTONE_MOOR]: 37.9443,
        },
      },
      [PACK_TYPE.LOCAL]: {
        recipeId: 9594,
        sell: {
          [ZONE.TWO_CROWNS]: 14.1722,
          [ZONE.SOLZREED_PENINSULA]: 11.3045,
          [ZONE.CINDERSTONE_MOOR]: 16.8329,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        recipeId: 7776,
        sell: {
          [ZONE.TWO_CROWNS]: 14.8164,
          [ZONE.SOLZREED_PENINSULA]: 11.8182,
          [ZONE.CINDERSTONE_MOOR]: 17.5983,
        },
      },
      [PACK_TYPE.SALVE]: {
        sell: {
          [ZONE.TWO_CROWNS]: 20.3771,
          [ZONE.SOLZREED_PENINSULA]: 18.506,
          [ZONE.CINDERSTONE_MOOR]: 22.3195,
        },
      },
      [PACK_TYPE.CHEESE]: {
        sell: {
          [ZONE.TWO_CROWNS]: 20.3771,
          [ZONE.SOLZREED_PENINSULA]: 18.6181,
          [ZONE.CINDERSTONE_MOOR]: 22.3416,
        },
      },
      [PACK_TYPE.HONEY]: {
        sell: {
          [ZONE.TWO_CROWNS]: 20.4182,
          [ZONE.SOLZREED_PENINSULA]: 18.6181,
          [ZONE.CINDERSTONE_MOOR]: 22.2073,
        },
      },
      [PACK_TYPE.BLUE_SALT]: {
        recipeId: 11038,
        sell: {
          [ZONE.TWO_CROWNS]: 90.4356,
          [ZONE.SOLZREED_PENINSULA]: 93.8565,
          [ZONE.CINDERSTONE_MOOR]: 92.3472,
        },
      },
    },
  },
  [ZONE.AIRAIN_ROCK]: {
    freshness: FRESHNESS.COMMERCIAL,
    packs: {
      [PACK_TYPE.NORMAL]: {
        recipeId: 9332,
        sell: {
          [ZONE.TWO_CROWNS]: 14.3225,
          [ZONE.SOLZREED_PENINSULA]: 15.2511,
          [ZONE.CINDERSTONE_MOOR]: 15.6658,
        },
      },
      [PACK_TYPE.GILDA]: {
        recipeId: 9331,
        sell: {
          [ZONE.TWO_CROWNS]: 37.9876,
          [ZONE.SOLZREED_PENINSULA]: 38.5125,
          [ZONE.CINDERSTONE_MOOR]: 39.4533,
        },
      },
      [PACK_TYPE.LOCAL]: {
        recipeId: 9606,
        sell: {
          [ZONE.TWO_CROWNS]: 14.6764,
          [ZONE.SOLZREED_PENINSULA]: 16.5609,
          [ZONE.CINDERSTONE_MOOR]: 17.2322,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        recipeId: 9334,
        sell: {
          [ZONE.TWO_CROWNS]: 15.3435,
          [ZONE.SOLZREED_PENINSULA]: 17.3137,
          [ZONE.CINDERSTONE_MOOR]: 18.0156,
        },
      },
      [PACK_TYPE.SALVE]: {
        sell: {
          [ZONE.TWO_CROWNS]: 23.3193,
          [ZONE.SOLZREED_PENINSULA]: 25.1091,
          [ZONE.CINDERSTONE_MOOR]: 26.9962,
        },
      },
      [PACK_TYPE.CHEESE]: {
        sell: {
          [ZONE.TWO_CROWNS]: 20.6118,
          [ZONE.SOLZREED_PENINSULA]: 25.0586,
          [ZONE.CINDERSTONE_MOOR]: 27.6542,
        },
      },
      [PACK_TYPE.HONEY]: {
        sell: {
          [ZONE.TWO_CROWNS]: 23.2724,
          [ZONE.SOLZREED_PENINSULA]: 24.9577,
          [ZONE.CINDERSTONE_MOOR]: 26.834,
        },
      },
    },
  },
  [ZONE.AUBRE_CRADLE]: {
    freshness: FRESHNESS.COMMERCIAL,
    packs: {
      [PACK_TYPE.NORMAL]: {
        recipeId: 9336,
        sell: {
          [ZONE.TWO_CROWNS]: 13.9217,
          [ZONE.SOLZREED_PENINSULA]: 14.8771,
          [ZONE.CINDERSTONE_MOOR]: 15.1724,
        },
      },
      [PACK_TYPE.GILDA]: {
        recipeId: 9335,
        sell: {
          [ZONE.TWO_CROWNS]: 36.0773,
          [ZONE.SOLZREED_PENINSULA]: 36.6019,
          [ZONE.CINDERSTONE_MOOR]: 37.5424,
        },
      },
      [PACK_TYPE.LOCAL]: {
        recipeId: 9605,
        sell: {
          [ZONE.TWO_CROWNS]: 14.4509,
          [ZONE.SOLZREED_PENINSULA]: 16.3651,
          [ZONE.CINDERSTONE_MOOR]: 16.6898,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        recipeId: 9338,
        sell: {
          [ZONE.TWO_CROWNS]: 15.1077,
          [ZONE.SOLZREED_PENINSULA]: 17.1091,
          [ZONE.CINDERSTONE_MOOR]: 17.4487,
        },
      },
      [PACK_TYPE.SALVE]: {
        sell: {
          [ZONE.TWO_CROWNS]: 21.3893,
          [ZONE.SOLZREED_PENINSULA]: 21.3247,
          [ZONE.CINDERSTONE_MOOR]: 25.1095,
        },
      },
      [PACK_TYPE.CHEESE]: {
        sell: {
          [ZONE.TWO_CROWNS]: 15.9917,
          [ZONE.SOLZREED_PENINSULA]: 21.2818,
          [ZONE.CINDERSTONE_MOOR]: 22.1347,
        },
      },
      [PACK_TYPE.HONEY]: {
        sell: {
          [ZONE.TWO_CROWNS]: 21.2606,
          [ZONE.SOLZREED_PENINSULA]: 21.4325,
          [ZONE.CINDERSTONE_MOOR]: 25.0841,
        },
      },
    },
  },
  [ZONE.DEWSTONE_PLAINS]: {
    freshness: FRESHNESS.FINE,
    packs: {
      [PACK_TYPE.NORMAL]: {
        recipeId: 6227,
        sell: {
          [ZONE.TWO_CROWNS]: 13.9177,
          [ZONE.SOLZREED_PENINSULA]: 10.3146,
          [ZONE.CINDERSTONE_MOOR]: 14.6692,
        },
      },
      [PACK_TYPE.GILDA]: {
        recipeId: 6204,
        sell: {
          [ZONE.TWO_CROWNS]: 34.5679,
          [ZONE.SOLZREED_PENINSULA]: 32.9102,
          [ZONE.CINDERSTONE_MOOR]: 36.0335,
        },
      },
      [PACK_TYPE.LOCAL]: {
        recipeId: 9595,
        sell: {
          [ZONE.TWO_CROWNS]: 15.3094,
          [ZONE.SOLZREED_PENINSULA]: 11.346,
          [ZONE.CINDERSTONE_MOOR]: 16.1361,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        recipeId: 7773,
        sell: {
          [ZONE.TWO_CROWNS]: 16.0056,
          [ZONE.SOLZREED_PENINSULA]: 11.8616,
          [ZONE.CINDERSTONE_MOOR]: 16.8694,
        },
      },
      [PACK_TYPE.SALVE]: {
        sell: {
          [ZONE.TWO_CROWNS]: 20.0346,
          [ZONE.SOLZREED_PENINSULA]: 19.4705,
          [ZONE.CINDERSTONE_MOOR]: 21.3464,
        },
      },
      [PACK_TYPE.CHEESE]: {
        sell: {
          [ZONE.TWO_CROWNS]: 19.8941,
          [ZONE.SOLZREED_PENINSULA]: 19.4117,
          [ZONE.CINDERSTONE_MOOR]: 21.3681,
        },
      },
      [PACK_TYPE.HONEY]: {
        sell: {
          [ZONE.TWO_CROWNS]: 19.8738,
          [ZONE.SOLZREED_PENINSULA]: 19.5491,
          [ZONE.CINDERSTONE_MOOR]: 21.4539,
        },
      },
    },
  },
  [ZONE.WHITE_ARDEN]: {
    freshness: FRESHNESS.COMMERCIAL,
    packs: {
      [PACK_TYPE.NORMAL]: {
        recipeId: 6229,
        sell: {
          [ZONE.TWO_CROWNS]: 12.9337,
          [ZONE.SOLZREED_PENINSULA]: 14.9409,
          [ZONE.CINDERSTONE_MOOR]: 14.5119,
        },
      },
      [PACK_TYPE.GILDA]: {
        recipeId: 6206,
        sell: {
          [ZONE.TWO_CROWNS]: 34.1666,
          [ZONE.SOLZREED_PENINSULA]: 36.7888,
          [ZONE.CINDERSTONE_MOOR]: 35.6319,
        },
      },
      [PACK_TYPE.LOCAL]: {
        recipeId: 9603,
        sell: {
          [ZONE.TWO_CROWNS]: 14.2272,
          [ZONE.SOLZREED_PENINSULA]: 16.4348,
          [ZONE.CINDERSTONE_MOOR]: 15.9629,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        recipeId: 7775,
        sell: {
          [ZONE.TWO_CROWNS]: 14.8736,
          [ZONE.SOLZREED_PENINSULA]: 17.1818,
          [ZONE.CINDERSTONE_MOOR]: 16.6887,
        },
      },
      [PACK_TYPE.SALVE]: {
        sell: {
          [ZONE.TWO_CROWNS]: 21.3465,
          [ZONE.SOLZREED_PENINSULA]: 20.3362,
          [ZONE.CINDERSTONE_MOOR]: 22.185,
        },
      },
      [PACK_TYPE.CHEESE]: {
        sell: {
          [ZONE.TWO_CROWNS]: 21.4539,
          [ZONE.SOLZREED_PENINSULA]: 20.3566,
          [ZONE.CINDERSTONE_MOOR]: 22.2744,
        },
      },
      [PACK_TYPE.HONEY]: {
        sell: {
          [ZONE.TWO_CROWNS]: 21.3678,
          [ZONE.SOLZREED_PENINSULA]: 20.4183,
          [ZONE.CINDERSTONE_MOOR]: 22.2073,
        },
      },
      [PACK_TYPE.ANTIQUITIES]: {
        recipeId: 9386,
        sell: {
          [ZONE.TWO_CROWNS]: 10.9919,
          [ZONE.SOLZREED_PENINSULA]: 13.1996,
          [ZONE.CINDERSTONE_MOOR]: 12.7275,
        },
      },
      [PACK_TYPE.BLUE_SALT]: {
        recipeId: 11041,
        sell: {
          [ZONE.TWO_CROWNS]: 90.4353,
          [ZONE.SOLZREED_PENINSULA]: 93.8563,
          [ZONE.CINDERSTONE_MOOR]: 92.3471,
        },
      },
    },
  },
  [ZONE.MARIANOPLE]: {
    freshness: FRESHNESS.FINE,
    packs: {
      [PACK_TYPE.NORMAL]: {
        recipeId: 6226,
        sell: {
          [ZONE.TWO_CROWNS]: 9.5251,
          [ZONE.SOLZREED_PENINSULA]: 12.9336,
          [ZONE.CINDERSTONE_MOOR]: 13.449,
        },
      },
      [PACK_TYPE.GILDA]: {
        recipeId: 6203,
        sell: {
          [ZONE.TWO_CROWNS]: 32.4957,
          [ZONE.SOLZREED_PENINSULA]: 34.1449,
          [ZONE.CINDERSTONE_MOOR]: 33.9608,
        },
      },
      [PACK_TYPE.LOCAL]: {
        recipeId: 9598,
        sell: {
          [ZONE.TWO_CROWNS]: 10.4776,
          [ZONE.SOLZREED_PENINSULA]: 14.227,
          [ZONE.CINDERSTONE_MOOR]: 15.8723,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        recipeId: 7772,
        sell: {
          [ZONE.TWO_CROWNS]: 10.9538,
          [ZONE.SOLZREED_PENINSULA]: 14.8739,
          [ZONE.CINDERSTONE_MOOR]: 16.5938,
        },
      },
      [PACK_TYPE.SALVE]: {
        sell: {
          [ZONE.TWO_CROWNS]: 18.6556,
          [ZONE.SOLZREED_PENINSULA]: 19.4315,
          [ZONE.CINDERSTONE_MOOR]: 20.4389,
        },
      },
      [PACK_TYPE.CHEESE]: {
        sell: {
          [ZONE.TWO_CROWNS]: 18.5996,
          [ZONE.SOLZREED_PENINSULA]: 19.4119,
          [ZONE.CINDERSTONE_MOOR]: 20.4593,
        },
      },
      [PACK_TYPE.HONEY]: {
        sell: {
          [ZONE.TWO_CROWNS]: 18.6556,
          [ZONE.SOLZREED_PENINSULA]: 19.4903,
          [ZONE.CINDERSTONE_MOOR]: 20.4389,
        },
      },
      [PACK_TYPE.BLUE_SALT]: {
        recipeId: 11040,
        sell: {
          [ZONE.TWO_CROWNS]: 88.2557,
          [ZONE.SOLZREED_PENINSULA]: 90.4075,
          [ZONE.CINDERSTONE_MOOR]: 90.1674,
        },
      },
    },
  },
  [ZONE.TWO_CROWNS]: {
    freshness: FRESHNESS.LUXURY,
    packs: {
      [PACK_TYPE.NORMAL]: {
        recipeId: 6231,
        sell: {
          [ZONE.SOLZREED_PENINSULA]: 12.4686,
          [ZONE.CINDERSTONE_MOOR]: 9.835,
        },
      },
      [PACK_TYPE.GILDA]: {
        recipeId: 6208,
        sell: {
          [ZONE.SOLZREED_PENINSULA]: 33.9673,
          [ZONE.CINDERSTONE_MOOR]: 31.4654,
        },
      },
      [PACK_TYPE.LOCAL]: {
        recipeId: 9602,
        sell: {
          [ZONE.SOLZREED_PENINSULA]: 13.7156,
          [ZONE.CINDERSTONE_MOOR]: 11.8969,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        recipeId: 7777,
        sell: {
          [ZONE.SOLZREED_PENINSULA]: 14.3388,
          [ZONE.CINDERSTONE_MOOR]: 12.4377,
        },
      },
      [PACK_TYPE.SALVE]: {
        sell: {
          [ZONE.SOLZREED_PENINSULA]: 19.5881,
          [ZONE.CINDERSTONE_MOOR]: 21.3463,
        },
      },
      [PACK_TYPE.CHEESE]: {
        sell: {
          [ZONE.SOLZREED_PENINSULA]: 19.4512,
          [ZONE.CINDERSTONE_MOOR]: 21.325,
        },
      },
      [PACK_TYPE.HONEY]: {
        sell: {
          [ZONE.SOLZREED_PENINSULA]: 19.5686,
          [ZONE.CINDERSTONE_MOOR]: 21.325,
        },
      },
      [PACK_TYPE.ANTIQUITIES]: {
        recipeId: 9385,
        sell: {
          [ZONE.SOLZREED_PENINSULA]: 10.4802,
          [ZONE.CINDERSTONE_MOOR]: 9.74,
        },
      },
    },
  },
  [ZONE.CINDERSTONE_MOOR]: {
    freshness: FRESHNESS.LUXURY,
    packs: {
      [PACK_TYPE.NORMAL]: {
        recipeId: 6233,
        sell: {
          [ZONE.TWO_CROWNS]: 9.835,
          [ZONE.SOLZREED_PENINSULA]: 10.641,
        },
      },
      [PACK_TYPE.GILDA]: {
        recipeId: 6210,
        sell: {
          [ZONE.TWO_CROWNS]: 31.4654,
          [ZONE.SOLZREED_PENINSULA]: 32.5662,
        },
      },
      [PACK_TYPE.LOCAL]: {
        recipeId: 9604,
        sell: {
          [ZONE.TWO_CROWNS]: 11.8968,
          [ZONE.SOLZREED_PENINSULA]: 12.7835,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        recipeId: 7779,
        sell: {
          [ZONE.TWO_CROWNS]: 12.4377,
          [ZONE.SOLZREED_PENINSULA]: 13.3647,
        },
      },
      [PACK_TYPE.SALVE]: {
        sell: {
          [ZONE.TWO_CROWNS]: 20.3567,
          [ZONE.SOLZREED_PENINSULA]: 20.5004,
        },
      },
      [PACK_TYPE.CHEESE]: {
        sell: {
          [ZONE.TWO_CROWNS]: 20.521,
          [ZONE.SOLZREED_PENINSULA]: 20.4184,
        },
      },
      [PACK_TYPE.HONEY]: {
        sell: {
          [ZONE.TWO_CROWNS]: 20.5006,
          [ZONE.SOLZREED_PENINSULA]: 20.3774,
        },
      },
      [PACK_TYPE.BLUE_SALT]: {
        recipeId: 11043,
        sell: {
          [ZONE.TWO_CROWNS]: 86.9118,
          [ZONE.SOLZREED_PENINSULA]: 88.3478,
        },
      },
      [PACK_TYPE.SPECIAL]: {
        name: 'Cinderstone Space-Time Fragment',
        recipeId: 10319,
        sell: {
          [ZONE.TWO_CROWNS]: 26.2604,
          [ZONE.SOLZREED_PENINSULA]: 30.3862,
        },
      },
    },
  },
  [ZONE.HALCYONA]: {
    freshness: FRESHNESS.PRESERVED,
    packs: {
      [PACK_TYPE.NORMAL]: {
        recipeId: 6234,
        sell: {
          [ZONE.TWO_CROWNS]: 14.4044,
          [ZONE.SOLZREED_PENINSULA]: 16.2431,
          [ZONE.CINDERSTONE_MOOR]: 15.8731,
        },
      },
      [PACK_TYPE.GILDA]: {
        recipeId: 6211,
        sell: {
          [ZONE.TWO_CROWNS]: 34.1963,
          [ZONE.SOLZREED_PENINSULA]: 36.4618,
          [ZONE.CINDERSTONE_MOOR]: 35.6619,
        },
      },
      [PACK_TYPE.LOCAL]: {
        recipeId: 9601,
        sell: {
          [ZONE.TWO_CROWNS]: 17.4624,
          [ZONE.SOLZREED_PENINSULA]: 17.8671,
          [ZONE.CINDERSTONE_MOOR]: 17.9994,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        recipeId: 7780,
        sell: {
          [ZONE.TWO_CROWNS]: 18.2561,
          [ZONE.SOLZREED_PENINSULA]: 18.6795,
          [ZONE.CINDERSTONE_MOOR]: 18.8177,
        },
      },
      [PACK_TYPE.SALVE]: {
        sell: {
          [ZONE.TWO_CROWNS]: 24.1791,
          [ZONE.SOLZREED_PENINSULA]: 28.7421,
          [ZONE.CINDERSTONE_MOOR]: 24.1549,
        },
      },
      [PACK_TYPE.CHEESE]: {
        sell: {
          [ZONE.TWO_CROWNS]: 24.2278,
          [ZONE.SOLZREED_PENINSULA]: 28.8291,
          [ZONE.CINDERSTONE_MOOR]: 24.1307,
        },
      },
      [PACK_TYPE.HONEY]: {
        sell: {
          [ZONE.TWO_CROWNS]: 24.2523,
          [ZONE.SOLZREED_PENINSULA]: 28.8004,
          [ZONE.CINDERSTONE_MOOR]: 24.2038,
        },
      },
      [PACK_TYPE.SPECIAL]: {
        name: 'Halcyona Braided Tail Blanket',
        recipeId: 10320,
        sell: {
          [ZONE.TWO_CROWNS]: 27.7888,
          [ZONE.SOLZREED_PENINSULA]: 42.0862,
          [ZONE.CINDERSTONE_MOOR]: 29.0960,
        },
      },
    },
  },
  [ZONE.HELLSWAMP]: {
    freshness: FRESHNESS.PRESERVED,
    packs: {
      [PACK_TYPE.NORMAL]: {
        recipeId: 6232,
        sell: {
          [ZONE.TWO_CROWNS]: 16.5845,
          [ZONE.SOLZREED_PENINSULA]: 19.5429,
          [ZONE.CINDERSTONE_MOOR]: 17.7167,
        },
      },
      [PACK_TYPE.GILDA]: {
        recipeId: 6209,
        sell: {
          [ZONE.TWO_CROWNS]: 36.818,
          [ZONE.SOLZREED_PENINSULA]: 41.889,
          [ZONE.CINDERSTONE_MOOR]: 38.2832,
        },
      },
      [PACK_TYPE.LOCAL]: {
        recipeId: 9599,
        sell: {
          [ZONE.TWO_CROWNS]: 18.243,
          [ZONE.SOLZREED_PENINSULA]: 20.9581,
          [ZONE.CINDERSTONE_MOOR]: 19.4883,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        recipeId: 7778,
        sell: {
          [ZONE.TWO_CROWNS]: 19.0722,
          [ZONE.SOLZREED_PENINSULA]: 21.9107,
          [ZONE.CINDERSTONE_MOOR]: 20.3743,
        },
      },
      [PACK_TYPE.SALVE]: {
        sell: {
          [ZONE.TWO_CROWNS]: 26.0393,
          [ZONE.SOLZREED_PENINSULA]: 29.729,
          [ZONE.CINDERSTONE_MOOR]: 27.871,
        },
      },
      [PACK_TYPE.CHEESE]: {
        sell: {
          [ZONE.TWO_CROWNS]: 25.8822,
          [ZONE.SOLZREED_PENINSULA]: 29.6697,
          [ZONE.CINDERSTONE_MOOR]: 27.9832,
        },
      },
      [PACK_TYPE.HONEY]: {
        sell: {
          [ZONE.TWO_CROWNS]: 26.0393,
          [ZONE.SOLZREED_PENINSULA]: 29.6697,
          [ZONE.CINDERSTONE_MOOR]: 27.9832,
        },
      },
      [PACK_TYPE.SPECIAL]: {
        name: 'Hellswamp Adhesive',
        recipeId: 10322,
        sell: {
          [ZONE.TWO_CROWNS]: 34.7698,
          [ZONE.SOLZREED_PENINSULA]: 59.6674,
          [ZONE.CINDERSTONE_MOOR]: 41.9634,
        },
      },
    },
  },
  [ZONE.SANDDEEP]: {
    freshness: FRESHNESS.PRESERVED,
    packs: {
      [PACK_TYPE.NORMAL]: {
        recipeId: 6235,
        sell: {
          [ZONE.TWO_CROWNS]: 16.1491,
          [ZONE.SOLZREED_PENINSULA]: 17.213,
          [ZONE.CINDERSTONE_MOOR]: 18.1374,
        },
      },
      [PACK_TYPE.GILDA]: {
        recipeId: 6212,
        sell: {
          [ZONE.TWO_CROWNS]: 35.5071,
          [ZONE.SOLZREED_PENINSULA]: 37.5569,
          [ZONE.CINDERSTONE_MOOR]: 36.9727,
        },
      },
      [PACK_TYPE.LOCAL]: {
        recipeId: 9600,
        sell: {
          [ZONE.TWO_CROWNS]: 18.8427,
          [ZONE.SOLZREED_PENINSULA]: 18.9346,
          [ZONE.CINDERSTONE_MOOR]: 21.5688,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        recipeId: 7781,
        sell: {
          [ZONE.TWO_CROWNS]: 19.699,
          [ZONE.SOLZREED_PENINSULA]: 19.7952,
          [ZONE.CINDERSTONE_MOOR]: 22.549,
        },
      },
      [PACK_TYPE.SALVE]: {
        sell: {
          [ZONE.TWO_CROWNS]: 24.0821,
          [ZONE.SOLZREED_PENINSULA]: 27.9831,
          [ZONE.CINDERSTONE_MOOR]: 24.1792,
        },
      },
      [PACK_TYPE.CHEESE]: {
        sell: {
          [ZONE.TWO_CROWNS]: 24.0338,
          [ZONE.SOLZREED_PENINSULA]: 27.8432,
          [ZONE.CINDERSTONE_MOOR]: 24.2278,
        },
      },
      [PACK_TYPE.HONEY]: {
        sell: {
          [ZONE.TWO_CROWNS]: 24.0821,
          [ZONE.SOLZREED_PENINSULA]: 27.8991,
          [ZONE.CINDERSTONE_MOOR]: 24.1066,
        },
      },
      [PACK_TYPE.SPECIAL]: {
        name: 'Sanddeep Preserved Fin',
        recipeId: 10321,
        sell: {
          [ZONE.TWO_CROWNS]: 28.3361,
          [ZONE.SOLZREED_PENINSULA]: 38.4007,
          [ZONE.CINDERSTONE_MOOR]: 35.5297,
        },
      },
    },
  },
  [ZONE.KARKASSE_RIDGELANDS]: {
    freshness: FRESHNESS.COMMERCIAL,
    packs: {
      [PACK_TYPE.NORMAL]: {
        recipeId: 9344,
        sell: {
          [ZONE.TWO_CROWNS]: 17.2129,
          [ZONE.SOLZREED_PENINSULA]: 18.8689,
          [ZONE.CINDERSTONE_MOOR]: 20.1463,
        },
      },
      [PACK_TYPE.GILDA]: {
        recipeId: 9343,
        sell: {
          [ZONE.TWO_CROWNS]: 37.593,
          [ZONE.SOLZREED_PENINSULA]: 39.9505,
          [ZONE.CINDERSTONE_MOOR]: 39.0587,
        },
      },
      [PACK_TYPE.LOCAL]: {
        recipeId: 9597,
        sell: {
          [ZONE.TWO_CROWNS]: 18.9345,
          [ZONE.SOLZREED_PENINSULA]: 20.7557,
          [ZONE.CINDERSTONE_MOOR]: 21.0619,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        recipeId: 9346,
        sell: {
          [ZONE.TWO_CROWNS]: 19.7953,
          [ZONE.SOLZREED_PENINSULA]: 21.6992,
          [ZONE.CINDERSTONE_MOOR]: 26.834,
        },
      },
      [PACK_TYPE.SALVE]: {
        sell: {
          [ZONE.TWO_CROWNS]: 20.9094,
          [ZONE.SOLZREED_PENINSULA]: 30.5039,
          [ZONE.CINDERSTONE_MOOR]: 27.1626,
        },
      },
      [PACK_TYPE.CHEESE]: {
        sell: {
          [ZONE.TWO_CROWNS]: 20.9094,
          [ZONE.SOLZREED_PENINSULA]: 30.7201,
          [ZONE.CINDERSTONE_MOOR]: 27.1626,
        },
      },
      [PACK_TYPE.HONEY]: {
        sell: {
          [ZONE.TWO_CROWNS]: 26.9151,
          [ZONE.SOLZREED_PENINSULA]: 30.6891,
          [ZONE.CINDERSTONE_MOOR]: 30.689,
        },
      },
      [PACK_TYPE.SPECIAL]: {
        name: 'Karkasse Bulge',
        recipeId: 10323,
        sell: {
          [ZONE.TWO_CROWNS]: 38.5782,
          [ZONE.SOLZREED_PENINSULA]: 50.1488,
          [ZONE.CINDERSTONE_MOOR]: 45.7717,
        },
      },
    },
  },
  [ZONE.AHNIMAR]: {
    freshness: FRESHNESS.PRESERVED,
    packs: {
      [PACK_TYPE.NORMAL]: {
        recipeId: 9340,
        sell: {
          [ZONE.TWO_CROWNS]: 18.1862,
          [ZONE.SOLZREED_PENINSULA]: 20.0331,
          [ZONE.CINDERSTONE_MOOR]: 19.1607,
        },
      },
      [PACK_TYPE.GILDA]: {
        recipeId: 9339,
        sell: {
          [ZONE.TWO_CROWNS]: 38.8901,
          [ZONE.SOLZREED_PENINSULA]: 41.864,
          [ZONE.CINDERSTONE_MOOR]: 40.3555,
        },
      },
      [PACK_TYPE.LOCAL]: {
        recipeId: 9607,
        sell: {
          [ZONE.TWO_CROWNS]: 20.0048,
          [ZONE.SOLZREED_PENINSULA]: 22.0368,
          [ZONE.CINDERSTONE_MOOR]: 21.0767,
        },
      },
      [PACK_TYPE.FERTILIZER]: {
        recipeId: 9342,
        sell: {
          [ZONE.TWO_CROWNS]: 20.9139,
          [ZONE.SOLZREED_PENINSULA]: 23.0383,
          [ZONE.CINDERSTONE_MOOR]: 22.0351,
        },
      },
      [PACK_TYPE.SALVE]: {
        sell: {
          [ZONE.TWO_CROWNS]: 26.9151,
          [ZONE.SOLZREED_PENINSULA]: 34.2015,
          [ZONE.CINDERSTONE_MOOR]: 31.6827,
        },
      },
      [PACK_TYPE.CHEESE]: {
        sell: {
          [ZONE.TWO_CROWNS]: 24.1932,
          [ZONE.SOLZREED_PENINSULA]: 34.3055,
          [ZONE.CINDERSTONE_MOOR]: 30.4018,
        },
      },
      [PACK_TYPE.HONEY]: {
        sell: {
          [ZONE.TWO_CROWNS]: 26.9692,
          [ZONE.SOLZREED_PENINSULA]: 34.4779,
          [ZONE.CINDERSTONE_MOOR]: 31.5238,
        },
      },
    },
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
  [ZONE.NUIMARI]: {
    freshness: FRESHNESS.DISGUISED,
    packs: {
      [PACK_TYPE.DISGUISED]: {
        name: 'Disguised Auroria Mineral Water',
        item: ITEM.ONYX_ARCHEUM_ESSENCE,
        materials: [{ item: 49245, quantity: 5 }, { item: 49244, quantity: 5 }, { item: 49243, quantity: 5 },
          { item: ITEM.TERRITORY_COIN, quantity: 3 }],
        sell: {
          [ZONE.FREEDICH_ISLAND]: 36,
        },
      },
    },
  },
  [ZONE.HEEDMAR]: {
    freshness: FRESHNESS.DISGUISED,
    packs: {
      [PACK_TYPE.DISGUISED]: {
        name: 'Disguised Auroria Mineral Water',
        item: ITEM.ONYX_ARCHEUM_ESSENCE,
        materials: [{ item: 49245, quantity: 5 }, { item: 49244, quantity: 5 }, { item: 49243, quantity: 5 },
          { item: ITEM.TERRITORY_COIN, quantity: 3 }],
        sell: {
          [ZONE.FREEDICH_ISLAND]: 36,
        },
      },
    },
  },
  [ZONE.MARCALA]: {
    freshness: FRESHNESS.DISGUISED,
    packs: {
      [PACK_TYPE.DISGUISED]: {
        name: 'Disguised Flaming Log Bundle',
        item: ITEM.ONYX_ARCHEUM_ESSENCE,
        materials: [{ item: 49245, quantity: 5 }, { item: 49244, quantity: 5 }, { item: 49243, quantity: 5 },
          { item: ITEM.TERRITORY_COIN, quantity: 3 }],
        sell: {
          [ZONE.FREEDICH_ISLAND]: 37,
        },
      },
    },
  },
  [ZONE.CALMLANDS]: {
    freshness: FRESHNESS.DISGUISED,
    packs: {
      [PACK_TYPE.DISGUISED]: {
        name: 'Disguised Flaming Log Bundle',
        item: ITEM.ONYX_ARCHEUM_ESSENCE,
        materials: [{ item: 49245, quantity: 5 }, { item: 49244, quantity: 5 }, { item: 49243, quantity: 5 },
          { item: ITEM.TERRITORY_COIN, quantity: 3 }],
        sell: {
          [ZONE.FREEDICH_ISLAND]: 38,
        },
      },
    },
  },
});
