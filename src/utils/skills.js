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
