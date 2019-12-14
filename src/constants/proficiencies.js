import { QUALITY } from 'constants/items';

export const PROFICIENCY = Object.freeze([
  {
    name: 'Basic',
    quality: QUALITY.BASIC,
    maxRank: 10000,
    cost: 1,
  },
  {
    name: 'Novice',
    quality: QUALITY.GRAND,
    maxRank: 20000,
    cost: 1,
  },
  {
    name: 'Veteran',
    quality: QUALITY.RARE,
    maxRank: 30000,
    cost: 1,
  },
  {
    name: 'Expert',
    quality: QUALITY.ARCANE,
    maxRank: 40000,
    cost: 0.95,
  },
  {
    name: 'Master',
    quality: QUALITY.HEROIC,
    maxRank: 50000,
    cost: 0.9,
  },
  {
    name: 'Authority',
    quality: QUALITY.UNIQUE,
    maxRank: 70000,
    cost: 0.85,
  },
  {
    name: 'Champion',
    quality: QUALITY.UNIQUE,
    maxRank: 90000,
    cost: 0.8,
  },
  {
    name: 'Adept',
    quality: QUALITY.UNIQUE,
    maxRank: 110000,
    cost: 0.8,
  },
  {
    name: 'Herald',
    quality: QUALITY.UNIQUE,
    maxRank: 130000,
    cost: 0.8,
  },
  {
    name: 'Virtuoso',
    quality: QUALITY.UNIQUE,
    maxRank: 150000,
    cost: 0.75,
  },
  {
    name: 'Celebrity',
    quality: QUALITY.CELESTIAL,
    maxRank: 180000,
    cost: 0.7,
  },
  {
    name: 'Famed',
    quality: QUALITY.DIVINE,
    maxRank: 230000,
    cost: 0.6,
  },
]);
