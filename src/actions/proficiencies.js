import {
  PROFICIENCY_RANK,
  PROFICIENCY_UPDATE,
} from 'constants/proficiencies';

export const triggerLocalStorageUpdate = [
  PROFICIENCY_UPDATE,
];

export const updateProficiency = (vocation, proficiency) => (dispatch) => {
  // only 0 - 230,000
  proficiency = Math.max(0, proficiency);
  proficiency = Math.min(230000, proficiency);

  dispatch({ type: PROFICIENCY_UPDATE, [vocation]: proficiency });
};

export const calculateLabor = (baseLabor, vocation) => (dispatch, getState) => {
  if (!baseLabor) return 0;

  const proficiency = getState().proficiencies[vocation] || 0;
  const rank = PROFICIENCY_RANK.find(r => r.maxValue >= proficiency);
  const profIndex = PROFICIENCY_RANK.indexOf(rank);

  let ratio = rank.cost;
  if (rank.maxValue > proficiency && profIndex > 0) {
    const prevRank = PROFICIENCY_RANK[profIndex - 1];
    ratio = prevRank.cost;
  }

  return Math.round(baseLabor * ratio);
};
