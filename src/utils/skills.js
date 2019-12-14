import classes from 'data/classes';
import { substitute } from 'utils/string';

export const findClassName = (skillset0, skillset1, skillset2) => {
  const selectedSkillsets = [skillset0, skillset1, skillset2];

  const classObj = classes.find(classObj => classObj.skillSets.every(skillSet => selectedSkillsets.includes(skillSet)));

  if (classObj) {
    return classObj.name;
  } else {
    console.error('Class not found for skillsets:', selectedSkillsets);
  }
};

export const getTreePoints = (skills) => {
  if (skills.length === 0) {
    return 0;
  }
  return skills.reduce((a, b) => (a || 0) + (b || 0));
};

export const getPointReq = (skillId) => {
  if (skillId === 3) {
    return 3;
  }
  if (skillId === 7) {
    return 4;
  }
  if (skillId === 11) {
    return 5;
  }
  return 0;
};

export const encodeSkillsAsHex = (skills) => {
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

export const decodeSkillHex = (hex) => {
  if (!hex) return [];
  const bits = parseInt(hex, 16);
  const skills = [];
  for (let i = 0; i < 12; i++) {
    skills[i] = (bits & (1 << i)) >= 1 ? 1 : 0;
  }
  return skills;
};

export const encodeAncestrals = (ancestrals) => {
  const chars = [];
  for (let i = 0; i < 5; i++) {
    if (ancestrals[i] === 1 || ancestrals[i] === 2) {
      chars[i] = ancestrals[i];
    } else {
      chars[i] = 0;
    }
  }
  return chars.join('');
};

export const decodeAncestrals = (chars) => {
  if (!chars) return [];
  const ancestrals = [];
  for (let i = 0; i < 5; i++) {
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

export const deepCopy = (object) => {
  if (!object) return;
  return JSON.parse(JSON.stringify(object));
};

export const compareBuff = (buff1, buff2) => {
  if (!buff1 && !buff2) return true;
  if (!buff1 || !buff2) return false;
  return (buff1.name === buff2.name && buff1.icon === buff2.icon && buff1.negative === buff2.negative);
};

export const applyTooltipColor = (string) => string
.replace(/(#([^#]+)#)/g, (m, g0, text) => `<span class="tt-orange">${text}</span>`)
.replace(/(&([^&]+)&)/g, (m, g0, text) => `<span class="tt-scale">${text}</span>`)
.replace(/\r/g, () => '<br />');

export const prepareComboText = (combo, skill) => {
  let { text } = combo;
  const textSub = {
    b: combo.buff && combo.buff.name,
    c: combo.causes && combo.causes.name,
  };
  Object.keys(skill).forEach(key => {
    if (key.match(/(damage|healing)/i) && skill[key]) {
      const { base, ratio, attack } = skill[key];
      textSub[key] = `&(${base} + ${ratio}% ${attack})&`;
    } else {
      textSub[key] = skill[key];
    }
  });
  text = substitute(text, textSub);
  return applyTooltipColor(text);
};
