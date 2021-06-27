const XMLSPECIAL = '[&<>"]';
const reXmlSpecial = new RegExp(XMLSPECIAL, 'g');

export const quote = (text) => {
  let result;

  if (text.indexOf('"') === -1) {
    result = '""';
  } else {
    result = text.indexOf('\'') === -1 ? '\'\'' : '()';
  }

  return result[0] + text + result[1];
};

export const escape = (text, startOfLine) => {
  const result = text.replace(/[`*\\~[\]]/g, '\\$&');

  if (startOfLine) {
    return result.replace(/^[:#\-*+]/, '\\$&').replace(/^(\d+)\./, '$1\\.');
  }

  return result;
};

export const replaceUnsafeChar = (s) => {
  switch (s) {
    case '&':
      return '&amp;';
    case '<':
      return '&lt;';
    case '>':
      return '&gt;';
    case '"':
      return '&quot;';
    default:
      return s;
  }
};

export const escapeXml = (s) => {
  if (reXmlSpecial.test(s)) {
    return s.replace(reXmlSpecial, replaceUnsafeChar);
  }
  return s;
};

export const getPairRawHTML = (rawHTML) => {
  return rawHTML ? [`<${rawHTML}>`, `</${rawHTML}>`] : null;
};

export const getOpenRawHTML = (rawHTML) => {
  return rawHTML ? `<${rawHTML}>` : null;
};

export const getCloseRawHTML = (rawHTML) => {
  return rawHTML ? `</${rawHTML}>` : null;
};
