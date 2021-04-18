import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { ITEM } from 'constants/items';
import { toSeconds } from 'utils/time';

export const ADD_CROP = 'ADD_TREE';
export const DELETE_CROP = 'DELETE_TREE';
export const RESTART_CROP = 'RESTART_CROP';
export const MARK_CROP = 'MARK_CROP';

export const MATURES_REGEX = /Matures in(?: approx\.)?(?: \|cORANGE\|)?(?: ?(\d+) ?d)?(?: ?(\d+) ?h)?(?: ?(\d+) ?m)?(?: ?(\d+) ?s)?/;
export const HARVEST_REGEX = /(Harvest|Milk|Shear|Pluck|Collect eggs) every(?: \|cORANGE\|)?(?: ?(\d+) ?d)?(?: ?(\d+) ?h)?(?: ?(\d+) ?m)?(?: ?(\d+) ?s)?/;
export const CLIMATE_REGEX = /Climate: (\w+)/;

export const CROP_GROUP = Object.freeze([
  'Seeds',
  'Saplings',
  'Livestock',
  'Seed Bundles',
  'Woodlots',
  'Pens',
  'Buildings',
]);

export const TIMER_TYPE = Object.freeze({
  MATURES: 'matures',
  HARVEST: 'harvest',
});

export const CROP_CUSTOM = Object.freeze({
  [ITEM.MINERS_FARMHOUSE]: {
    types: [TIMER_TYPE.HARVEST],
    [TIMER_TYPE.HARVEST]: {
      time: toSeconds(0, 10, 0, 0),
      phase1: 0.1,
      phase1Name: 'Rank 1',
      phase2: 0.4,
      phase2Name: 'Rank 2',
      completeName: 'Rank 3',
      restart: true,
      showPhase: true,
      mark: {
        on: StarIcon,
        off: StarBorderIcon,
        name: 'Jackpot',
      },
    },
  },
});

export const TIME_FORMAT = 'MMM D h:mm:ss A';
