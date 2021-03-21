import {
  CONTINENT,
  ZONE,
} from 'constants/map';
import { PACK_TABLE } from 'constants/tradepacks';

export const mapContinentToTable = (continent) => ({
  'Nuia': PACK_TABLE.NUIA,
  'Haranya': PACK_TABLE.HARANYA,
  'Cargo': PACK_TABLE.CARGO,
  'Auroria': PACK_TABLE.AURORIA,
})[continent || 'Nuia'];

export const mapContinentToCargo = (continentId) => {
  switch (continentId) {
    case CONTINENT.HARANYA:
      return ZONE.SOLIS_HEADLANDS;
    case CONTINENT.NUIA:
      return ZONE.TWO_CROWNS;
    case CONTINENT.AURORIA:
      return ZONE.HEEDMAR;
    default:
      return null;
  }
};

export const mapCargoToContinent = (originZoneId) => originZoneId === ZONE.SOLIS_HEADLANDS ? CONTINENT.HARANYA
  : CONTINENT.NUIA;

export const getZonePrefix = (zone, zoneId) => {
  if ([ZONE.ARCUM_IRIS, ZONE.SILENT_FOREST, ZONE.WHITE_ARDEN, ZONE.TWO_CROWNS, ZONE.GOLDEN_RUINS].includes(zoneId)) {
    return zone;
  }
  return zone.split(' ')[0];
};
