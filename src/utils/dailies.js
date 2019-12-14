import { CURRENCY } from 'constants/items';
import { FACTION } from 'constants/map';
import ITEM from 'data/items';

export const sortReward = (a, b) => a.type > b.type ? 1 : -1;

export const sortItems = (a, b) => {
  if (a.type === CURRENCY.GILDA && !a.item) {
    a.item = ITEM.GILDA_STAR;
  }
  if (b.type === CURRENCY.GILDA && !b.item) {
    b.item = ITEM.GILDA_STAR;
  }
  return a.item.name > b.item.name ? 1 : -1;
};

export const splitRewards = (rewards) => {
  const rewardItems = rewards.filter((reward) => (reward.type === CURRENCY.ITEM || reward.type === CURRENCY.GILDA) && !reward.choice).sort(sortReward);
  const rewardItemChoices = rewards.filter((reward) => (reward.type === CURRENCY.ITEM || reward.type === CURRENCY.GILDA) && reward.choice).sort(sortReward);
  const rewardXps = rewards.filter((reward) => reward.type === CURRENCY.GUILD_XP || reward.type === CURRENCY.FAMILY_XP).sort(sortReward);
  const rewardCurrencies = rewards.filter((reward) => reward.type === CURRENCY.COIN || reward.type === CURRENCY.HONOR || reward.type === CURRENCY.VOCATION || reward.type === CURRENCY.PRESTIGE || reward.type === CURRENCY.LEADERSHIP).sort(sortReward);

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
