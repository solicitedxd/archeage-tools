import { ZONE } from 'constants/map';

export const ADD_TREE = 'ADD_TREE';
export const DELETE_TREE = 'DELETE_TREE';

export const CLIMATE = Object.freeze({
  ARID: 'Arid',
  SUBARCTIC: 'Subarctic',
  TEMPERATE: 'Temperate',
  TROPICAL: 'Tropical',
});

export const ZONE_CLIMATES = Object.freeze([
  { zone: 'Haranya', category: true },
  { zone: ZONE.ARCUM_IRIS, climate: [CLIMATE.ARID] },
  { zone: ZONE.FALCORTH_PLAINS, climate: [CLIMATE.TEMPERATE] },
  { zone: ZONE.SUNBITE_WILDS, climate: [CLIMATE.ARID] },
  { zone: ZONE.TIGERSPINE_MOUNTAINS, climate: [CLIMATE.TEMPERATE] },
  { zone: ZONE.MAHADEVI, climate: [CLIMATE.TROPICAL] },
  { zone: ZONE.SOLIS_HEADLANDS, climate: [CLIMATE.ARID] },
  { zone: ZONE.VILLANELLE, climate: [CLIMATE.TEMPERATE] },
  { zone: ZONE.SILENT_FOREST, climate: [CLIMATE.TEMPERATE] },
  { zone: ZONE.YNYSTERE, climate: [CLIMATE.TEMPERATE] },
  { zone: ZONE.ROOKBORNE_BASIN, climate: [CLIMATE.TEMPERATE] },
  { zone: ZONE.WINDSCOUR_SAVANNAH, climate: [CLIMATE.ARID] },
  { zone: ZONE.PERINOOR_RUINS, climate: [CLIMATE.TROPICAL] },
  { zone: ZONE.HASLA, climate: [CLIMATE.TEMPERATE] },
  { zone: ZONE.ROKHALA_MOUNTAINS, climate: [CLIMATE.TEMPERATE] },

  { zone: 'Nuia', category: true },
  { zone: ZONE.SOLZREED_PENINSULA, climate: [CLIMATE.TEMPERATE] },
  { zone: ZONE.GWEONID_FOREST, climate: [CLIMATE.TEMPERATE] },
  { zone: ZONE.AIRAIN_ROCK, climate: [CLIMATE.SUBARCTIC] },
  { zone: ZONE.LILYUT_HILLS, climate: [CLIMATE.TEMPERATE] },
  { zone: ZONE.AUBRE_CRADLE, climate: [CLIMATE.SUBARCTIC] },
  { zone: ZONE.DEWSTONE_PLAINS, climate: [CLIMATE.TEMPERATE] },
  { zone: ZONE.WHITE_ARDEN, climate: [CLIMATE.TEMPERATE] },
  { zone: ZONE.MARIANOPLE, climate: [CLIMATE.TEMPERATE] },
  { zone: ZONE.TWO_CROWNS, climate: [CLIMATE.TEMPERATE] },
  { zone: ZONE.CINDERSTONE_MOOR, climate: [CLIMATE.CINDERSTONE_MOOR] },
  { zone: ZONE.HALCYONA, climate: [CLIMATE.TEMPERATE] },
  { zone: ZONE.HELLSWAMP, climate: [CLIMATE.TROPICAL] },
  { zone: ZONE.SANDDEEP, climate: [CLIMATE.TROPICAL] },
  { zone: ZONE.KARKASSE_RIDGELANDS, climate: [CLIMATE.SUBARCTIC] },
  { zone: ZONE.AHNIMAR, climate: [CLIMATE.TEMPERATE] },

  { zone: 'Auroria', category: true },
  { zone: ZONE.DIAMOND_SHORES, climate: [CLIMATE.ARID, CLIMATE.TROPICAL, CLIMATE.SUBARCTIC] },
  { zone: ZONE.GOLDEN_RUINS, climate: [CLIMATE.TEMPERATE, CLIMATE.ARID] },
  { zone: ZONE.WHALESONG_HARBOR, climate: [CLIMATE.TEMPERATE, CLIMATE.SUBARCTIC] },
  { zone: ZONE.REEDWIND, climate: [CLIMATE.TEMPERATE, CLIMATE.TROPICAL] },
  { zone: ZONE.WESTERN_HIRAM_MOUNTAINS, climate: [CLIMATE.TROPICAL, CLIMATE.SUBARCTIC, CLIMATE.ARID] },
  { zone: ZONE.EASTERN_HIRAM_MOUNTAINS, climate: [CLIMATE.TEMPERATE, CLIMATE.SUBARCTIC] },
  { zone: ZONE.SUNGOLD_FIELDS, climate: [CLIMATE.TEMPERATE, CLIMATE.TROPICAL] },
  { zone: ZONE.CALMLANDS, climate: [CLIMATE.TEMPERATE, CLIMATE.ARID] },
  { zone: ZONE.MARCALA, climate: [CLIMATE.TEMPERATE, CLIMATE.ARID] },
  { zone: ZONE.HEEDMAR, climate: [CLIMATE.TEMPERATE, CLIMATE.SUBARCTIC] },
  { zone: ZONE.NUIMARI, climate: [CLIMATE.TEMPERATE, CLIMATE.SUBARCTIC] },
  { zone: ZONE.EXELOCH, climate: [CLIMATE.TEMPERATE, CLIMATE.TROPICAL] },
  { zone: ZONE.AEGIS_ISLAND, climate: [CLIMATE.TEMPERATE, CLIMATE.SUBARCTIC] },

  { zone: 'Arcadian Sea', category: true },
  { zone: ZONE.FREEDICH_ISLAND, climate: [CLIMATE.TEMPERATE] },
  { zone: ZONE.GROWLGATE_ISLE, climate: [CLIMATE.TEMPERATE] },
]);
