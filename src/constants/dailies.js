export const QUEST_STATUS = 'QUEST_STATUS';
export const QUEST_RESET = 'QUEST_RESET';
export const QUEST_FILTER_FACTION = 'QUEST_FILTER_FACTION';
export const QUEST_FILTER_REWARD = 'QUEST_FILTER_REWARD';
export const QUEST_FILTER_CONTINENT = 'QUEST_FILTER_CONTINENT';
export const QUEST_FILTER_TYPE = 'QUEST_FILTER_TYPE';
export const QUEST_FILTER_COMPLETE = 'QUEST_FILTER_COMPLETE';
export const QUEST_HIDE = 'QUEST_HIDE';
export const QUEST_HIDE_MODE = 'QUEST_HIDE_MODE';
export const QUEST_HIDE_RESET = 'QUEST_HIDE_RESET';

export const ZONE = Object.freeze({
  ARCUM_IRIS: 'Arcum Iris',
  FALCORTH_PLAINS: 'Falcorth Plains',
  SUNBITE_WILDS: 'Sunbite Wilds',
  TIGERSPINE_MOUNTAINS: 'Tigerspine Mountains',
  MAHADEVI: 'Mahadevi',
  SOLIS_HEADLANDS: 'Solis Headlands',
  VILLANELLE: 'Villanelle',
  SILENT_FOREST: 'Silent Forest',
  YNYSTERE: 'Ynystere',

  SOLZREED_PENINSULA: 'Solzreed Peninsula',
  GWEONID_FOREST: 'Gweonid Forest',
  AIRAIN_ROCK: 'Airain Rock',
  LILYUT_HILLS: 'Lilyut Hills',
  AUBRE_CRADLE: 'Aubre Cradle',
  DEWSTONE_PLAINS: 'Dewstone Plains',
  WHITE_ARDEN: 'White Arden',
  MARIANOPLE: 'Marianople',
  TWO_CROWNS: 'Two Crowns',
  CINDERSTONE_MOOR: 'Cinderstone Moor',

  HALCYONA: 'Halcyona',
  HELLSWAMP: 'Hellswamp',
  SANDDEEP: 'Sanddeep',

  ROOKBORNE_BASIN: 'Rookborne Basin',
  WINDSCOUR_SAVANNAH: 'Windscour Savannah',
  PERINOOR_RUINS: 'Perinoor Ruins',
  HASLA: 'Hasla',

  KARKASSE_RIDGELANDS: 'Karkasse Ridgelands',

  ROKHALA_MOUNTAINS: 'Rokhala Mountains',
  AHNIMAR: 'Ahnimar',

  DIAMOND_SHORES: 'Diamond Shores',
  GOLDEN_RUINS: 'Golden Ruins',
  WHALESONG_HARBOR: 'Whalesong Harbor',
  REEDWIND: 'Reedwind',
  WESTERN_HIRAM_MOUNTAINS: 'Western Hiram Mountains',
  EASTERN_HIRAM_MOUNTAINS: 'Eastern Hiram Mountains',

  SUNGOLD_FIELDS: 'Sungold Fields',
  CALMLANDS: 'Calmlands',
  MARCALA: 'Marcala',
  HEEDMAR: 'Heedmar',
  NUIMARI: 'Nuimari',
  EXELOCH: 'Exeloch',

  FREEDICH_ISLAND: 'Freedich Island',
  GROWLGATE_ISLE: 'Growlgate Isle',
  AEGIS_ISLAND: 'Aegis Island',
  SEA_OF_DROWNED_LOVE: 'Sea of Drowned Love',
  ARCADIAN_SEA: 'Arcadian Sea',

  FARMERS_WORKSTATION: 'Farmer\'s Workstation',
  FARMHOUSE: 'Farmhouse',
  SPICE_SEED_BUNDLE: 'Spice Seed Bundle',
  IRON_VEIN: 'Iron Vein',
  PRODUCE_SEED_BUNDLE: 'Produce Seed Bundle',
  GOOSE_CAGE: 'Small Bamboo Goose Cage',

  THE_FALL_OF_HIRAM_CITY: 'The Fall of Hiram City (Instance)',
  RED_DRAGONS_KEEP: 'Red Dragon\'s Keep (Instance)',
  MISTMERROW: 'Mistmerrow (Instance)',
  GOLDEN_PLAINS: 'Golden Plains Battle (Instance)',
});

export const CONTINENT = Object.freeze({
  NUIA: {
    name: 'Nuia',
    zones: [
      ZONE.SOLZREED_PENINSULA,
      ZONE.GWEONID_FOREST,
      ZONE.LILYUT_HILLS,
      ZONE.AIRAIN_ROCK,
      ZONE.AUBRE_CRADLE,
      ZONE.DEWSTONE_PLAINS,
      ZONE.WHITE_ARDEN,
      ZONE.MARIANOPLE,
      ZONE.TWO_CROWNS,
      ZONE.CINDERSTONE_MOOR,
      ZONE.HALCYONA,
      ZONE.HELLSWAMP,
      ZONE.SANDDEEP,
      ZONE.KARKASSE_RIDGELANDS,
      ZONE.AHNIMAR,
    ],
  },
  HARANYA: {
    name: 'Haranya',
    zones: [
      ZONE.ARCUM_IRIS,
      ZONE.FALCORTH_PLAINS,
      ZONE.SUNBITE_WILDS,
      ZONE.TIGERSPINE_MOUNTAINS,
      ZONE.MAHADEVI,
      ZONE.SOLIS_HEADLANDS,
      ZONE.VILLANELLE,
      ZONE.SILENT_FOREST,
      ZONE.YNYSTERE,
      ZONE.ROOKBORNE_BASIN,
      ZONE.WINDSCOUR_SAVANNAH,
      ZONE.PERINOOR_RUINS,
      ZONE.HASLA,
      ZONE.ROKHALA_MOUNTAINS,
    ],
  },
  ARCADIAN_SEA: {
    name: 'Arcadian Sea',
    zones: [
      ZONE.FREEDICH_ISLAND,
      ZONE.GROWLGATE_ISLE,
      ZONE.ARCADIAN_SEA,
      ZONE.SEA_OF_DROWNED_LOVE,
    ],
  },
  AURORIA: {
    name: 'Auroria',
    zones: [
      ZONE.DIAMOND_SHORES,
      ZONE.GOLDEN_RUINS,
      ZONE.WHALESONG_HARBOR,
      ZONE.REEDWIND,
      ZONE.WESTERN_HIRAM_MOUNTAINS,
      ZONE.EASTERN_HIRAM_MOUNTAINS,
      ZONE.SUNGOLD_FIELDS,
      ZONE.CALMLANDS,
      ZONE.MARCALA,
      ZONE.HEEDMAR,
      ZONE.NUIMARI,
      ZONE.EXELOCH,
      ZONE.AEGIS_ISLAND,
    ],
  },
  INSTANCE: {
    name: 'Instance',
    zones: [
      ZONE.THE_FALL_OF_HIRAM_CITY,
      ZONE.RED_DRAGONS_KEEP,
      ZONE.MISTMERROW,
      ZONE.GOLDEN_PLAINS,
    ],
  },
  CRAFTED: {
    name: 'Your Farm',
    zones: [
      ZONE.FARMERS_WORKSTATION,
      ZONE.FARMHOUSE,
      ZONE.SPICE_SEED_BUNDLE,
      ZONE.IRON_VEIN,
      ZONE.PRODUCE_SEED_BUNDLE,
      ZONE.GOOSE_CAGE,
    ],
  },
});

export const FACTION = Object.freeze({
  NUIA: 'Nuia',
  HARANYA: 'Haranya',
});

export const TYPE = Object.freeze({
  BLUE_SALT: 'Blue Salt',
  SUPPLY_DEMAND: 'Bonds',
  HUNTING_REQUEST: 'Hunting Request',
  WORLD_BOSS: 'World Boss',
  DUNGEON: 'Dungeon',
  FAMILY: 'Family',
  GUILD: 'Guild Mission',
  OTHER: 'Other',
  RIFT: 'Rift',
  HIRAM: 'Hiram',
});

export const DIFFICULTY = Object.freeze({
  ELITE: 'Elite',
  EPIC: 'Epic',
  LEGENDARY: 'Legendary',
  MYTHIC: 'Mythic',
});

export const REWARD = Object.freeze({
  COIN: 'Coin',
  GILDA: 'Gilda Stars',
  HONOR: 'Honor Points',
  VOCATION: 'Vocation Badges',
  PRESTIGE: 'Prestige',
  LEADERSHIP: 'Leadership',
  GUILD_XP: 'Guild XP',
  FAMILY_XP: 'Family XP',
  ITEM: 'Items',
});

export const QUALITY = Object.freeze({
  POOR: 'Poor',
  BASIC: 'Basic',
  GRAND: 'Grand',
  RARE: 'Rare',
  ARCANE: 'Arcane',
  HEROIC: 'Heroic',
  UNIQUE: 'Unique',
  CELESTIAL: 'Celestial',
  DIVINE: 'Divine',
});


