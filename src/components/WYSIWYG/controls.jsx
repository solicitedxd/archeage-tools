import { Typography } from '@material-ui/core';
import TitleIcon from '@material-ui/icons/Title';
import React from 'react';

export const standardControls = [
  {
    name: 'heading',
    icon: <TitleIcon />,
    type: 'block',
    blockWrapper: <Typography variant="h6" />,
  },
];

export const mapEntityTransform = (entity, text) => {
  console.log(entity, text);
  const control = standardControls.find(c => c.name.toLowerCase() === entity.type.toLowerCase());
  if (!control) return;

  return React.createElement(control.blockWrapper, {}, text);
};
