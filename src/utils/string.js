export const substitute = (template, obj) => template.replace(/\${([a-z0-9_]+)(\[([0-9]+)])?}/gi, (match, capture, _, index) => {
  if (_) {
    return obj[capture] ? obj[capture][index] : null;
  } else {
    return obj[capture]
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
