export const toSeconds = (time) => {
  const m = time.match(/((\d{1,2})d)?((\d{1,2})h)?((\d{1,2})m)?((\d{1,2})s)?/);
  const dd = Number.parseInt(m[2]) || 0;
  const hh = Number.parseInt(m[4]) || 0;
  const mm = Number.parseInt(m[6]) || 0;
  const ss = Number.parseInt(m[8]) || 0;
  return (dd * (24 * 60 * 60)) + (hh * (60 * 60)) + (mm * 60) + ss;
};

export const timeFormat = 'MMM D h:mm:ss A';

export const hhmmssFromDate = (date) => {
  const timeMatch = new Date(date).toUTCString().match(/, (\d\d).+(\d\d):(\d\d):(\d\d)/);
  const days = parseInt(timeMatch[1]) - 1;
  const hours = timeMatch[2];
  const minutes = timeMatch[3];
  const seconds = timeMatch[4];

  return hhmmssFormat({ days, hours, minutes, seconds });
};

export const hhmmssFromSeconds = (ss) => {
  const seconds = Math.round(ss % 60);
  const minutes = Math.floor(ss / 60) % 60;
  const hours = Math.floor(ss / 60 / 60) % 24;
  const days = Math.floor(ss / 60 / 60 / 24);

  return hhmmssFormat({ days, hours, minutes, seconds });
};

const hhmmssFormat = ({ days, hours, minutes, seconds }) => {
  const remaining = [];
  if (days > 0) {
    remaining.push(days);
  }
  if (days > 0 || hours > 0) {
    remaining.push(String(hours).padStart(2, 0));
  }
  if (days > 0 || hours > 0 || minutes > 0 || seconds >= 0) {
    remaining.push(String(minutes).padStart(2, 0));
    remaining.push(String(seconds).padStart(2, 0));
  }
  return remaining.join(':');
};
