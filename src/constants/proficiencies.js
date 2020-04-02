export const PROFICIENCY_UPDATE = 'PROFICIENCY_UPDATE';

// proficiency constants
export const HUSBANDRY = 'Husbandry';
export const FARMING = 'Farming';
export const FISHING = 'Fishing';
export const LOGGING = 'Logging';
export const GATHERING = 'Gathering';
export const MINING = 'Mining';
export const ALCHEMY = 'Alchemy';
export const COOKING = 'Cooking';
export const HANDICRAFTS = 'Handicrafts';
export const MACHINING = 'Machining';
export const METALWORK = 'Metalwork';
export const PRINTING = 'Printing';
export const MASONRY = 'Masonry';
export const TAILORING = 'Tailoring';
export const LEATHERWORK = 'Leatherwork';
export const WEAPONRY = 'Weaponry';
export const CARPENTRY = 'Carpentry';
export const CONSTRUCTION = 'Construction';
export const LARCENY = 'Larceny';
export const COMMERCE = 'Commerce';
export const ARTISTRY = 'Artistry';
export const EXPLORATION = 'Exploration';

export const PROFICIENCY_RANK = Object.freeze([
  {
    name: 'Basic',
    grade: 1,
    maxValue: 10000,
    cost: 1,
  },
  {
    name: 'Novice',
    grade: 2,
    maxValue: 20000,
    cost: 1,
  },
  {
    name: 'Veteran',
    grade: 3,
    maxValue: 30000,
    cost: 0.95,
  },
  {
    name: 'Expert',
    grade: 4,
    maxValue: 40000,
    cost: 0.9,
  },
  {
    name: 'Master',
    grade: 5,
    maxValue: 50000,
    cost: 0.85,
  },
  {
    name: 'Authority',
    grade: 6,
    maxValue: 70000,
    cost: 0.8,
  },
  {
    name: 'Champion',
    grade: 6,
    maxValue: 90000,
    cost: 0.8,
  },
  {
    name: 'Adept',
    grade: 6,
    maxValue: 110000,
    cost: 0.8,
  },
  {
    name: 'Herald',
    grade: 6,
    maxValue: 130000,
    cost: 0.8,
  },
  {
    name: 'Virtuoso',
    grade: 6,
    maxValue: 150000,
    cost: 0.75,
  },
  {
    name: 'Celebrity',
    grade: 7,
    maxValue: 180000,
    cost: 0.7,
  },
  {
    name: 'Famed',
    grade: 8,
    maxValue: 230000,
    cost: 0.6,
  },
]);
