export const isNumber = (number) => !Number.isNaN(Number.parseFloat(number));

export const maxDecimals = (number, fractionDigits) => {
  return Math.round(number * (10 ** fractionDigits)) / (10 ** fractionDigits);
};

export const maxDecimalsFloor = (number, fractionDigits) => {
  return Math.floor(number * (10 ** fractionDigits)) / (10 ** fractionDigits);
};

export const pad = (str, max) => {
  str = str.toString();
  return str.length < max ? pad('0' + str, max) : str;
};
