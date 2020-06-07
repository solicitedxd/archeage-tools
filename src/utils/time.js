/**
 * Converts dd hh mm ss to seconds.
 * @param dd{number} days
 * @param hh{number} hours
 * @param mm{number} minutes
 * @param ss{number} seconds
 * @returns {number} seconds
 */
export const toSeconds = (dd, hh, mm, ss) => (dd * (24 * 60 * 60)) + (hh * (60 * 60)) + (mm * 60) + ss;

/**
 * Gets hh:mm:ss from a Date.
 * @param date{Date} date
 * @param leadTimes{boolean}
 * @returns {string} hh:mm:ss
 */
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

