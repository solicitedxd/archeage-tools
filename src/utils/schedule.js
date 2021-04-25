import {
  ALERT_DEFAULT,
  DAY,
} from 'constants/schedule';

export const getDayKey = (dayNum) => {
  return Object.keys(DAY).find((key, id) => id === dayNum);
};

export const getDay = (dayNum) => {
  return Object.values(DAY).find((day, id) => id === dayNum);
};

export const getDayNum = (day) => {
  return Object.keys(DAY).indexOf(day.toUpperCase());
};

export const getHhmmss = (time) => {
  return time.split(':');
};

export const hhmmssToInt = (time) => {
  const [hh, mm, ss] = getHhmmss(time);
  return hh + (mm / 60) + (ss / (60 * 60));
};

export const getReminderTime = (eventTime, reminderOption) => {
  let { multiplier, time } = reminderOption;
  const reminderTime = hhmmssToInt(eventTime.reminderTime || ALERT_DEFAULT);

  if (time && time > 0) {
    return Math.round(time * 60);
  } else if (reminderTime < .5 && multiplier === 0.5) {
    multiplier = 0.33;
  }

  return Math.round(reminderTime * multiplier * 60) * 60;
};
