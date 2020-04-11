export const toSeconds = (time) => {
  const m = time.match(/((\d{1,2})d)?((\d{1,2})h)?((\d{1,2})m)?((\d{1,2})s)?/);
  const dd = Number.parseInt(m[2]) || 0;
  const hh = Number.parseInt(m[4]) || 0;
  const mm = Number.parseInt(m[6]) || 0;
  const ss = Number.parseInt(m[8]) || 0;
  return (dd * (24 * 60 * 60)) + (hh * (60 * 60)) + (mm * 60) + ss;
};

export const timeFormat = 'MMM D h:mm:ss A';

export const hhmmssFromDate = (date, leadTimes = true) => {
  const timeMatch = new Date(date).toUTCString().match(/, (\d\d).+(\d\d):(\d\d):(\d\d)/);
  const days = parseInt(timeMatch[1]) - 1;
  const hours = leadTimes || days > 0 ? timeMatch[2] : parseInt(timeMatch[2]);
  const minutes = leadTimes || hours > 0 ? timeMatch[3] : parseInt(timeMatch[3]);
  const seconds = leadTimes || minutes > 0 ? timeMatch[4] : parseInt(timeMatch[4]);
  let remaining = [];
  if (days > 0) {
    remaining.push(days);
  }
  if (days > 0 || hours > 0) {
    remaining.push(hours);
  }
  remaining.push(minutes);
  remaining.push(seconds);
  return remaining.join(':');
};

export const maxDecimals = (number, fractionDigits) => {
  return Math.round(number * (10 ** fractionDigits)) / (10 ** fractionDigits);
};
