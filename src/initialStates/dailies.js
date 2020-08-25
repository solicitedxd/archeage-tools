const dailies = {
  quests: {},
  faction: 1,
  region: 'NA',
  rewards: [],
  hideComplete: false,
  hiddenQuests: {},
  hiddenCategories: {},
  showHidden: false,
  collapsedCategories: {},
  lastVisit: null,
};

export default dailies;

const savedDailies = JSON.parse(localStorage.getItem('dailies')) || dailies;

export const override = {
  rewards: (savedDailies.rewards.length > 0 && typeof savedDailies.rewards[0] !== 'number') ? [] : savedDailies.rewards,
};
