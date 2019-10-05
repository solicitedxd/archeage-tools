export const substitute = (template, obj) => template.replace(/\${([a-z0-9_]+)}/gi, (match, capture) => obj[capture]);

export const getQuestId = (quest) => `${quest.name}${quest.idx && `-${quest.idx}` || ''}`;

export const getNavId = (path) => path.substr(1).replace('/', '_');
