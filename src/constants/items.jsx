import React from 'react';
import { QUALITY } from 'constants/dailies';
import GildaStarIcon from 'images/item/gilda_star.png';
import ShatigonsSandIcon from 'images/item/shatigons_sand.png';
import HonorableVictoryIcon from 'images/item/honorable_victory.png';
import LaborRechargeIcon from 'images/item/labor_recharge.png';
import SupplyKitIcon from 'images/item/supply_box.png';
import BlueSaltBondIcon from 'images/item/blue_salt_bond.png';
import SprinklerIcon from 'images/item/sprinkler.png';
import MiningDrillIcon from 'images/item/mining_drill.png';
import FeatherGreenIcon from 'images/item/feather_green.png';
import AcidGobbetIcon from 'images/item/acid_gobbet.png'
import ArmorScrapIcon from 'images/item/armor_scrap.png'

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
  LABOR_RECHARGE: {
    name: 'Bound Labor Recharge',
    icon: LaborRechargeIcon,
    type: 'Other',
    description: <span>Restores <span className="tt-bgreen">Server Labor</span> over multiple uses, but the amount gradually decreases.<br />Hover over the Labor bar on the bottom-left of the screen to see details.<br /><br /><span
      className="tt-use">Use:</span><span
      className="tt-bgreen">Restores <span className="tt-orange">+1000</span> Server Labor.</span></span>,
    quality: QUALITY.GRAND,
    bindsOnPickup: true,
  },
  IMPROVED_INFUSION_KIT: {
    name: 'Improved Infusion Supply Kit',
    icon: SupplyKitIcon,
    type: 'Crate',
    description: <span>An improved supply kit that can be opened to receive one of the following items:<br /><span
      className="tt-blue">- Mysterious Hiram Infusion x1<br />- Mysterious Abyssal Enhancer x3</span><br /><br /><span
      className="tt-use">Use:</span><span className="tt-green">Open the Improved Infusion Supply Kit.</span></span>,
    quality: QUALITY.GRAND,
    bindsOnPickup: true,
    price: 15,
  },
  BLUE_SALT_BOND: {
    name: 'Blue Salt Bond',
    icon: BlueSaltBondIcon,
    type: 'Quest Item',
    description: <span>A token issued by the Blue Salt Brotherhood. Can be used to help rank up your Community Center, or to support your faction activities.</span>,
    quality: QUALITY.GRAND,
    bindsOnPickup: true,
  },
  RAINBOW_SPRINKLER: {
    name: 'Rainbow Sprinkler',
    icon: SprinklerIcon,
    type: 'Contraption',
    description: <span>Places a <span className="tt-orange">Rainbow Sprinkler</span> that allows you to water seeds and seed bundles in a large area in a single action.<br />It takes 10 minutes to refill the water after each use. Can be used up to 5 times.<br /><br /><span
      className="tt-use">Use:</span><span className="tt-green">Use with right-click.<br />Can be positioned on the ground with left-click.<br /><br />Costs 5 Labor if not placed on personal land.</span></span>,
    quality: QUALITY.BASIC,
    price: 100,
  },
  SHARPWIND_MINING_DRILL: {
    name: 'Sharpwind Mining Drill',
    icon: MiningDrillIcon,
    type: 'Contraption',
    description: <span>Installs a <span className="tt-orange">Sharpwind Mining Drill</span>.<br />If placed outside protected land, it will eventually become public property.<br /><br />Vocation: Mining<br />Mines for 12 h before disappearing<br /><br />Can mine for <span
      className="tt-orange">stone, ore, and gems</span>.<br /><br /><span className="tt-use">Use:</span><span
      className="tt-green">Use with right-click.<br />Can be positioned on the ground with left-click.<br /><br />Costs 5 Labor if not placed on personal land.</span></span>,
    quality: QUALITY.BASIC,
    price: 100,
  },
  STAR_WINGS: {
    name: 'Star Wings',
    icon: FeatherGreenIcon,
    type: 'Contraption',
    description:
      <span>Enhances certain glider effects.<br /><br />Can't use if you are in a Lv6+ guild.<br /><br /><span
        className="tt-use">Use:</span><span className="tt-green">Use the Glider Nitro or Somersault skills to briefly increase gliding speed.<br />Creates a protection ward when closing that reduces fall damage for 6 seconds.</span></span>,
    quality: QUALITY.BASIC,
    price: 100,
  },
  ACID_GOBBET: {
    name: 'Acid Gobbet',
    icon: AcidGobbetIcon,
    type: 'Material',
    description: <span>Can be obtained on <span className="tt-blue">Aegis Island</span>. Used to make <span className="tt-orange">Acid Pouches</span>, which are required to craft an Ipnysh Blessing.<br/><span className="tt-use">Use:</span><span className="tt-green">Spend 500 Labor to combine 50 Acid Bubbles into an Acid Poison Pouch.<br />Auto-use: shift + right-click</span></span>,
    quality: QUALITY.BASIC,
    price: 100,
    bindsOnPickup: true,
  },
  CURSED_ARMOR_SCRAP: {
    name: 'Cursed Armor Scrap',
    icon: ArmorScrapIcon,
    type: 'Material',
    description: <span>Can be obtained on <span className="tt-blue">Whalesong Harbor</span>.<br />Used to make <span className="tt-orange">Cursed Armor</span>, which is required to craft an Ipnysh Blessing.<br/><span className="tt-use">Use:</span><span className="tt-green">Spend 500 Labor to combine 50 Cursed Armor Scraps into a Complete Cursed Armor.<br />Auto-use: shift + right-click</span></span>,
    quality: QUALITY.BASIC,
    price: 100,
    bindsOnPickup: true,
  },
});
