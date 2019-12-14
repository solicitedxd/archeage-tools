import { DAY } from 'constants/schedule';

export const getDay = (dayNum) => {
  return Object.values(DAY).find((day, id) => id === dayNum);
};
