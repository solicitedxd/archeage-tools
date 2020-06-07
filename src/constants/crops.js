export const ADD_CROP = 'ADD_TREE';
export const DELETE_CROP = 'DELETE_TREE';

export const MATURES_REGEX = /Matures in(?: approx\.)?(?: \|cORANGE\|)?(?: ?(\d+) d)?(?: ?(\d+) h)?(?: ?(\d+) m)?(?: ?(\d+) s)?/;
export const HARVEST_REGEX = /Harvest every(?: \|cORANGE\|)?(?: ?(\d+) d)?(?: ?(\d+) h)?(?: ?(\d+) m)?(?: ?(\d+) s)?/;
export const CLIMATE_REGEX = /Climate: (\w+)/;

export const CROP_GROUP = Object.freeze([
  'Seeds',
  'Saplings',
  'Seed Bundles',
  'Woodlots',
]);

export const TIMER_TYPE = Object.freeze({
  MATURES: 'matures',
  HARVEST: 'harvest',
});

export const TIME_FORMAT = 'MMM D h:mm:ss A';
