import linkifyIt from 'linkify-it';
import { escapeXml } from 'utils/toastui';

const linkify = linkifyIt();

// eslint-disable-next-line no-unused-vars
const uploadImageCallBack = (file) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://api.imgur.com/3/image');
  xhr.setRequestHeader('Authorization', 'Client-ID a1cf1b228a5ec1e');
  const data = new FormData();
  data.append('image', file);
  xhr.send(data);
  xhr.addEventListener('load', () => {
    const response = JSON.parse(xhr.responseText);
    resolve(response);
  });
  xhr.addEventListener('error', () => {
    const error = JSON.parse(xhr.responseText);
    reject(error);
  });
});

export const EDITOR_TYPE = Object.freeze({
  NEWS: 'news',
  COMMENT: 'comment',
});

export const customHTMLRenderers = {
  link: (node, { entering }) => {
    if (entering) {
      const { title, destination } = node;
      const match = linkify.match(destination);

      return {
        type: 'openTag',
        tagName: 'a',
        attributes: {
          href: escapeXml(destination),
          ...(title && { title: escapeXml(title) }),
          ...(match && { target: '_blank' }),
          class: 'MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorPrimary',
        },
      };
    }
    return { type: 'closeTag', tagName: 'a' };
  },
};

export const toolbar = Object.freeze({
  [EDITOR_TYPE.NEWS]: [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'indent', 'outdent'],
    ['link'],
  ],
  [EDITOR_TYPE.COMMENT]: [
    ['bold', 'italic', 'strike'],
    ['ul', 'ol'],
    ['quote'],
  ],
});
