import { QUALITY } from 'constants/items';
import React from 'react';

const Icon = {};

const Green = ({ children }) => <span className="tt-green">{children}</span>;
const Blue = ({ children }) => <span className="tt-blue">{children}</span>;
const Yellow = ({ children }) => <span className="tt-yellow">{children}</span>;
const Orange = ({ children }) => <span className="tt-orange">{children}</span>;
const Use = ({ children, title = 'Use:' }) => (
  <>
    <span className="tt-use">{title}</span>
    {children && <Green>{children}</Green>}
  </>
);

const ITEM = Object.freeze({
  GILDA_STAR: 23633,
  KYRIOS_BADGE: 37509,
  SHATIGONS_SAND: 35898,
  HONORABLE_VICTORY_14: 43779,
  HONORABLE_VICTORY_5: 32492,
  HONORABLE_VICTORY_4: 32491,
  HONORABLE_VOCATION_4: 42852,
  BOUND_LABOR_RECHARGER: 46250,
  IMPROVED_INFUSION_SUPPLY_KIT: 47218,
  BLUE_SALT_BOND: 41488,
  RAINBOW_SPRINKLER: 35721,
  SHARPWIND_MINING_DRILL: 35303,
  STAR_WINGS: 685,
  ACID_GOBBET: 43129,
  CURSED_ARMOR_SCRAP: 43128,
  UNIDENTIFIED_HIRAM_INFUSION: 45731,
  MYSTERIOUS_HIRAM_INFUSION: 46023,
  RADIANT_HIRAM_INFUSION: 47052,
  HIRAM_AWAKENING_SCROLL: 45729,
  RADIANT_HIRAM_AWAKENING_SCROLL: 45908,
  BRILLIANT_HIRAM_AWAKENING_SCROLL: 47064,
  RED_DRAGON_POUCH: 46569,
  KADUMS_CRATE: 47702,
  ONYX_ARCHEUM_ESSENCE: 32103,
  DRAGON_ESSENCE_STABILIZER: 32106,
  REVENANT_SOULSTONE: 38093,
  ORIGINAL_TITANS_WINGS: 44018,
  FIERCE_TITANS_WINGS: 44460,
  GLOWING_PRISM: 15621,
  CONDENSED_SCENT: 26505,
  VITA_ROOT: 21850,
  WATER: 15694,
  ECO_FRIENDLY_FUEL: 26548,
  AXLE_GREASE: 42314,
  RECOVERY_POUCH_KIT: 19034,
  CHOPPED_PRODUCE: 30898,
  DRIED_FLOWERS: 30900,
  GROUND_GRAIN: 30902,
  GROUND_SPICES: 30901,
  HONEY: 28481,
  CARROT: 7998,
  STARLIGHT_ARCHEUM_DUST: 16349,
  MYSTERIOUS_ABYSSAL_ENHANCER: 46576,
  NORYETTE_EARRING: {
    name: 'Noryette Earring',
    icon: Icon.NoryetteEarring,
    type: 'Earring',
    quality: QUALITY.HEROIC,
    bindsOnPickup: true,
    reqLevel: 50,
    synthesisXP: 31840,
    synthesisGrade: QUALITY.DIVINE,
    slot: 'Ear',
    durability: 15,
    description: <span>
      <Use title="Combo Effect">Triggers the <Orange>Spiritual Focus Rank 1</Orange> if attacked in the Noryette Challenge.</Use><br /><br />
      <Use title="Equip effect">Decreases <Blue>PvE Received Damage</Blue> <Orange>-2.0%</Orange>.</Use>
    </span>,
  },
  NORYETTE_RING: {
    name: 'Noryette Ring',
    icon: Icon.NoryetteRing,
    type: 'Ring',
    quality: QUALITY.HEROIC,
    bindsOnPickup: true,
    reqLevel: 50,
    synthesisXP: 31840,
    synthesisGrade: QUALITY.DIVINE,
    slot: 'Finger',
    durability: 15,
    description: <span>
      <Use title="Combo Effect">Triggers the <Orange>Challenger's Valor Rank 1</Orange> when using a skill in the Noryette Challenge.</Use><br /><br />
      <Use title="Equip Effect">Increaes <Blue>PvE Skill Damage</Blue> <Orange>+2.0%</Orange>.</Use>
    </span>,
  },
  NORYETTE_AWAKENING_SCROLL: {
    name: 'Noryette Awakening Scroll',
    icon: Icon.NoryetteAwakeningScroll,
    type: 'Awakening Materials',
    quality: QUALITY.RARE,
    bindsOnPickup: true,
    description: <span>
      An awakening scroll, made by the <Blue>Noryette</Blue> family.<br /><br />
      Can only be used on <Yellow>Noryette Accessories</Yellow> of <Yellow>Divine</Yellow> grade or higher.<br /><br />
      Can be obtained by clearing Round 20 or higher in the <Blue>Noryette Challenge</Blue>.<br /><br />
      <Use>Spend <Orange>1</Orange> Noryette Awakening Scroll and <Orange>300</Orange> Labor to awaken the equipment.</Use>
    </span>,
    price: 20,
  },
  LUMINOUS_NORYETTE_AWAKENING_SCROLL: {
    name: 'Luminous Noryette Awakening Scroll',
    icon: Icon.NoryetteAwakeningScroll,
    type: 'Awakening Materials',
    quality: QUALITY.HEROIC,
    bindsOnPickup: true,
    description: <span>
      An awakening scroll, made by the <Blue>Noryette</Blue> family.<br /><br />
      Can only be used on <Yellow>Luminous Noryette Accessories</Yellow> of <Yellow>Legendary</Yellow> grade or higher.<br /><br />
      Can be obtained by clearing Round 20 or higher in the <Blue>Noryette Challenge</Blue>.<br /><br />
      <Use>Spend <Orange>1</Orange> Luminous Noryette Awakening Scroll and <Orange>300</Orange> Labor to awaken the equipment.</Use>
    </span>,
    price: 30,
  },
  MISTSONG_GRINDING_GUARDIAN_SCROLL: {
    name: 'Mistsong Grinding Guardian Scroll',
    icon: Icon.GreaterGrindingScroll,
    type: 'Other',
    quality: QUALITY.RARE,
    description: <span>
      Grants continued dungeon access after you pass your daily entrance limit.<br /><br />
      <Yellow>Caution:</Yellow><br />
      Entering the same dungeon after the daily entrance limit was met will consume this scroll.<br />
      Only for dungeons with a level limit of <Orange>55 or higher</Orange>.<br /><br />
      <Blue>Valid Dungeons</Blue><br />
      Mistsong Summit<br />
      Abyssal Library<br />
      Noryette Challenge
    </span>,
    price: 10000,
  },
  EXPLORERS_BOW: {
    name: 'Explorer\'s Bow',
    icon: Icon.ExplorersBow,
    type: 'Bow',
    quality: QUALITY.BASIC,
    synthesisGrade: QUALITY.ARCANE,
    reqLevel: 1,
    bindsOnPickup: true,
    slot: 'Ranged Weapon',
    attackSpeed: 1.0,
    weaponType: 'Piercing',
    dps: '77.3(77 - 78)',
    description: <span>
      Designed to be equipped by Lv1+ adventurers.<br />
      Can be awakened to the next tier, once it reaches its max grade.<br /><br />
      <Use title="Synthesis Effect" />
      Use <Yellow>Story Quest Infusions</Yellow> as Synthesis Material to improve equipment.
    </span>,
  },
  EXPLORERS_1H_WEAPON_CRATE: {
    name: 'Explorer\'s 1H Weapon Crate',
    icon: Icon.ExplorerCrate,
    type: 'Crate',
    bindsOnPickup: true,
    description: <span>
      Allows you to obtain a 1H-Weapon.<br /><br />
      <Orange>[1H-Weapon]</Orange><br />
      - Can be equipped to both left and right hand.<br /><br />
      <Orange>[Right-Hand Weapon]</Orange><br />
      - Can only be equipped to the right hand.<br /><br />
      <Orange>[Left-Hand Weapon]</Orange><br />
      - Can only be equipped to the left hand.<br /><br />
      <Orange>[Ranged Weapon]</Orange><br />
      - Can be equipped as bow.<br /><br />
      <Use>Open the Explorer's 1H-Weapon Crate.</Use>
    </span>,
  },
  EXPLORERS_2H_WEAPON_CRATE: {
    name: 'Explorer\'s 2H Weapon Crate',
    icon: Icon.ExplorerCrate,
    type: 'Crate',
    bindsOnPickup: true,
    description: <span>Allows you to choose a 2H Weapon.<br /><br />
      <Use>Open the Explorer's 2H-Weapon Crate.</Use>
    </span>,
  },
  EXPLORERS_CLOTH_CRATE: {
    name: 'Explorer\'s Cloth Crate',
    icon: Icon.ExplorerClothCrate,
    type: 'Crate',
    bindsOnPickup: true,
    description: <span>
      This crate contains a selection of Cloth Armor.<br /><br />
      <Yellow>Available Items:</Yellow><br />
      - Hood<br />
      - Shirt<br />
      - Pants<br />
      - Shoes<br /><br />
      <Use>Open to see what's inside.</Use>
    </span>,
  },
  EXPLORERS_LEATHER_CRATE: {
    name: 'Explorer\'s Leather Crate',
    icon: Icon.ExplorerLeatherCrate,
    type: 'Crate',
    bindsOnPickup: true,
    description: <span>
      This crate contains a selection of Leather Armor.<br /><br />
      <Yellow>Available Items:</Yellow><br />
      - Cap<br />
      - Jerkin<br />
      - Breeches<br />
      - Boots<br /><br />
      <Use>Open to see what's inside.</Use>
    </span>,
  },
  EXPLORERS_PLATE_CRATE: {
    name: 'Explorer\'s Plate Crate',
    icon: Icon.ExplorerPlateCrate,
    type: 'Crate',
    bindsOnPickup: true,
    description: <span>
      This crate contains a selection of Plate Armor.<br /><br />
      <Yellow>Available Items:</Yellow><br />
      - Helm<br />
      - Cuirass<br />
      - Greaves<br />
      - Sabatons<br /><br />
      <Use>Open to see what's inside.</Use>
    </span>,
  },
  EXPLORERS_CLOTH_COMPONENT_CRATE: {
    name: 'Explorer\'s Cloth Component Crate',
    icon: Icon.ExplorerClothCrate,
    type: 'Crate',
    bindsOnPickup: true,
    description: <span>
      This crate contains a selection of Cloth Armor.<br /><br />
      <Yellow>Available Items:</Yellow><br />
      - Gloves<br />
      - Sleeves<br />
      - Sash<br /><br />
      <Use>Open to see what's inside.</Use>
    </span>,
  },
  EXPLORERS_LEATHER_COMPONENT_CRATE: {
    name: 'Explorer\'s Leather Component Crate',
    icon: Icon.ExplorerLeatherCrate,
    type: 'Crate',
    bindsOnPickup: true,
    description: <span>
      This crate contains a selection of Leather Armor.<br /><br />
      <Yellow>Available Items:</Yellow><br />
      - Fists<br />
      - Guards<br />
      - Belt<br /><br />
      <Use>Open to see what's inside.</Use>
    </span>,
  },
  EXPLORERS_PLATE_COMPONENT_CRATE: {
    name: 'Explorer\'s Plate Component Crate',
    icon: Icon.ExplorerPlateCrate,
    type: 'Crate',
    bindsOnPickup: true,
    description: <span>
      This crate contains a selection of Plate Armor.<br /><br />
      <Yellow>Available Items:</Yellow><br />
      - Gauntlets<br />
      - Vambraces<br />
      - Tassets<br /><br />
      <Use>Open to see what's inside.</Use>
    </span>,
  },
  STORY_QUEST_INFUSION_RANK_1: {
    name: 'Unidentified Story Quest Infusion: Rank 1',
    icon: Icon.StoryInfusion,
    type: 'Synthesis Materials',
    quality: QUALITY.GRAND,
    unidentified: true,
    bindsOnPickup: true,
    description: <span>
      Used as synthesis material to enhance equipment.<br />
      Infuse the energy to identify the hidden infusion.<br /><br />
      <Use>Unseal the infusion.<br />Auto-use: shift+right-click</Use>
    </span>,
  },
  STORY_QUEST_INFUSION_RANK_2: {
    name: 'Unidentified Story Quest Infusion: Rank 2',
    icon: Icon.StoryInfusion,
    type: 'Synthesis Materials',
    quality: QUALITY.RARE,
    unidentified: true,
    bindsOnPickup: true,
    description: <span>
      Used as synthesis material to enhance equipment.<br />
      Infuse the energy to identify the hidden infusion.<br /><br />
      <Use>Unseal the infusion.<br />Auto-use: shift+right-click</Use>
    </span>,
  },
  STORY_QUEST_INFUSION_RANK_3: {
    name: 'Unidentified Story Quest Infusion: Rank 3',
    icon: Icon.StoryInfusion,
    type: 'Synthesis Materials',
    quality: QUALITY.ARCANE,
    unidentified: true,
    bindsOnPickup: true,
    description: <span>
      Used as synthesis material to enhance equipment.<br />
      Infuse the energy to identify the hidden infusion.<br /><br />
      <Use>Unseal the infusion.<br />Auto-use: shift+right-click</Use>
    </span>,
  },
  STORY_AWAKENING_SCROLL_RANK_1: {
    name: 'Equipment Awakening Scroll Rank 1',
    icon: Icon.StoryAwakeningScroll,
    type: 'Awakening Materials',
    bindsOnPickup: true,
    quality: QUALITY.GRAND,
    description: <span>
      Used to awaken <Yellow>Ancient</Yellow> Faction Mission Equipment, unlocking higher item grades.<br /><br />
      <Use>Use <Orange>1</Orange> Awakening Scroll to awaken the equipment.</Use>
    </span>,
  },
  STORY_AWAKENING_SCROLL_RANK_2: {
    name: 'Equipment Awakening Scroll Rank 2',
    icon: Icon.StoryAwakeningScroll,
    type: 'Awakening Materials',
    bindsOnPickup: true,
    quality: QUALITY.RARE,
    description: <span>
      Used to awaken Explorer's Equipment, unlocking higher item grades.<br />
      Can only be used on <Yellow>Explorer's Equipment</Yellow> or <Yellow>Heroic</Yellow> grade or higher.<br /><br />
      <Use>Use <Orange>1</Orange> Awakening Scroll to awaken the equipment.</Use>
    </span>,
  },
  STORY_AWAKENING_SCROLL_RANK_3: {
    name: 'Equipment Awakening Scroll Rank 3',
    icon: Icon.StoryAwakeningScroll,
    type: 'Awakening Materials',
    bindsOnPickup: true,
    quality: QUALITY.ARCANE,
    description: <span>
      Used to awaken Explorer's Equipment, unlocking higher item grades.<br />
      Can only be used on <Yellow>Radiant Explorer's Equipment</Yellow> or <Yellow>Unique</Yellow> grade or higher.<br /><br />
      <Use>Use <Orange>1</Orange> Awakening Scroll to awaken the equipment.</Use>
    </span>,
  },
  ADVENTURERS_EVENSTONE: {
    name: 'Adventurer\'s Evenstone',
    icon: Icon.TimeStone,
    type: 'Talisman',
    bindsOnPickup: true,
    description: <span>
      Used to revert equipment to its original state and recover the enhancement materials.<br />
      Can be purchased from <Blue>General Merchants</Blue> and <Blue>Blacksmiths</Blue>.<br /><br />
      ;Extractable Item<br />
      <Blue>- Mission Equipment</Blue><br />
      <Blue>- Radiant Explorer's Equipment</Blue><br />
      <Blue>- Brilliant Explorer's Equipment</Blue><br />
      Can not be used on Instruments.<br /><br />
      <Use>Masonry: Spend up to 10 Labor to extract magic ingredients from the item.</Use>
    </span>,
    price: 50,
  },
  BLUE_SALT_KNIFE: 8326,
  BLUE_SALT_HAMMER: 8329,
  REDTALON_HELM: 28082,
  REDTALON_ARMOR: 28083,
  REDTALON_SADDLE: 28080,
  REDTALON_LEGGUARDS: 28081,
  LABYRINTH_VALUABLES_CHEST: 28334,
  CARMILAS_MEMORY: 27137,
  SUNSET_PORTALSTONE: 39780,
  SUPERIOR_DOOMSHADOW_NODACHI: 39723,
  SUNPOINT: 28301,
  MOONPOINT: 28302,
  STARPOINT: 31929,
  SUNGLOW_LUNAGEM: 43481,
  DERANGED_SPIRIT: 28982,
  MYSTERIOUS_GEM: 44829,
  ABYSSAL_SHARD: 28189,
  ABYSSAL_CRYSTAL: 28188,
  ETERNAL_WINTER_CHILL: 24916,
  HEAT_OF_ETERNAL_SUMMER: 24915,
  PRIME_LUNARITE: 24914,
  BLACK_PEARL: 19045,
  AMETHYST: 8079,
  DIAMOND: 8076,
  EMERALD: 8082,
  TOPAZ: 8084,
  SMALL_BREATH_OF_LIFE: 46825,
  BLANK_REGRADE_SCROLL: 28305,
  BEAUTIFULLY_COLORED_FABRIC: 16344,
  STURDY_INGOT: 8319,
  FINE_LEATHER: 16328,
  PRISMATIC_DIAMOND: 31810,
  HONORFORGED_MEDAL: 40491,
  PUREBRED_BEAR_CERTIFICATE: 29767,
  DILIGENCE_COIN: 48064,
  MANASTORM_CRYSTAL: 45508,
  CHILLED_SEAFOAM: 29216,
  TERRITORY_COIN: 48078,
  BLAZING_WIND_SPIRIT_LEATHER: 28970,
  BLAZING_CLOUDSPUN_FABRIC: 28971,
  TERRITORY_PENCE: 40229,
  TERRITORY_RESOURCE_COIN: 48133,
});

export default ITEM;
