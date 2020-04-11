import { DAY } from 'constants/schedule';

export const getDayKey = (dayNum) => {
  return Object.keys(DAY).find((key, id) => id === dayNum);
};

export const getDay = (dayNum) => {
  return Object.values(DAY).find((day, id) => id === dayNum);
};

export const getDayNum = (day) => {
  return Object.keys(DAY).indexOf(day.toUpperCase());
};
