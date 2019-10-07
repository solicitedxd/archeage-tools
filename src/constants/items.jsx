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
import AcidGobbetIcon from 'images/item/acid_gobbet.png';
import ArmorScrapIcon from 'images/item/armor_scrap.png';
import HiramInfusionIcon from 'images/item/hiram_infusion.png';
import HiramScrollIcon from 'images/item/hiram_awakening_scroll.png';
import RedDragonPouchIcon from 'images/item/red_dragon_pouch.png';
import GoldCrateIcon from 'images/item/gold_crate.png';
import OnyxEssenceIcon from 'images/item/onyx_essence.png';
import RevenantSoulstoneIcon from 'images/item/revenant_soulstone.png';

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
  HONORABLE_VICTORY_4: {
    name: 'Honorable Victory Rank 4',
    icon: HonorableVictoryIcon,
    type: 'Potion',
    description: <span><span className="tt-use">Use:</span><span
      className="tt-green">Gain 1,500 Honor Points.</span></span>,
    quality: QUALITY.DIVINE,
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
    description: <span>Can be obtained on <span className="tt-blue">Aegis Island</span>. Used to make <span
      className="tt-orange">Acid Pouches</span>, which are required to craft an Ipnysh Blessing.<br /><span
      className="tt-use">Use:</span><span className="tt-green">Spend 500 Labor to combine 50 Acid Bubbles into an Acid Poison Pouch.<br />Auto-use: shift + right-click</span></span>,
    quality: QUALITY.BASIC,
    price: 100,
    bindsOnPickup: true,
  },
  CURSED_ARMOR_SCRAP: {
    name: 'Cursed Armor Scrap',
    icon: ArmorScrapIcon,
    type: 'Material',
    description: <span>Can be obtained on <span className="tt-blue">Whalesong Harbor</span>.<br />Used to make <span
      className="tt-orange">Cursed Armor</span>, which is required to craft an Ipnysh Blessing.<br /><span
      className="tt-use">Use:</span><span className="tt-green">Spend 500 Labor to combine 50 Cursed Armor Scraps into a Complete Cursed Armor.<br />Auto-use: shift + right-click</span></span>,
    quality: QUALITY.BASIC,
    price: 100,
    bindsOnPickup: true,
  },
  UNIDENTIFIED_HIRAM_INFUSION: {
    name: 'Unidentified Hiram Infusion',
    icon: HiramInfusionIcon,
    unidentified: true,
    type: 'Synthesis Materials',
    description: <span>Used as a synthesis material to enhance <span
      className="tt-yellow">Hiram Guardian Equipment</span>.<br /><br />Found by killing the <span
      className="tt-yellow">Abyssal Legion</span> in <span
      className="tt-yellow">Reedwind, Sungold Fields, and Exeloch.</span><br /><br /><span
      className="tt-use">Use:</span><span
      className="tt-green">Spend up to 20 Labor to identify the Hiram Infusion.<br />Auto-use: shift+right-click</span></span>,
    quality: QUALITY.BASIC,
    price: 100,
    bindsOnPickup: true,
  },
  MYSTERIOUS_HIRAM_INFUSION: {
    name: 'Mysterious Hiram Infusion',
    icon: HiramInfusionIcon,
    unidentified: true,
    type: 'Synthesis Materials',
    description: <span>An mysteriously powerful infusion.<br /><br />Open to reveal the content.<br />This item grants better infusions than Unidentified Infusion.<br /><br /><span
      className="tt-use">Use:</span><span className="tt-green">Spend up to 25 Labor to identify the Mysterious Hiram Infusion.<br />Auto-use: shift+right-click</span></span>,
    quality: QUALITY.GRAND,
    price: 150,
    bindsOnPickup: true,
  },
  RADIANT_HIRAM_INFUSION: {
    name: 'Radiant Hiram Infusion',
    icon: HiramInfusionIcon,
    unidentified: true,
    type: 'Synthesis Materials',
    description: <span>An mysteriously powerful infusion.<br />The infusions granted are of a higher rarity, than the infusionen granted by Mysterious Hiram Infusions.<br />Open to reveal the content.<br /><br /><span
      className="tt-use">Use:</span><span className="tt-green">Spend up to 40 Labor to identify the Luminous Hiram Infusion.<br />Auto-use: shift+right-click</span></span>,
    quality: QUALITY.RARE,
    price: 200,
    bindsOnPickup: true,
  },
  AWAKENING_SCROLL: {
    name: 'Hiram Awakening Scroll',
    icon: HiramScrollIcon,
    type: 'Awakening Scroll',
    description:
      <span>Used to awaken Hiram Guardian equipment, unlocking higher item grades and synthesis effects.<br /><br />Can only be used on <span
        className="tt-yellow">Hiram Guardian Equipment</span> of <span className="tt-yellow">Celestial</span> grade or higher.<br />Successful awakening can cause equipment with tempering points above <span
        className="tt-yellow">+20</span> to loose up to <span className="tt-yellow">-2</span> points, but won't drop the item below +20.<br /><br />Found by killing the <span
        className="tt-yellow">Abyssal Legion</span> in <span
        className="tt-yellow">Reedwind, Sungold Fields, and Exeloch.</span><br /><br /><span
        className="tt-use">Use:</span><span className="tt-green">Use <span className="tt-orange">10</span> Hiram Awakening Scrolls and <span
        className="tt-orange">300</span> Labor to awaken a piece of Hiram Guardian Equipment.</span></span>,
    quality: QUALITY.RARE,
    price: 20,
    bindsOnPickup: true,
  },
  RADIANT_AWAKENING_SCROLL: {
    name: 'Radiant Hiram Awakening Scroll',
    icon: HiramScrollIcon,
    type: 'Awakening Scroll',
    description:
      <span>Used to awaken Radiant Hiram Guardian equipment, unlocking higher item grades and synthesis effects.<br /><br />Can only be used on <span
        className="tt-yellow">Radiant Hiram Equipment</span> of <span className="tt-yellow">Divine</span> grade or higher.<br />Successful awakening can cause equipment with tempering points above<span
        className="tt-orange">+20</span> to lose up to<span className="tt-orange">-2</span> points, but won't drop the item below +20.<br /><br />Found by killing the <span
        className="tt-yellow">Abyssal Legion</span> in the <span
        className="tt-yellow">Western Hiram Mountains.</span><br /><br /><span
        className="tt-use">Use:</span><span className="tt-green">Use <span className="tt-orange">25</span> Hiram Awakening Scroll and <span
        className="tt-orange">300</span> Labor to awaken a piece of Radiant Hiram Guardian Equipment.</span></span>,
    quality: QUALITY.HEROIC,
    price: 30,
    bindsOnPickup: true,
  },
  BRILLIANT_AWAKENING_SCROLL: {
    name: 'Brilliant Hiram Awakening Scroll',
    icon: HiramScrollIcon,
    type: 'Awakening Scroll',
    description:
      <span>Used to awaken Brilliant Hiram Guardian Equipment, unlocking higher item grades and synthesis effects.<br /><br />Can only be used on <span
        className="tt-yellow">Brilliant Hiram Guardian Equipment</span> of <span className="tt-yellow">Epic</span> grade or higher.<br />Successful awakening can cause equipment with tempering points above <span
        className="tt-orange">+20</span> to lose up to <span className="tt-orange">-2</span> points, but won't drop the item below +20.<br /><br />Can be obtained from dailies quests available in <span
        className="tt-yellow">Eastern Hiram Mountains</span>.<br /><br /><span
        className="tt-use">Use:</span><span className="tt-green">Use <span className="tt-orange">50</span> Brilliant Hiram Awakening Scrolls and <span
        className="tt-orange">300</span> Labor to awaken a piece of Brilliant Hiram Guardian Equipment.</span></span>,
    quality: QUALITY.CELESTIAL,
    price: 40,
    bindsOnPickup: true,
  },
  RED_DRAGON_POUCH: {
    name: 'Red Dragon Pouch',
    icon: RedDragonPouchIcon,
    type: 'Unidentified',
    description: <span>A pouch found in the Red Dragon's stomach.<br /><br /><span className="tt-orange">[Guaranteed Drops]</span><br />- 2000 Honor Points<br />- Locked Gold Crate x2<br />- Red Dragon Spinal Ridge Shard x1-4<br /><br /><span
      className="tt-orange">[Possible Bonus Drops]</span><br />- Red Dragon Spinal Ridge x1<br />- Evenglow Lunagem: Impact x1<br />- Enraged Red Dragon Weapon<br /><br /><span
      className="tt-use">Use:</span><span className="tt-green">Spend 10 Labor to see what's inside.<br />Auto-use: shift+right-click</span></span>,
    quality: QUALITY.UNIQUE,
    bindsOnPickup: true,
  },
  GOLD_CRATE: {
    name: 'Locked Gold Crate',
    icon: GoldCrateIcon,
    type: 'Unidentified',
    description: <span>Valuable crates of treasure dropped by certain World Bosses, as well as Shadow Invasion bosses and sub-bosses.<br /><br />Requires a <span
      className="tt-gold">Gold Key</span> to open. Higher tiers of rewards are unlocked as additional <span
      className="tt-gold">Gold Crates</span> are opened, until the maximum tier is reached.<br /><br /><span
      className="tt-use"> Use:</span><span className="tt-green">Open the box to check its contents.</span></span>,
    quality: QUALITY.RARE,
    price: 400,
    bindsOnPickup: true,
  },
  ONYX_ARCHEUM_ESSENCE: {
    name: 'Onyx Archeum Essence',
    icon: OnyxEssenceIcon,
    type: 'Archeum',
    description: <span>Imbued with mysterious garden lights, as a core source of magic, it is used in crafting consumables and machines.<br /><br />Can be acquired by delivering Cargo to <span
      className="tt-yellow">Cargo Exchangers</span>, or Delphinad Ghost Ship Stone Slabs to the <span
      className="tt-yellow">Shadow Merchant</span> on Freedich Island.</span>,
    quality: QUALITY.BASIC,
    price: 9500,
  },
  REVENANT_SOULSTONE: {
    name: 'Revenant Soulstone',
    icon: RevenantSoulstoneIcon,
    type: 'Other',
    description: <span>A soulstone that contains the residual energy of a vanquished revenant.<br /><br />Acquire from defeating Aust Followers; can be used to create weapons and armor at the <span
      className="tt-yellow">Soulforged Anvil</span> in <span className="tt-blue">Diamond Shores</span>.</span>,
    quality: QUALITY.BASIC,
    price: 50,
    bindsOnPickup: true,
  },
});
