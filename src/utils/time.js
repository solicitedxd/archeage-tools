import moment from 'moment';
import tz from 'moment-timezone';
import momentDurationFormatSetup from 'moment-duration-format';

export const timezone = moment.tz.guess();
export const TIME_FORMAT = 'HH:mm:ss';
export const DAY_FORMAT = `D:${TIME_FORMAT}`;

export const formatSeconds = (seconds) => {
  const hh = Math.floor(seconds / 3600).toString().padStart(2, '0');
  seconds %= 3600;
  const mm = Math.floor(seconds / 60).toString().padStart(2, '0');
  const ss = (seconds % 60).toString().padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
};

export const getMomentWithTime = (time) => {
  const now = moment();
  time = time.split(':');
  now.hour(time[0]);
  now.minute(time[1]);
  now.second(time[2]);
  return now;
};

export const getTimeUntil = (time) => {
  const now = moment();
  const diff = moment.duration(time.diff(now));

  return diff.format(DAY_FORMAT);
};


