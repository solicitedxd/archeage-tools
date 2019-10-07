import {
  FACTION,
  REWARD,
} from 'constants/dailies';

export const getQuestId = (quest) => `${quest.name}${quest.idx && `-${quest.idx}` || ''}`;

export const sortReward = (a, b) => a.type > b.type;

export const splitRewards = (rewards) => {
  const rewardItems = rewards.filter((reward) => (reward.type === REWARD.ITEM || reward.type === REWARD.GILDA) && !reward.choice).sort(sortReward);
  const rewardItemChoices = rewards.filter((reward) => (reward.type === REWARD.ITEM || reward.type === REWARD.GILDA) && reward.choice).sort(sortReward);
  const rewardXps = rewards.filter((reward) => reward.type === REWARD.GUILD_XP || reward.type === REWARD.FAMILY_XP).sort(sortReward);
  const rewardCurrencies = rewards.filter((reward) => reward.type === REWARD.COIN || reward.type === REWARD.HONOR || reward.type === REWARD.VOCATION || reward.type === REWARD.PRESTIGE || reward.type === REWARD.LEADERSHIP).sort(sortReward);

  return { rewardItems, rewardItemChoices, rewardXps, rewardCurrencies };
};

export const getZones = (zoneObj, faction) => {
  let zones = [];
  if (Array.isArray(zoneObj)) {
    zones = zoneObj;
  } else if (zoneObj) {
    if (zoneObj.hasOwnProperty('all')) {
      zones = zoneObj.all;
    }
    if (zoneObj.hasOwnProperty('nuia') && faction === FACTION.NUIA) {
      zones = zones.concat(zoneObj.nuia);
    }
    if (zoneObj.hasOwnProperty('haranya') && faction === FACTION.HARANYA) {
      zones = zones.concat(zoneObj.haranya);
    }
  }

  return zones;
};
