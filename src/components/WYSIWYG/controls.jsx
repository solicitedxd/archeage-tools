import { Typography } from '@material-ui/core';
import TitleIcon from '@material-ui/icons/Title';
import React from 'react';

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

export const customControls = [
  {
    name: 'heading',
    icon: <TitleIcon />,
    type: 'block',
    blockWrapper: <Typography variant="h6" />,
  },
];

export const toolbar = Object.freeze({
  [EDITOR_TYPE.NEWS]: ['heading', 'bold', 'italic', 'underline', 'strikethrough', 'link', 'bulletList', 'numberList',
    'quote', 'clear', 'save'],
  [EDITOR_TYPE.COMMENT]: [],
});

export const inlineToolbar = Object.freeze({
  [EDITOR_TYPE.NEWS]: ['bold', 'italic', 'link'],
  [EDITOR_TYPE.COMMENT]: ['bold', 'italic'],
});
