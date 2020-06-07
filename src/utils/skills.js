import { getSkillsets } from 'actions/gameData';
import {
  ANCESTRAL_LENGTH,
  ANCESTRAL_MAX,
  DEFAULT_ANCESTRALS,
  DEFAULT_SKILLS,
} from 'constants/skills';
import {
  encodeColors,
  substitute,
} from 'utils/string';

/**
 * Get the number of points in a skillset.
 * @param skills{int[]}
 * @returns {int} number of points in the skillset
 */
export const getTreePoints = (skills) => {
  if (skills.length === 0) {
    return 0;
  }
  return skills.reduce((a, b) => (a || 0) + (b || 0));
};

/**
 * Gets the number of points required for a skill by its required level.
 * @param reqLevel{int} required level
 * @returns {int} required skillset points
 */
export const getPointReq = (reqLevel) => {
  if (reqLevel === 15) {
    return 3;
  }
  if (reqLevel === 35) {
    return 4;
  }
  if (reqLevel === 55) {
    return 5;
  }
  return 0;
};

/**
 * Create a default skillset object.
 * @returns {{id: null, skills: int[] ancestrals: int[]}}
 */
export const defaultSkillset = () => ({ id: null, skills: DEFAULT_SKILLS, ancestrals: DEFAULT_ANCESTRALS });

/**
 * Support for legacy skill string decoding.
 * @param skillString skill string
 * @returns {{id:int,skills:int[],ancestrals:int[]}[]} skillset data
 */
export const legacyDecodeSkillString = (skillString) => {
  const skillsets = getSkillsets();
  const decodedTrees = skillString.split(':').map(rawTree => {
    let treeName;
    let skills;
    let ancestrals;
    if (rawTree.indexOf(',') >= 0) {
      [treeName, skills, ancestrals] = rawTree.split(',');
    } else {
      [treeName, skills, ancestrals] = rawTree.split('.');
    }
    const skillset = Object.values(skillsets).find(sks => sks.name.toUpperCase() === treeName.toUpperCase());
    if (!skillset) {
      treeName = null;
      skills = DEFAULT_SKILLS;
      ancestrals = [];
      return { id: null, skills, ancestrals };
    } else {
      skills = decodeSkillHex(skills);
      ancestrals = legacyDecodeAncestrals(ancestrals);
      return { id: skillset.id, skills, ancestrals };
    }
  });
  while (decodedTrees.length < 3) {
    decodedTrees.push({ treeName: null, skills: [], ancestrals: [] });
  }
  if (decodedTrees.length > 3) {
    decodedTrees.unshift(decodedTrees.length - 3);
  }
  return decodedTrees;
};

/**
 * Encodes skillset data into a skill string.
 * @param skillsets{{id:int,skills:int[],ancestrals:int[]}[]} skillset data
 * @returns {string} skill string
 */
export const encodeSkillsets = (skillsets) => {
  return skillsets.filter(set => Boolean(set.id)).map(set => {
    return `${intToHex(set.id - 1)}${encodeSkillsAsHex(set.skills)}${encodeAncestrals(set.ancestrals)}`;
  }).join(':');
};

/**
 * Extracts skillset data from an encoded skill string.
 * @param skillString{string} skill string
 * @returns {{id:int,skills:int[],ancestrals:int[]}[]} skillset data
 */
export const decodeSkillString = (skillString) => {
  const skillsets = skillString.split(':').map(setString => {
    if (setString.length === 0) {
      return defaultSkillset();
    }

    setString = setString.padEnd(5, '0');
    const id = hexToInt(setString.substr(0, 1)) + 1;
    const skills = decodeSkillHex(setString.substr(1, 3));
    const ancestrals = decodeAncestrals(setString.substr(4));
    return { id, skills, ancestrals };
  });
  while (skillsets.length < 3) {
    skillsets.push(defaultSkillset());
  }
  if (skillsets.length > 3) {
    skillsets.unshift(skillsets.length - 3);
  }
  return skillsets;
};

/**
 * Converts an integer into a hexadecimal value
 * @param int number
 * @returns {string} hexadecimal value
 */
const intToHex = (int) => int.toString(16);

/**
 * Converts a hexadecimal value into an integer.
 * @param hex hexadecimal value
 * @returns {int} number
 */
const hexToInt = (hex) => parseInt(hex, 16);

/**
 * Converts skill array to an integer, then condenses to a hex value
 * @param skills{int[]} skill boolean array
 * @returns {string} hex skill string
 */
const encodeSkillsAsHex = (skills) => {
  let bits = 0;
  // prepare the skills and bits
  for (let i = 0; i < 12; i++) {
    if (skills[i] !== 1 && skills[i] !== 0) {
      skills[i] = 0;
    }
    if (skills[i] === 1) {
      bits = bits | (1 << i);
    }
  }

  return bits.toString(16).padStart(3, 0);
};

/**
 * Decodes a skill hex string into an array.
 * @param hex{string} skill hex string
 * @returns {int[]} array of skill booleans
 */
const decodeSkillHex = (hex) => {
  if (!hex) return DEFAULT_SKILLS;
  const bits = parseInt(hex, 16);
  const skills = [];
  for (let i = 0; i < 12; i++) {
    skills[i] = (bits & (1 << i)) >= 1 ? 1 : 0;
  }
  return skills;
};

/**
 * Encodes an ancestral int array into a hex string.
 * @param ancestrals{int[]} ancestrals
 * @returns {string} hex ancestral string
 */
const encodeAncestrals = (ancestrals) => {
  let bits = 0;
  for (let i = 0; i < ANCESTRAL_LENGTH; i++) {
    const value = ancestrals[i];
    for (let v = 0; v < ANCESTRAL_MAX; v++) {
      if (value - 1 === v) {
        bits = bits | (1 << ((i * ANCESTRAL_MAX) + v));
      }
    }
  }
  return bits.toString(16);
};

/**
 * Decode ancestral hex string into int array.
 * @param hex{string} hex ancestral string
 * @returns {int[]} int array of ancestrals
 */
const decodeAncestrals = (hex) => {
  if (!hex) return DEFAULT_ANCESTRALS;
  const bits = parseInt(hex, 16);
  const ancestrals = [];
  for (let i = 0; i < ANCESTRAL_LENGTH; i++) {
    // set a default
    ancestrals[i] = 0;
    // find the value
    for (let v = 0; v < ANCESTRAL_MAX; v++) {
      const bit = bits & (1 << ((i * ANCESTRAL_MAX) + v));
      if (bit >= 1) {
        ancestrals[i] = v + 1;
        v = ANCESTRAL_MAX;
      }
    }
  }
  return ancestrals;
};

/**
 * Legacy support for decoding an ancestral string.
 * @param chars{string}
 * @returns {int[]}
 */
const legacyDecodeAncestrals = (chars) => {
  if (!chars) return [];
  const ancestrals = [];
  for (let i = 0; i < chars.length; i++) {
    if (chars[i] === '1') {
      ancestrals[i] = 1;
    } else if (chars[i] === '2') {
      ancestrals[i] = 2;
    } else {
      ancestrals[i] = 0;
    }
  }
  return ancestrals;
};

/**
 * Substitute variables into a description.
 * @param description{string} description text
 * @param varsRaw{{}[]} array of var data
 * @param passive{boolean} is this skill a passive?
 * @param showKey{boolean} show var keys in text?
 * @returns {string}
 */
export const substituteVars = (description, varsRaw, passive = false, showKey = false) => {
  description = description.replace(/#{([a-z0-9_]+)}/g, '\${$1}');
  const vars = varsRaw.reduce((obj, props) => {
    const { key, base, baseVariant, ratio, ratioVariant, powerType, text } = props;
    if (key.match(/_detail$/) || (ratio && powerType)) {
      let str = '<span class="text-scale">(';
      str += base !== null ? base : '?base?';
      if (baseVariant) {
        str += '-' + baseVariant;
      }
      str += ' + ';
      str += ratio !== null ? ratio : '?ratio?';
      if (ratioVariant) {
        str += '-' + ratioVariant;
      }
      str += '% ';
      str += powerType || '?powerType?';
      str += ')</span>';
      obj[key] = str;
    } else if (key.match(/_(duration(\d+)?|time)$/)) {
      obj[key] = renderTime(base, passive);
    } else if (key.match(/_range(\d+)?$/)) {
      obj[key] = base + 'm';
    } else {
      obj[key] = base !== undefined ? base : text;
    }
    return obj;
  }, {});
  description = substitute(description, vars, showKey);
  return encodeColors(description);
};

/**
 * Convert seconds into a string with min/sec labels.
 * @param seconds{int} seconds
 * @param useSpace{boolean} put a space between the number and the label?
 * @returns {string} time string
 */
export const renderTime = (seconds, useSpace) => {
  const spacer = useSpace ? ' ' : '';
  let time = '';
  if (Math.abs(seconds) > 0) {
    if (Math.abs(seconds) > 59) {
      time += `${Math.floor(seconds / 60)}${spacer}min`;
    }
    if (Math.abs(seconds) % 60 > 0) {
      time += ` ${seconds % 60}${spacer}sec`;
    }
  }
  return time.trim();
};

/**
 * @deprecated
 */
export const getSkillIdByName = (skills, name) => skills.indexOf(skills.find(skill => skill.name === name));
