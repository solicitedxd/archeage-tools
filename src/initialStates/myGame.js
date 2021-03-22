import { QUEST_REGIONS } from 'constants/dailies';
import calendar from 'initialStates/calendar';
import dailies from 'initialStates/dailies';
import proficiencies from 'initialStates/proficiencies';
import { getItem } from 'utils/localStorage';

export default {
  characters: [],
  residence: [],
  castles: [],
  proficiencies: { 0: getItem('proficiencies', proficiencies) },
  server: null,
  region: getItem('calendar', calendar).region,
  publisher: getItem('dailies', dailies).region || Object.keys(QUEST_REGIONS)[0],
  faction: getItem('dailies', dailies).faction,
};
