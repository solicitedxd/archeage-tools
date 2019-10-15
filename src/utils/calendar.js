import { DAY } from 'constants/calendar';

export const getDay = (dayNum) => {
  return Object.values(DAY).find((day, id) => id === dayNum);
};
