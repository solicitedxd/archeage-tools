export const substitute = (template, obj) => template.replace(/\${([a-z0-9_]+)(\[([0-9]+)])?}/gi, (match, capture, _, index) => {
  if (_) {
    return obj[capture] ? obj[capture][index] : null;
  } else {
    return obj[capture];
  }
});

export const getNavId = (path) => path && path.substr(1).replace('/', '_');

export const setTitle = (title) => {
  if (title) {
    document.title = `${title} - ArcheAge Tools`;
  } else {
    document.title = 'ArcheAge Tools';
  }
};

export const scrollToTop = () => {
  document.getElementById('app').scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const validateQuantity = (min, max) => (value) => {
  if (!value) return;
  if (value.indexOf('.') >= 0) return Math.floor(value);
  if (value <= min) value = min;
  if (value > max) value = max;
  return value;
};

export const pascalCase = (s) => {
  return s.replace(/(\w)(\w*)/g, (g0, g1, g2) => {
    return g1.toUpperCase() + g2.toLowerCase();
  }).replace(/([^\w])/g, () => '');
};

export const slug = (text) => {
  return text.toLowerCase()
  .replace(/[^\w ]+/g, '')
  .split(' ')
  .join('-');
};

export const unslug = (slug) => {
  return slug.toLowerCase()
  .split('-')
  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
  .join('');
};

export const transformLines = (string) => string.replace(/\n/g, '<br />');

export const encodeColors = (string) => {
  string = string.replace(/\|c([A-Z_]+)\|/g, (match, capture) => `<span class="text-${capture.toLowerCase()}">`);
  string = string.replace(/\|c\|/g, () => `</span>`);
  return transformLines(string);
};
