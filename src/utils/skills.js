import classes from 'constants/classes';

export const findClassName = (skillset0, skillset1, skillset2) => {
  const selectedSkillsets = [skillset0, skillset1, skillset2];

  const classObj = classes.find(classObj => classObj.skillSets.every(skillSet => selectedSkillsets.includes(skillSet)));

  if (classObj) {
    return classObj.name;
  } else {
    console.error('Class not found for skillsets:', selectedSkillsets);
  }
};

const boolToInt = (bool) => bool === true ? 1 : 0;

export const getTreePoints = (skills) => {
  if (skills.length === 0) {
    return 0;
  }
  if (skills.length === 1) {
    return boolToInt(skills[0]);
  }
  return skills.reduce((a, b) => {
    if (Boolean(a) === a || a === undefined) {
      a = boolToInt(a);
    }
    if (Boolean(b) === b || b === undefined) {
      b = boolToInt(b);
    }
    return a + b;
  });
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
