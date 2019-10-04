import React from 'react';
import { QUALITY } from 'constants/dailies';
import GildaStarIcon from 'images/item/gilda_star.png';
import ShatigonsSandIcon from 'images/item/shatigons_sand.png';
import HonorableVictoryIcon from 'images/item/honorable_victory.png';

export default Object.freeze({
  GILDA_STAR: {
    name: 'Gilda Star',
    icon: GildaStarIcon,
    type: 'Coin',
    description: <span>An ancient coin made of pure gold and minted in Auroria centuries ago. They are the rarest and most valuable coins still in circulation, and can purchase the most important quality goods, such as the <span
      className="tt-orange">houses</span> and <span className="tt-orange">workbench designs</span> sold on <span
      className="tt-orange">Mirage Isle</span>.<br /><br />Can be obtained from <span className="tt-yellow">Daily Contracts</span>, other quests, and special events.</span>,
    quality: QUALITY.BASIC,
    bindsOnPickup: true,
  },
  SHATIGONS_SAND: {
    name: 'Shatigon\'s Sand',
    icon: ShatigonsSandIcon,
    type: 'Talisman',
    description: <span> Sand extracted from Shatigon's Sandglass.<br /><br />Turns back time and restores broken machines in the Hereafter (ships, vehicles, and equipment).<br /><br />Takes 5 minutes to repair ships and vehicles, and immediately repairs equipment.<br /><br /><span
      className="tt-use">Use:</span><span className="tt-green">Time-Turning Sand:<br />The flow of time around the sand is strange.</span></span>,
    quality: QUALITY.BASIC,
    price: 100,
  },
  HONORABLE_VICTORY_14: {
    name: 'Honorable Victory Rank 14',
    icon: HonorableVictoryIcon,
    type: 'Potion',
    description: <span><span className="tt-use">Use:</span><span
      className="tt-green">Gain 100 Honor Points.</span></span>,
    quality: QUALITY.GRAND,
    bindsOnPickup: true,
  },
  HONORABLE_VICTORY_5: {
    name: 'Honorable Victory Rank 5',
    icon: HonorableVictoryIcon,
    type: 'Potion',
    description: <span><span className="tt-use">Use:</span><span
      className="tt-green">Gain 1,000 Honor Points.</span></span>,
    quality: QUALITY.CELESTIAL,
    bindsOnPickup: true,
  },
});
