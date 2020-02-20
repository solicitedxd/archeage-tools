import { FACTION } from 'constants/map';

export default {
  quests: {},
  continents: [],
  faction: FACTION.NUIA,
  rewards: [],
  types: [],
  hideComplete: false,
  hideMode: false,
  hiddenQuests: {},
};

export const override = ({
  hideMode: false,
});
