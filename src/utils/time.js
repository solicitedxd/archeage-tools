/**
 * Converts dd hh mm ss to seconds.
 * @param days{number} days
 * @param hours{number} hours
 * @param minutes{number} minutes
 * @param seconds{number} seconds
 * @returns {number} seconds
 */
export const toSeconds = (days, hours, minutes, seconds) => (days * (24 * 60 * 60)) + (hours * (60 * 60)) + (minutes * 60) + seconds;

/**
 * Gets hh:mm:ss from a Date.
 * @param date{Date|number} date
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

