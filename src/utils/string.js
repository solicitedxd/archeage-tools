export const substitute = (template, obj) => template.replace(/\${([a-z0-9_]+)}/gi, (match, capture) => obj[capture]);
